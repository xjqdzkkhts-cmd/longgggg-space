import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../script.js', import.meta.url), 'utf8');
const slice = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));

class Element {
  children = [];
  style = {};
  dataset = {};
  textContent = '';
  classes = new Set();
  classList = {
    add: (...names) => names.forEach(name => this.classes.add(name)),
    remove: (...names) => names.forEach(name => this.classes.delete(name)),
    toggle: (name, state) => state ? this.classes.add(name) : this.classes.delete(name),
  };
  appendChild(child) { child.parent = this; this.children.push(child); return child; }
  remove() { this.parent.children.splice(this.parent.children.indexOf(this), 1); }

}

function chatContext() {
  let renderedCards = 0;
  const list = Object.assign(new Element(), { scrollHeight: 1200, clientHeight: 400, scrollTop: 800 });
  const state = { messages: [], isOpen: true, isTyping: false, typingTimer: null };
  const preference = new Element(); preference.matches = false;
  const context = vm.createContext({
    document: { createElement: () => new Element(), hidden: false },
    aiChatMessages: list, aiChatState: state, aiMessageViews: new Map(), motionPreference: preference,
    renderAiFeedbackCard: () => { renderedCards++; return new Element(); },
    getAiChatCopy: () => 'Unavailable', AI_CHAT_TYPE_SPEED_MS: 1,
    setTimeout, clearTimeout, Array, Map, Set,
  });
  vm.runInContext(slice('function renderAiChatMessages(', '\nif (aiChatStarters)'), context);
  vm.runInContext(slice('function pushAiChatMessage(', '\nasync function sendAiChatMessage'), context);
  return { context, state, list, preference, renderedCards: () => renderedCards };
}

test('streaming keeps history and interactive feedback mounted', () => {
  const { context, state, list, renderedCards } = chatContext();
  const history = { role: 'assistant', text: 'Earlier answer', cards: [{ type: 'life' }] };
  const incoming = { role: 'assistant', text: 'A', isTyping: true };
  state.messages.push(history, incoming);
  context.renderAiChatMessages();
  const first = list.children[0], current = list.children[1], feedback = first.children.at(-1);
  incoming.text = 'A new answer'; context.renderAiChatMessages();
  incoming.text += ' continues'; context.renderAiChatMessages();
  assert.equal(list.children[0], first);
  assert.equal(list.children[1], current);
  assert.equal(first.children.at(-1), feedback);
  assert.equal(renderedCards(), 1);
});

test('streaming respects reading position; sending resumes following', () => {
  const { context, state, list } = chatContext();
  state.messages.push({ role: 'assistant', text: 'Answer' });
  list.scrollTop = 120;
  context.renderAiChatMessages();
  assert.equal(list.scrollTop, 120);
  context.pushAiChatMessage({ role: 'user', text: 'Next question' });
  assert.equal(list.scrollTop, list.scrollHeight);
});

test('removing a status message preserves the surrounding messages', () => {
  const { context, state, list } = chatContext();
  state.messages.push({ role: 'user', text: 'Question' }, { role: 'status', text: 'Thinking' });
  context.renderAiChatMessages(); const question = list.children[0];
  context.removeAiChatStatusMessages();
  assert.equal(list.children.length, 1);
  assert.equal(list.children[0], question);
});

test('enabling reduced motion during typing completes the actual answer', async () => {
  const { context, state, preference } = chatContext();
  const answer = 'The complete answer remains readable.';
  const finished = context.typeAiChatAssistantMessage({ text: answer });
  preference.matches = true;
  await finished;
  assert.equal(state.messages.at(-1).text, answer);
  assert.equal(state.isTyping, false);
  assert.equal(state.typingTimer, null);
});

