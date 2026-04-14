import { create } from 'zustand';

interface PageTitleState {
  /** 頁面元件主動設定的自訂標題，null 代表使用 breadcrumb 自動推導 */
  customTitle: string | null;
  setCustomTitle: (title: string | null) => void;
}

export const usePageTitleStore = create<PageTitleState>(set => ({
  customTitle: null,
  setCustomTitle: title => set({ customTitle: title }),
}));
