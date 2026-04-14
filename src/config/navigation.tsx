import {
  IconBarChartVStroked,
  IconChecklistStroked,
  IconFlowChartStroked,
  IconHome,
  IconLayers,
  IconSettingStroked,
} from '@douyinfe/semi-icons';
import type { ReactNode } from 'react';

export interface RouteItem {
  text: string;
  itemKey: string;
  icon?: ReactNode;
  children?: RouteItem[];
  /** 是否隱藏於導航（如詳情頁） */
  hideInMenu?: boolean;
  /** 跳轉路徑，預設同 itemKey */
  path?: string;
  /**
   * 存取權限 key，對應 `AccessConfig` 中的欄位名稱。
   * 設定後，使用者須擁有對應權限才能在選單中看到此項目。
   * 未設定則所有登入使用者均可見。
   *
   * @example
   * // 只有管理員（isAdmin）才能看到此項目
   * access: 'isAdmin'
   *
   * // 只有可查看設定的使用者才能看到此項目
   * access: 'canViewSettings'
   */
  access?: string;
}

export const routesConfig: RouteItem[] = [
  {
    text: '歡迎',
    itemKey: '/',
    icon: <IconHome />,
    hideInMenu: true,
  },
  {
    text: '儀表板',
    itemKey: '/dashboard',
    icon: <IconBarChartVStroked />,
    children: [
      { text: '工作台', itemKey: '/dashboard/workplace' },
      { text: '分析頁', itemKey: '/dashboard/analysis' },
      { text: '監控頁', itemKey: '/dashboard/monitor' },
    ],
  },
  {
    text: '表單頁面',
    itemKey: '/form',
    icon: <IconChecklistStroked />,
    children: [
      { text: '基礎表單', itemKey: '/form/basic' },
      { text: '步驟表單', itemKey: '/form/step' },
      { text: '進階表單', itemKey: '/form/advanced' },
    ],
  },
  {
    text: '列表頁面',
    itemKey: '/list',
    icon: <IconLayers />,
    children: [
      { text: '查詢列表', itemKey: '/list/query' },
      { text: '標準列表', itemKey: '/list/standard' },
      { text: '卡片列表', itemKey: '/list/card' },
    ],
  },
  {
    text: '詳情頁面',
    itemKey: '/detail',
    icon: <IconFlowChartStroked />,
    children: [
      { text: '基礎詳情', itemKey: '/detail/basic' },
      { text: '進階詳情', itemKey: '/detail/advanced' },
    ],
  },
  {
    text: '系統設定',
    itemKey: '/settings',
    icon: <IconSettingStroked />,
    access: 'canViewSettings',
    children: [
      { text: '帳號設定', itemKey: '/settings/account' },
      { text: '權限管理', itemKey: '/settings/permission' },
    ],
  },
];
