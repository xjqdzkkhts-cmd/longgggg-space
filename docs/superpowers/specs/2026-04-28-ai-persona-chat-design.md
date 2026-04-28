# AI Persona Chat Sidebar Design

## Summary

为当前作品集网站新增一个公开可用的 AI 对话入口。访客点击页面右下角悬浮按钮后，页面右侧滑出一个聊天侧边栏，网站主体向左收缩。聊天后端通过 Vercel Functions 调用 OpenAI API，并读取一份 Markdown 资料文档作为“龙湘玉个人分身”的知识来源。

目标是让访客可以自然地询问关于龙湘玉本人、作品、经历和联系方式的问题，而不是把聊天功能做成通用助手。

## Goals

- 在现有网站中新增一个右下角悬浮入口和右侧 AI 聊天侧边栏。
- 桌面端打开聊天后，页面主体向左移动，为侧边栏留出空间。
- 移动端改为全屏或近全屏抽屉式聊天层。
- 使用一份独立 Markdown 文档维护 AI 的人设与知识。
- 后端通过 Vercel Functions 安全调用 OpenAI API，不在前端暴露 API key。
- 访客可以连续对话，但只保留短上下文，不做长期会话存储。

## Non-Goals

- 不实现登录、邀请码、管理员面板或复杂权限系统。
- 不实现数据库持久化聊天记录。
- 不实现多角色、多模型切换。
- 不实现网站内自动跳转到作品详情的高级 agent 行为。
- 不在第一版中实现复杂限流或风控后台。

## User Experience

### Entry

- 页面右下角新增一个固定悬浮按钮。
- 默认文案建议使用 `Ask Long`，也可后续替换成纯图标。
- 点击后打开右侧聊天侧边栏；再次点击或点关闭按钮可收起。

### Desktop Layout

- 侧边栏从页面右侧滑入。
- 网站主内容容器整体向左平移，而不是被遮挡。
- 侧边栏宽度建议在 `380px` 到 `420px` 之间，默认取 `400px`。

### Mobile Layout

- 不做“主体左移”。
- 聊天层改为全屏抽屉或近全屏面板，从右侧或底部进入。

### Chat Panel Structure

- Header
  - 标题：例如 `Ask Long`
  - 简短说明：说明这是龙湘玉的 AI 分身
  - 关闭按钮
- Message List
  - 展示欢迎语、用户消息、AI 消息、加载状态、错误提示
- Composer
  - 输入框
  - 发送按钮

### Tone

- 欢迎语应简洁、友好、专业。
- 回答风格偏真诚、直接、作品集语境，不做过度营销。

## Knowledge Source

### File

- 新增一份 Markdown 文件，建议路径：
  - `knowledge/persona.md`

### Intended Structure

- 基本身份
- 教育经历
- 设计方向
- 作品概览
- 技能与工具
- 联系方式
- 常见问题回答口径
- 回答风格约束

### Usage

- Vercel Function 在每次请求时读取该 Markdown 文件。
- 将文档内容作为系统提示词的一部分发送给模型。
- 如果后续文档变长，可再做缓存或拆分；第一版先使用单文件方案。

## Frontend Architecture

### New UI State

- `isChatOpen`
  - 控制侧边栏是否展开
- `messages`
  - 当前会话消息数组
- `isSending`
  - 当前是否正在等待 AI 回复
- `chatError`
  - 当前错误状态

### DOM Additions

- 悬浮聊天入口按钮
- 右侧聊天侧边栏容器
- 消息列表容器
- 输入区域

### Existing Layout Integration

- 在 `body` 或主内容容器上增加一个打开态 class，例如：
  - `body.is-chat-open`
- 通过该 class 控制：
  - 主内容横向位移
  - 侧边栏进入动画
  - 浮动入口显隐状态

## Backend Architecture

### Hosting

- 采用 Vercel Functions。
- 保留 GitHub Pages 托管现有静态前端。

### API

- `POST /api/chat`

### Request Shape

- `message`
  - 当前用户输入
- `history`
  - 最近若干条对话历史，前端裁剪后发送

### Response Shape

- `reply`
  - AI 回复文本
- `error`
  - 错误时的简短错误码或消息

### Server Responsibilities

- 读取 `knowledge/persona.md`
- 构建系统提示词
- 验证请求输入
- 限制带入的聊天历史长度
- 调用 OpenAI API
- 返回清洗后的文本结果

## Prompting Strategy

系统提示词应明确以下边界：

- 你是“龙湘玉的 AI 分身”，只回答与她本人、经历、作品、技能、联系方式相关的问题。
- 如果知识文档中没有明确提到，不要编造。
- 不确定时直接说明资料中没有该信息。
- 回答语气保持简洁、专业、友好。
- 优先帮助访客理解她是谁、做过什么、擅长什么。

## Error Handling

### Frontend

- 输入为空时不发送。
- 发送中禁用发送按钮。
- 请求失败时在聊天流中插入一条简短系统消息，例如：
  - `现在有点忙，请稍后再试。`

### Backend

- 输入超长时直接拒绝。
- OpenAI 请求失败时返回标准化错误。
- 不把底层技术细节暴露给访客。

## Public Access Safety Baseline

该聊天入口完全公开，但第一版至少做以下最小保护：

- 限制单条输入长度，例如 `500-800` 字符
- 限制带入上下文轮数，例如最近 `6-8` 条消息
- 限制输出长度，避免生成过长内容
- 使用系统提示严格限制话题边界

## Deployment

### Frontend

- 保持在 GitHub Pages 上部署

### Backend

- 新建 Vercel 项目
- 配置环境变量：
  - `OPENAI_API_KEY`

### Cross-Origin

- 前端通过公开的 Vercel Function URL 发起请求
- 若需显式 CORS，则只允许 GitHub Pages 域名访问

## Testing

### Frontend

- 打开/关闭侧边栏
- 桌面端主内容左移
- 移动端聊天层展示
- 连续发送消息
- 加载状态与错误状态

### Backend

- 空消息
- 超长消息
- 有历史消息的请求
- OpenAI 异常返回
- Markdown 文档缺失时的兜底提示

### Integration

- GitHub Pages 前端成功调用 Vercel 后端
- 后端能够读取 Markdown 知识文件并回答问题

## Open Questions Deferred

- 之后是否需要限制每日次数
- 是否需要把作品摘要拆成单独文档
- 是否要在聊天中加入作品推荐或快速入口按钮

## Recommended Implementation Order

1. 搭建侧边栏 UI 与右下角悬浮入口
2. 加入前端聊天状态与消息流
3. 新建 Vercel Function `POST /api/chat`
4. 新建占位 `knowledge/persona.md`
5. 接入 OpenAI API
6. 完成 GitHub Pages 与 Vercel 联调
