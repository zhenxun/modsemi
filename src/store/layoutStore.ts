import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LayoutMode = 'side' | 'top' | 'mix' | 'double';
export type ThemeMode = 'light' | 'dark';
export type ColorTheme = 'blue' | 'violet' | 'teal' | 'rose';

export interface LayoutState {
  /** 佈局模式 */
  layoutMode: LayoutMode;
  /** 主題模式（亮色 / 暗色） */
  themeMode: ThemeMode;
  /** 色系主題 */
  colorTheme: ColorTheme;
  /** 是否固定 Header */
  fixedHeader: boolean;
  /** 是否顯示麵包屑 */
  showBreadcrumb: boolean;
  /** 設定面板是否開啟 */
  settingDrawerOpen: boolean;
  /** double 模式下第一欄選中的 itemKey */
  doubleFirstKey: string;
}

export interface LayoutActions {
  setLayoutMode: (mode: LayoutMode) => void;
  setThemeMode: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setColorTheme: (color: ColorTheme) => void;
  setFixedHeader: (fixed: boolean) => void;
  setShowBreadcrumb: (show: boolean) => void;
  setSettingDrawerOpen: (open: boolean) => void;
  setDoubleFirstKey: (key: string) => void;
}

const initialState: LayoutState = {
  layoutMode: 'double',
  themeMode: 'light',
  colorTheme: 'blue',
  fixedHeader: true,
  showBreadcrumb: true,
  settingDrawerOpen: false,
  doubleFirstKey: '/dashboard',
};

export const useLayoutStore = create<LayoutState & LayoutActions>()(
  persist(
    set => ({
      ...initialState,

      setLayoutMode: mode => set({ layoutMode: mode }),

      setThemeMode: theme => set({ themeMode: theme }),

      toggleTheme: () =>
        set(state => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        })),

      setColorTheme: color => set({ colorTheme: color }),

      setFixedHeader: fixed => set({ fixedHeader: fixed }),

      setShowBreadcrumb: show => set({ showBreadcrumb: show }),

      setSettingDrawerOpen: open => set({ settingDrawerOpen: open }),

      setDoubleFirstKey: key => set({ doubleFirstKey: key }),
    }),
    {
      name: 'modsemi-layout',
      partialize: (state: LayoutState & LayoutActions) => ({
        layoutMode: state.layoutMode,
        themeMode: state.themeMode,
        colorTheme: state.colorTheme,
        fixedHeader: state.fixedHeader,
        showBreadcrumb: state.showBreadcrumb,
        doubleFirstKey: state.doubleFirstKey,
      }),
    },
  ),
);
