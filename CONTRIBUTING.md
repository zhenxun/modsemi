# 貢獻指南

感謝你對 ModSemi 的興趣！以下是參與貢獻的方式。

---

## 回報問題（Issue）

1. 先搜尋 [Issues](../../issues) 確認問題尚未被回報
2. 使用清晰的標題，附上：
   - 重現步驟
   - 預期行為 vs 實際行為
   - 環境資訊（Node.js 版本、瀏覽器、OS）

---

## 提交程式碼（Pull Request）

### 環境準備

```bash
# 1. Fork 並 clone
git clone https://github.com/your-username/modsemi.git
cd modsemi

# 2. 安裝依賴
pnpm install

# 3. 複製環境變數範本
cp .env.example .env.local

# 4. 啟動開發伺服器
pnpm dev
```

### 開發流程

```bash
# 建立功能分支
git checkout -b feat/your-feature

# 開發中隨時執行 lint 確認程式碼品質
pnpm lint

# 確認 build 無誤後再送出 PR
pnpm build
```

### 提交規範

Commit 訊息遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat(scope): 新增功能描述
fix(scope): 修正問題描述
docs(scope): 更新文件
refactor(scope): 重構說明
```

### PR 檢查清單

- [ ] `pnpm lint` 通過，無新增 lint 錯誤
- [ ] `pnpm build` 成功
- [ ] 涉及新功能時已更新 `handbook/技術手冊.md`
- [ ] PR 描述說明了「為什麼」做這個改動

---

## 專案架構

在送出 PR 前，建議先閱讀 [`handbook/技術手冊.md`](handbook/技術手冊.md)，了解：

- `src/routes/` vs `src/pages/` 的職責分離
- 導航配置的唯一來源（`src/config/navigation.ts`）
- 狀態管理方式（Zustand）
- 認證與權限系統架構

---

## 授權

提交 PR 即代表你同意你的貢獻以 MIT 授權發布。
