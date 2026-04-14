import type { ReactNode } from 'react';

interface AccessProps {
  /** 是否有存取權限（通常來自 useAccess() 的某個 key） */
  accessible: boolean;
  /** 無權限時顯示的替代內容，預設為 null（不渲染任何東西） */
  fallback?: ReactNode;
  children: ReactNode;
}

/**
 * 條件渲染包裝組件。根據 `accessible` 決定是否渲染 `children`。
 *
 * @example 基本用法
 * ```tsx
 * const access = useAccess();
 *
 * <Access accessible={access.isAdmin}>
 *   <DeleteButton />
 * </Access>
 * ```
 *
 * @example 搭配 fallback
 * ```tsx
 * <Access accessible={access.canViewSettings} fallback={<NoPermissionTip />}>
 *   <SettingsPanel />
 * </Access>
 * ```
 */
export function Access({ accessible, fallback = null, children }: AccessProps) {
  return accessible ? <>{children}</> : <>{fallback}</>;
}
