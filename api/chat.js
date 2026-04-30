const fs = require('node:fs/promises');
const path = require('node:path');

const MAX_INPUT_CHARS = 800;
const MAX_HISTORY_MESSAGES = 8;
const MAX_HISTORY_CHARS = 1200;
const MAX_OUTPUT_TOKENS = 700;
const OPENAI_TIMEOUT_MS = 12000;
const DEFAULT_MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

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
    '你只回答和龙湘玉本人、教育经历、生活兴趣、性格特点、协作方式、设计方向、项目作品、技能、研究兴趣、求职方向、联系方式相关的问题。',
    '如果资料中没有明确提到，请直接说“我目前没有这部分资料”，不要编造经历、数字、头衔或项目细节。',
    '你必须用第一人称“我”介绍龙湘玉，不要用“她”“龙湘玉”作为主要叙述视角。',
    '回答风格保持真诚、专业、简洁，优先帮助访客快速了解我是谁、做过什么、擅长什么。',
    '当被问到不适合回答的话题时，礼貌地把话题拉回到我本人和我的作品。',
    '如果用户想联系我，可以自然给出资料里已有的联系方式。',
    '你必须只返回一个 JSON 对象，不要使用 Markdown 代码块，不要输出 JSON 之外的文字。',
    'JSON 格式：{"reply":"简洁回答","cards":[],"suggestions":[]}',
    'cards 最多 2 个。可用类型：',
    '- {"type":"contact","title":"联系我","items":[{"label":"Email","value":"Xiangyu-Long@outlook.com","action":"email","icon":"mail"}]}',
    '- {"type":"projects","title":"相关作品","items":[{"title":"AI 溶栓助手","description":"一句话说明","tag":"UX","gallery":"ai-thrombolysis"}]}',
    '- {"type":"profile","title":"我给人的感觉","items":[{"title":"好奇","description":"对设计、AI 产品和新工具保持探索欲。"}]}',
    '- {"type":"tags","title":"关键词","items":["UX 设计","HCI","AI 产品"]}',
    '- {"type":"timeline","title":"学习历程","items":[{"title":"阶段","description":"说明"}]}',
    'suggestions 最多 3 条，每条是访客可能继续追问的问题。',
    '当用户问联系方式、联系、邮箱、微信、电话时，必须包含 contact card。',
    '当用户问项目、作品、案例时，优先包含 projects card。',
    'projects card 只展示当前网站已有项目：AI 溶栓助手、iKnow、AI 如何帮助 ADHD、E-TEA、Merry Christmas。不要把“金蝉子计划”放进 projects card，除非用户明确问简历里的其他经历。',
    'projects card 的 gallery 必须从这些值选择：ai-thrombolysis、iknow、adhd-ai、etea、marry-christmas。',
    '当用户问技能、工具、擅长什么时，优先包含 tags card。',
    '当用户问生活中的样子、性格时，回答应偏生活状态、兴趣和个人气质。',
    '当用户问合作体验、一起工作感觉时，回答应偏协作方式、团队角色、沟通偏好和项目推进方式。',
    '生活问题和合作问题不要回答成同一套内容。',
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
      } else if (typeof content?.output_text === 'string' && content.output_text.trim()) {
        chunks.push(content.output_text.trim());
      } else if (typeof content === 'string' && content.trim()) {
        chunks.push(content.trim());
      }
    });
  });

  return chunks.join('\n').trim();
}

function parseStructuredReply(text) {
  if (!text) {
    return null;
  }

  const normalized = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(normalized);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  } catch (_error) {
    return null;
  }

  return null;
}

function normalizeSuggestions(suggestions) {
  if (!Array.isArray(suggestions)) {
    return [];
  }

  return suggestions.filter((item) => typeof item === 'string' && item.trim()).slice(0, 3).map((item) => item.trim());
}

function normalizeCards(cards) {
  if (!Array.isArray(cards)) {
    return [];
  }

  return cards
    .filter((card) => card && typeof card === 'object' && typeof card.type === 'string')
    .slice(0, 2)
    .map((card) => ({
      type: card.type,
      title: typeof card.title === 'string' ? card.title.slice(0, 40) : '',
      items: Array.isArray(card.items) ? card.items.slice(0, 6) : [],
    }));
}

function inferCards(message) {
  const text = message.toLowerCase();
  const cards = [];

  if (/联系|邮箱|email|微信|电话|contact|reach|linkedin/.test(text)) {
    cards.push({
      type: 'contact',
      title: '联系我',
      items: [
        { label: 'Email', value: 'Xiangyu-Long@outlook.com', action: 'email', icon: 'mail' },
        { label: 'WeChat', value: 'xjqdzkkhts', action: 'copy', icon: 'wechat' },
        { label: '电话 CN', value: '86-19186818073', action: 'tel', icon: 'phone' },
        { label: '电话 UK', value: '44-7962889579', action: 'tel', icon: 'phone' },
      ],
    });
  }

  if (/项目|作品|案例|portfolio|project|case/.test(text)) {
    cards.push({
      type: 'projects',
      title: '相关作品',
      items: [
        {
          title: 'AI 溶栓助手',
          description: '围绕急性脑卒中院前智能诊疗、三端协同与可解释 AI 的 UX 项目。',
          tag: 'UX / AI',
          gallery: 'ai-thrombolysis',
        },
        {
          title: 'iKnow',
          description: '面向认知与家庭场景的产品体验设计。',
          tag: 'Product',
          gallery: 'iknow',
        },
        {
          title: 'E-TEA',
          description: '茶园生产管理相关的信息界面设计。',
          tag: 'Dashboard',
          gallery: 'etea',
        },
      ],
    });
  }

  if (/技能|工具|会什么|擅长|skill|tool|能力/.test(text)) {
    cards.push({
      type: 'tags',
      title: '关键词',
      items: ['UX 设计', '产品设计', '视觉设计', 'HCI', 'AI 产品', '轻量前端实现'],
    });
  }

  if (/协作|合作|一起工作|工作感觉|共事|collaborat|work with/.test(text)) {
    cards.push({
      type: 'profile',
      title: '和我合作',
      items: [
        { title: '靠谱推进', description: '我会主动整理信息、把握节奏，并推动项目继续往前走。' },
        { title: '认真倾听', description: '我重视多元意见，也希望成员能直接表达想法和诉求。' },
        { title: '回到问题', description: '遇到不确定时，我会回到目标用户、利益相关者和项目目标中寻找判断依据。' },
      ],
    });
  } else if (/生活|性格|日常|personality/.test(text)) {
    cards.push({
      type: 'profile',
      title: '生活中的我',
      items: [
        { title: '温柔', description: '朋友常用温柔来描述我，我也希望用稳定和真诚对待身边的人。' },
        { title: '有韧性', description: '我很看重在困难中保持乐观进取的能力。' },
        { title: '喜欢记录', description: '手帐、音乐和旅行会帮我整理生活，也给设计带来灵感。' },
      ],
    });
  } else if (/设计思考|思考方式|方法|design thinking/.test(text)) {
    cards.push({
      type: 'profile',
      title: '我的设计思考',
      items: [
        { title: '从真实需求出发', description: '我习惯先理解用户、场景和利益相关者，再进入方案。' },
        { title: '把想法做出来', description: '我喜欢通过原型、界面、动效或轻量代码让想法更可讨论。' },
        { title: '关注可落地性', description: '我会同时考虑体验、视觉表达和实现成本。' },
      ],
    });
  }

  return cards.slice(0, 2);
}

function buildFallbackReply(message) {
  const text = message.toLowerCase();

  if (/联系|邮箱|email|微信|电话|contact|reach|linkedin/.test(text)) {
    return '你可以通过邮箱 Xiangyu-Long@outlook.com 联系我，也可以通过微信 xjqdzkkhts 找到我。';
  }

  if (/项目|作品|案例|portfolio|project|case/.test(text)) {
    return '我目前在网站中展示了 BBHust、AI 溶栓助手、iKnow、AI 如何帮助 ADHD、E-TEA 和 Merry Christmas 等项目。你可以继续问我某个项目的目标、我的职责或设计过程。';
  }

  if (/技能|工具|会什么|擅长|skill|tool|能力/.test(text)) {
    return '我的能力集中在 UX 设计、产品设计、视觉设计、HCI 与 AI 产品方向，也会使用 Figma、Blender、Adobe Illustrator、SPSS、Arduino IDE，并能在 AI 辅助下完成轻量前端实现。';
  }

  if (/协作|合作|一起工作|工作感觉|共事|collaborat|work with/.test(text)) {
    return '和我合作时，你大概率会感受到我是一个认真倾听、愿意整理信息并主动推进的人。我在团队里更自然承担整理者和执行者的角色，遇到不确定时会回到目标用户、利益相关者和项目目标中寻找判断依据。';
  }

  if (/生活|性格|日常|personality/.test(text)) {
    return '生活中，朋友常说我是一个温柔的人。我也很看重韧性，喜欢人在面对变化时依然保持乐观和进取。平时我喜欢手帐、旅行和音乐，也会沉浸在不断完善个人网站这种从 0 到 1 搭建体系的过程里。';
  }

  if (/设计思考|思考方式|方法|design thinking/.test(text)) {
    return '我的设计思考通常从真实需求和具体场景开始：先理解用户、问题和利益相关者，再把想法做成原型、界面或动效，让它变成可以讨论、验证和继续迭代的东西。';
  }

  return '我可以介绍我的作品、教育经历、设计方向、技能、协作方式和联系方式。你可以问我“你做过哪些项目？”或“和你一起工作是什么感觉？”。';
}

function inferSuggestions(message) {
  const text = message.toLowerCase();

  if (/联系|邮箱|email|微信|电话|contact|reach|linkedin/.test(text)) {
    return ['你目前在哪里？', '看看你的作品', '和你合作是什么感觉？'];
  }

  if (/项目|作品|案例|portfolio|project|case/.test(text)) {
    return ['AI 溶栓助手里你做了什么？', 'iKnow 项目目标是什么？', '你如何思考设计？'];
  }

  if (/协作|合作|一起工作|工作感觉|共事|collaborat|work with/.test(text)) {
    return ['生活中的你是什么样？', '你做项目时从哪里开始？', '看看你的作品'];
  }

  if (/生活|性格|日常|personality/.test(text)) {
    return ['和你合作是什么感觉？', '你最近在关注什么？', '你如何思考设计？'];
  }

  if (/设计思考|思考方式|方法|design thinking/.test(text)) {
    return ['你做过哪些项目？', '和你合作是什么感觉？', '你的技能有哪些？'];
  }

  if (/技能|工具|会什么|擅长|skill|tool|能力/.test(text)) {
    return ['你如何使用 AI 工具？', '看看你的作品', '你的求职方向是什么？'];
  }

  return ['生活中的你是什么样？', '和你合作是什么感觉？', '看看你的作品'];
}

function buildChatPayload(replyText, message) {
  const structured = parseStructuredReply(replyText);
  const fallbackReply = replyText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  const reply = typeof structured?.reply === 'string' && structured.reply.trim() ? structured.reply.trim() : fallbackReply;
  const inferredCards = inferCards(message);
  const cards = normalizeCards(structured?.cards);
  const suggestions = normalizeSuggestions(structured?.suggestions);

  return {
    reply,
    cards: cards.length ? cards : inferredCards,
    suggestions: suggestions.length ? suggestions : inferSuggestions(message),
  };
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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), OPENAI_TIMEOUT_MS);

  let response;
  let data;

  try {
    response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      signal: controller.signal,
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

    data = await response.json().catch(() => ({}));
  } catch (error) {
    if (error?.name === 'AbortError') {
      sendJson(res, 200, buildChatPayload(buildFallbackReply(message), message));
      return;
    }

    sendJson(res, 502, { error: 'OpenAI request failed.' });
    return;
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    sendJson(res, response.status, {
      error: data?.error?.message || 'OpenAI request failed.',
    });
    return;
  }

  const reply = extractReplyText(data);

  if (!reply) {
    sendJson(res, 200, buildChatPayload(buildFallbackReply(message), message));
    return;
  }

  sendJson(res, 200, buildChatPayload(reply, message));
};
