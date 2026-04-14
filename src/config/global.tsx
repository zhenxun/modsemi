/**
 * ModSemi 全域設定
 *
 * 這是框架開放給使用者自訂的主要介面。
 * 修改此檔案的欄位以替換預設的框架行為，無需深入框架內部。
 *
 * 目前支援的自訂項目：
 *   - errorPages.notFound      — 404 頁面元件
 *   - breadcrumbComponent      — 麵包屑元件
 */

import type { ComponentType } from 'react';
import {
  AppBreadcrumb,
  type BreadcrumbComponentProps,
} from '../components/AppBreadcrumb';
import { NotFoundPage } from '../pages/Error/NotFound';

// ── 型別定義 ─────────────────────────────────────────────

export type { BreadcrumbComponentProps };

/** 錯誤頁面元件映射表 */
export interface GlobalErrorConfig {
  /** 訪問不存在的路徑時顯示的頁面（HTTP 404）*/
  notFound: ComponentType;
}

/** ModSemi 全域設定型別 */
export interface GlobalConfig {
  errorPages: GlobalErrorConfig;
  /**
   * 麵包屑元件。接收 `breadcrumbs: BreadcrumbItem[]`，自行決定渲染方式。
   *
   * @example 使用自訂 Breadcrumb
   * ```tsx
   * import type { BreadcrumbComponentProps } from './global';
   *
   * function MyBreadcrumb({ breadcrumbs }: BreadcrumbComponentProps) {
   *   return <div>{breadcrumbs.map(b => b.text).join(' › ')}</div>;
   * }
   *
   * export const globalConfig: GlobalConfig = {
   *   ...
   *   breadcrumbComponent: MyBreadcrumb,
   * };
   * ```
   */
  breadcrumbComponent: ComponentType<BreadcrumbComponentProps>;
}

// ── 設定本體 ─────────────────────────────────────────────

export const globalConfig: GlobalConfig = {
  errorPages: {
    notFound: NotFoundPage,
  },
  breadcrumbComponent: AppBreadcrumb,
};
