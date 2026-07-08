const LASTFM_RECENT_URL = 'https://ws.audioscrobbler.com/2.0/';

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
    apiKey: process.env.LASTFM_API_KEY,
    username: process.env.LASTFM_USERNAME,
  };
}

function getLargestImage(images = []) {
  if (!Array.isArray(images)) {
    return '';
  }

  const image = [...images].reverse().find((item) => item?.['#text']);
  return image?.['#text'] || '';
}

function normalizeTrack(item) {
  if (!item) {
    return null;
  }

  const title = item.name || '';
  const artist = item.artist?.['#text'] || item.artist?.name || '';

  if (!title || !artist) {
    return null;
  }

  return {
    title,
    artist,
    image: getLargestImage(item.image),
    url: item.url || '',
    source: item['@attr']?.nowplaying === 'true' ? 'current' : 'recent',
  };
}

function isDebugRequest(req) {
  try {
    const url = new URL(req.url || '', `https://${req.headers.host || 'localhost'}`);
    return url.searchParams.get('debug') === '1';
  } catch (_error) {
    return false;
  }
}

async function fetchLastfmRecentTracks({ apiKey, username }) {
  const url = new URL(LASTFM_RECENT_URL);
  url.searchParams.set('method', 'user.getrecenttracks');
  url.searchParams.set('user', username);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '20');
  url.searchParams.set('extended', '0');

  const response = await fetch(url);
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.error) {
    throw new Error(data.message || `Last.fm request failed with ${response.status}.`);
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

  const debug = isDebugRequest(req);
  const env = getEnv();

  if (!env.apiKey || !env.username) {
    sendJson(res, 500, {
      error: 'Last.fm environment variables are not configured.',
      ...(debug
        ? {
            debug: {
              hasApiKey: Boolean(env.apiKey),
              hasUsername: Boolean(env.username),
            },
          }
        : {}),
    });
    return;
  }

  try {
    const data = await fetchLastfmRecentTracks(env);
    const rawTracks = data?.recenttracks?.track || [];
    const tracks = [];

    rawTracks.forEach((item) => {
      const normalized = normalizeTrack(item);
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
              username: env.username,
              totalItems: rawTracks.length,
              normalizedItems: tracks.length,
            },
          }
        : {}),
    });
  } catch (error) {
    sendJson(res, 500, {
      error: 'Last.fm unavailable.',
      message: error.message,
    });
  }
};
