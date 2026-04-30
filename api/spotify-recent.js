const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_CURRENT_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=4';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function getEnv() {
  return {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
  };
}

async function getAccessToken() {
  const { clientId, clientSecret, refreshToken } = getEnv();

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing Spotify environment variables.');
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Unable to refresh Spotify token.');
  }

  return data.access_token;
}

function normalizeTrack(track, source = 'recent') {
  if (!track) {
    return null;
  }

  const image = Array.isArray(track.album?.images) ? track.album.images.find((item) => item?.url)?.url : '';
  const artists = Array.isArray(track.artists) ? track.artists.map((artist) => artist.name).filter(Boolean).join(', ') : '';

  return {
    title: track.name || '',
    artist: artists,
    image,
    url: track.external_urls?.spotify || '',
    source,
  };
}

async function fetchSpotifyJson(url, accessToken) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || 'Unable to fetch Spotify data.');
  }

  return data;
}

module.exports = async function handler(req, res) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, { error: 'Method not allowed.' });
    return;
  }

  try {
    const accessToken = await getAccessToken();
    const [current, recent] = await Promise.all([
      fetchSpotifyJson(SPOTIFY_CURRENT_URL, accessToken).catch(() => null),
      fetchSpotifyJson(SPOTIFY_RECENT_URL, accessToken).catch(() => null),
    ]);

    const tracks = [];
    const currentTrack = normalizeTrack(current?.item, 'current');
    if (currentTrack) {
      tracks.push(currentTrack);
    }

    (recent?.items || []).forEach((item) => {
      const normalized = normalizeTrack(item?.track, 'recent');
      if (!normalized) {
        return;
      }

      const isDuplicate = tracks.some((track) => track.title === normalized.title && track.artist === normalized.artist);
      if (!isDuplicate) {
        tracks.push(normalized);
      }
    });

    sendJson(res, 200, {
      tracks: tracks.slice(0, 4),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    sendJson(res, 500, {
      error: 'Spotify unavailable.',
      message: error.message,
    });
  }
};
