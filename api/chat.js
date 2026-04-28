const fs = require('node:fs/promises');
const path = require('node:path');

const MAX_INPUT_CHARS = 800;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_CHARS = 1200;
const MAX_OUTPUT_TOKENS = 700;
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-5';

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, statusCode, payload) {
  setCorsHeaders(res);
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

async function readPersonaMarkdown() {
  const personaPath = path.join(process.cwd(), 'knowledge', 'persona.md');
  try {
    return await fs.readFile(personaPath, 'utf8');
  } catch (_error) {
    return '';
  }
}

function buildInstructions(personaMarkdown) {
  return [
    '你是“龙湘玉的 AI 分身”，服务于她的个人作品集网站。',
    '你只回答和龙湘玉本人、教育经历、设计方向、项目作品、技能、研究兴趣、求职方向、联系方式相关的问题。',
    '如果资料中没有明确提到，请直接说“我目前没有这部分资料”，不要编造经历、数字、头衔或项目细节。',
    '回答风格保持真诚、专业、简洁，优先帮助访客快速了解龙湘玉是谁、做过什么、擅长什么。',
    '当被问到不适合回答的话题时，礼貌地把话题拉回到龙湘玉本人和她的作品。',
    '如果用户想联系龙湘玉，可以自然给出资料里已有的联系方式。',
    '',
    '以下是龙湘玉的人设与知识资料：',
    personaMarkdown || '目前还没有更完整的人设文档，请仅根据已有资料进行保守回答。',
  ].join('\n');
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter(
      (message) =>
        message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.text === 'string' &&
        message.text.trim()
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: [
        {
          type: message.role === 'assistant' ? 'output_text' : 'input_text',
          text: message.text.trim().slice(0, MAX_HISTORY_CHARS),
        },
      ],
    }));
}

function parseRequestBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body !== 'string') {
    return body;
  }

  try {
    return JSON.parse(body);
  } catch (_error) {
    return null;
  }
}

function extractReplyText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const output = Array.isArray(data?.output) ? data.output : [];
  const chunks = [];

  output.forEach((item) => {
    if (item?.type !== 'message' || !Array.isArray(item.content)) {
      return;
    }

    item.content.forEach((content) => {
      if (typeof content?.text === 'string' && content.text.trim()) {
        chunks.push(content.text.trim());
      }
    });
  });

  return chunks.join('\n').trim();
}

module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { error: 'Method not allowed.' });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(res, 500, { error: 'OPENAI_API_KEY is not configured.' });
    return;
  }

  const body = parseRequestBody(req.body);

  if (!body) {
    sendJson(res, 400, { error: 'Invalid JSON body.' });
    return;
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!message) {
    sendJson(res, 400, { error: 'Message is required.' });
    return;
  }

  if (message.length > MAX_INPUT_CHARS) {
    sendJson(res, 400, { error: `Message must be under ${MAX_INPUT_CHARS} characters.` });
    return;
  }

  const personaMarkdown = await readPersonaMarkdown();
  const history = sanitizeHistory(body.history);

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      instructions: buildInstructions(personaMarkdown),
      input: [
        ...history,
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: message,
            },
          ],
        },
      ],
      max_output_tokens: MAX_OUTPUT_TOKENS,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    sendJson(res, response.status, {
      error: data?.error?.message || 'OpenAI request failed.',
    });
    return;
  }

  const reply = extractReplyText(data);

  if (!reply) {
    sendJson(res, 502, { error: 'The model returned an empty reply.' });
    return;
  }

  sendJson(res, 200, { reply });
};
