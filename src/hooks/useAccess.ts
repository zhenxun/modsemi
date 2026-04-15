import { useAuthStore } from '../store/authStore';

/**
 * 系統權限定義。
 * 每個 key 代表一項存取能力，值為 boolean。
 * 在 navigation.tsx 的 `access` 欄位填入對應 key，
 * 可自動控制選單的顯示 / 隱藏。
 */
export interface AccessConfig {
  /** 是否為系統管理員 */
  isAdmin: boolean;
  /** 是否可查看儀表板 */
  canViewDashboard: boolean;
  /** 是否可查看表單頁面 */
  canViewForm: boolean;
  /** 是否可查看列表頁面 */
  canViewList: boolean;
  /** 是否可查看詳情頁面 */
  canViewDetail: boolean;
  /** 是否可查看系統設定 */
  canViewSettings: boolean;
}

/**
 * 根據當前登入使用者的角色（roles），計算各功能的存取權限。
 *
 * **設計原則：**
 * - 「角色 → 權限」的對映邏輯集中於此 hook，業務程式碼只消費語意化 key。
 * - 新增角色或調整權限範圍，只需修改此檔案。
 *
 * @example
 * ```tsx
 * function AdminButton() {
 *   const access = useAccess();
 *   if (!access.isAdmin) return null;
 *   return <Button>管理員功能</Button>;
 * }
 * ```
 */
export function useAccess(): AccessConfig {
  const { currentUser } = useAuthStore();
  const roles = currentUser?.roles ?? [];
  const isAdmin = roles.includes('admin');

  return {
    isAdmin,
    canViewDashboard: true, // 所有登入使用者皆可存取
    canViewForm: true,
    canViewList: true,
    canViewDetail: true,
    canViewSettings: isAdmin, // 僅管理員可見
  };
}
