import { appTools, defineConfig } from '@modern-js/app-tools';

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  plugins: [appTools()],
  tools: {
    // 啟用 Less 支援（Modern.js 內建，安裝 less 即可）
    styleLoader: {},
  },
  dev: {
    server: {
      proxy: {
        /**
         * API Proxy — 解決本地開發的 CORS 問題
         *
         * 所有 /api/** 請求會在 dev server 端轉發給後端，
         * 瀏覽器只看到同源的 /api，不會觸發 CORS。
         *
         * 使用方式：
         *   將 target 改為後端實際位址，例如：
         *   'http://localhost:3001'
         *   'https://staging-api.example.com'
         *
         * 注意：此設定僅在 `pnpm dev` 時生效；
         *       正式環境請改用 Nginx / CDN 的 proxy 設定。
         */
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          // 將 /api 前綴從轉發路徑中移除
          // 例如：前端呼叫 /api/users → 後端收到 /users
          // 若後端 route 本身已包含 /api，請刪除下面這行
          pathRewrite: { '^/api': '' },
        },
      },
    },
  },
});
