import { defineConfig } from 'orval';

/**
 * Orval 設定檔 — API 程式碼自動生成
 *
 * 使用方式：
 *   pnpm api:gen              → 依 swagger/*.json 生成所有 API
 *   pnpm api:gen --watch      → 監聽 spec 變更並自動重新生成
 *
 * 生成結果輸出至 src/api/generated/
 * ⚠️  請勿手動編輯 src/api/generated/ 內的任何檔案
 *
 * 文件：https://orval.dev/docs
 */
export default defineConfig({
  /**
   * ── 主要 API（範例使用 swagger/sample.json）────────────────────
   * 開發者只需將 Swagger / OpenAPI JSON 放到 swagger/ 目錄下，
   * 並在此新增對應設定區塊即可。
   */
  sampleApi: {
    input: {
      /**
       * target：Swagger spec 來源
       * 支援：本地檔案路徑 | 遠端 URL
       *
       * 本地範例：'./swagger/sample.json'
       * 遠端範例：'https://api.example.com/swagger.json'
       *           'https://api.example.com/v3/api-docs'
       */
      target: './swagger/sample.json',
    },
    output: {
      /**
       * mode：
       *   'single'    — 所有 API 生成到一個檔案（小型 spec 適用）
       *   'split'     — models 與 functions 分開（預設推薦）
       *   'tags'      — 依 OpenAPI tags 拆分成多個檔案（大型 spec 推薦）
       *   'tags-split'— tags + split 的組合
       */
      mode: 'tags',

      /** 生成的 API 請求函式輸出目錄 */
      target: './src/api/generated',

      /** 生成的 TypeScript 型別定義輸出目錄 */
      schemas: './src/api/generated/model',

      /**
       * client：生成的客戶端類型
       *   'axios-functions' — 純函式（預設，無框架依賴）
       *   'axios'           — 工廠函式（支援注入自訂 instance）
       *   'react-query'     — 生成 useQuery / useMutation hooks
       *   'swr'             — 生成 SWR hooks
       *   'fetch'           — 使用原生 Fetch API
       */
      client: 'axios',

      override: {
        /**
         * mutator：使用自訂的 axios instance 取代預設的 axios
         * 讓所有生成的 API 都走 src/api/instance.ts 中的
         * 攔截器（自動注入 Token、統一錯誤處理）
         */
        mutator: {
          path: './src/api/instance.ts',
          name: 'customInstance',
        },
      },
    },
    // hooks: {
    //   afterAllFilesWrite: 'prettier --write',
    // },
    // 注意：src/api/generated/ 已加入 .gitignore，無需格式化
  },

  /**
   * ── 新增其他 API 服務的範例 ────────────────────────────────
   * 若後端有多個 micro-service，各自有不同的 Swagger spec，
   * 在此複製上方 sampleApi 區塊並修改 input.target 即可。
   *
   * anotherService: {
   *   input: { target: './swagger/another.json' },
   *   output: {
   *     mode: 'tags',
   *     target: './src/api/generated/another',
   *     schemas: './src/api/generated/another/model',
   *     client: 'axios',
   *     override: {
   *       mutator: {
   *         path: './src/api/instance.ts',
   *         name: 'customInstance',
   *       },
   *     },
   *   },
   * },
   */
});
