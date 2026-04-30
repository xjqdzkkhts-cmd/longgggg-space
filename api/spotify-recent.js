const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_CURRENT_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=20';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.setHeader('Cache-Control', 'no-store, max-age=0');
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

  return {
    accessToken: data.access_token,
    scope: data.scope || '',
  };
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

function getSpotifyErrorMessage(data) {
  if (typeof data?.error_description === 'string') {
    return data.error_description;
  }

  if (typeof data?.error === 'string') {
    return data.error;
  }

  if (typeof data?.error?.message === 'string') {
    return data.error.message;
  }

  return 'Unable to fetch Spotify data.';
}

async function fetchSpotifyJson(url, accessToken) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = {
    status: response.status,
    ok: response.ok,
    data: null,
    error: '',
  };

  if (response.status === 204) {
    return result;
  }

  const data = await response.json().catch(() => ({}));
  result.data = data;

  if (!response.ok) {
    result.error = getSpotifyErrorMessage(data);
  }

  return result;
}

function isDebugRequest(req) {
  try {
    const url = new URL(req.url || '', `https://${req.headers.host || 'localhost'}`);
    return url.searchParams.get('debug') === '1';
  } catch (_error) {
    return false;
  }
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
    const debug = isDebugRequest(req);
    const token = await getAccessToken();
    const [current, recent] = await Promise.all([
      fetchSpotifyJson(SPOTIFY_CURRENT_URL, token.accessToken).catch((error) => ({
        status: 0,
        ok: false,
        data: null,
        error: error.message,
      })),
      fetchSpotifyJson(SPOTIFY_RECENT_URL, token.accessToken).catch((error) => ({
        status: 0,
        ok: false,
        data: null,
        error: error.message,
      })),
    ]);

    const tracks = [];
    const currentData = current?.data;
    const recentData = recent?.data;
    const currentTrack = normalizeTrack(currentData?.item, 'current');
    if (currentTrack) {
      tracks.push(currentTrack);
    }

    (recentData?.items || []).forEach((item) => {
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
      pool: tracks.slice(0, 20),
      updatedAt: new Date().toISOString(),
      ...(debug
        ? {
            debug: {
              tokenScope: token.scope,
              currentStatus: current?.status ?? null,
              currentOk: Boolean(current?.ok),
              currentType: currentData?.currently_playing_type || null,
              currentIsPlaying: currentData?.is_playing ?? null,
              currentHasItem: Boolean(currentData?.item),
              currentError: current?.error || '',
              recentStatus: recent?.status ?? null,
              recentOk: Boolean(recent?.ok),
              recentItems: Array.isArray(recentData?.items) ? recentData.items.length : 0,
              recentError: recent?.error || '',
            },
          }
        : {}),
    });
  } catch (error) {
    sendJson(res, 500, {
      error: 'Spotify unavailable.',
      message: error.message,
    });
  }
};
