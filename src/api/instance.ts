/**
 * Axios Instance — ModSemi API 統一請求入口
 *
 * 所有 orval 生成的 API 函式都使用此 instance 發出請求。
 * 在此集中管理：baseURL、逾時、請求攔截器（注入 Token）、回應攔截器（錯誤處理）。
 */

import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

// ── 環境設定 ────────────────────────────────────────────────
// Modern.js 透過 .env 檔案注入環境變數，於 modern.config.ts 中設定 source.define
const BASE_URL =
  (typeof process !== 'undefined' && process.env.MODERN_APP_API_BASE_URL) ||
  '/api';

// ── 建立 instance ──────────────────────────────────────────
export const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── 請求攔截器：自動注入 Bearer Token ─────────────────────
apiInstance.interceptors.request.use(
  config => {
    // 從 localStorage 讀取 authStore 持久化的 token
    // 若日後 authStore 新增 token 欄位，在此取用
    const raw = localStorage.getItem('modsemi-auth');
    if (raw) {
      try {
        const state = JSON.parse(raw) as { state?: { token?: string } };
        const token = state?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // JSON 解析失敗時忽略，不影響請求
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

// ── 回應攔截器：統一錯誤處理 ──────────────────────────────
apiInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        // Token 過期或無效 → 清除本地登入狀態並導向登入頁
        localStorage.removeItem('modsemi-auth');
        window.location.href = '/login';
      }

      if (status === 403) {
        console.warn('[API] 403 Forbidden — 無此操作權限');
      }

      if (status >= 500) {
        console.error('[API] 伺服器錯誤', error.response.data);
      }
    } else if (error.request) {
      console.error('[API] 網路錯誤，請檢查連線', error.message);
    }

    return Promise.reject(error);
  },
);

/**
 * orval mutator — 供 orval.config.ts 的 `mutator` 欄位引用。
 * orval 生成的每個 API 函式會呼叫此函式發送請求。
 */
export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return apiInstance(config).then(response => response.data as T);
};

export default apiInstance;
