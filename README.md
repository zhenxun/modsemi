# ModSemi

基于 **React 19 + Modern.js + Semi Design** 打造的开箱即用中台前端 / 设计解决方案，类似 Ant Design Pro，提供完整的中后台页面框架与组件体系。

---

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| [React](https://react.dev) | 19 | 最新版 React，支持并发特性 |
| [Modern.js](https://modernjs.dev) | 3.x | 字节跳动开源的全栈框架，内置路由、构建、SSR |
| [Semi Design](https://semi.design) | 2.x（React 19 适配版） | 字节跳动企业级 UI 组件库，`@douyinfe/semi-ui-19` |
| [TypeScript](https://www.typescriptlang.org) | ~5.7 | 全量类型支持 |
| [Biome](https://biomejs.dev) | 1.9 | 高性能代码格式化 & Lint 工具 |

---

## 环境要求

- **Node.js** >= 20
- **pnpm**（推荐）

---

## 安装与启动

### 1. 安装依赖

```bash
pnpm install
```

### 2. 启动开发服务器

```bash
pnpm dev
```

### 3. 构建生产版本

```bash
pnpm build
```

### 4. 预览生产构建

```bash
pnpm serve
```

### 5. 代码检查

```bash
pnpm lint
```

---

## 主要依赖说明

### 运行时依赖

| 包名 | 说明 |
|------|------|
| `@douyinfe/semi-ui-19` | Semi Design React 19 兼容版 UI 组件库 |
| `@modern-js/runtime` | Modern.js 运行时模块（路由、数据获取等） |
| `react` / `react-dom` | React 19 核心库 |

### 开发依赖

| 包名 | 说明 |
|------|------|
| `@modern-js/app-tools` | Modern.js 构建与开发工具链 |
| `@biomejs/biome` | 代码格式化与 Lint |
| `typescript` | TypeScript 编译器 |
| `@types/react` / `@types/react-dom` | React 类型声明 |

---

## MCP 集成（Semi Design MCP）

Semi Design 提供了官方 MCP（Model Context Protocol）服务，可让 AI 编码助手（如 Cursor、Trae）直接查阅组件文档与源码，显著提升开发效率。

### 安装配置

在 Cursor 或 Trae 的 MCP 设置中添加以下配置：

```json
{
  "mcpServers": {
    "semi-mcp": {
      "command": "npx",
      "args": ["-y", "@douyinfe/semi-mcp"]
    }
  }
}
```

> **字节内网用户**请将包名替换为 `@ies/semi-mcp-bytedance`。

### 可用工具

配置完成后，AI 助手可使用以下 MCP 工具：

| 工具 | 功能 |
|------|------|
| `get_semi_document` | 获取组件文档（Button、Table、Form 等）及专题文档（主题定制、黑暗模式、更新日志等） |
| `get_semi_code_block` | 获取文档中的具体代码示例（大文档中代码块被折叠时使用） |
| `get_component_file_list` | 列出某个组件的所有源文件路径 |
| `get_file_code` | 获取组件源文件代码（大文件显示结构，小文件显示完整内容） |
| `get_function_code` | 获取组件源码中某个具体函数的完整实现 |

### 使用示例

配置完成后，直接在 AI 对话中描述需求即可，无需手动查阅文档：

```
帮我用 Semi Design 实现一个带搜索和分页的 Table 组件
帮我查一下 Semi Design Form 的表单验证用法
Semi Design 怎么做主题定制？
```

---

## 参考文档

- [Modern.js 文档](https://modernjs.dev/en)
- [Semi Design 文档](https://semi.design/zh-CN)
- [Semi Design React 19 迁移指南](https://semi.design/zh-CN/start/update-to-v2)
- [React 19 文档](https://react.dev)
