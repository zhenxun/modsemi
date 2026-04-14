import { useEffect } from 'react';
import { usePageTitleStore } from '../store/pageTitleStore';

/**
 * 在頁面元件中呼叫此 Hook，可強制覆寫 `<head>` 的 `<title>`。
 * 離開頁面時自動清除，恢復成 breadcrumb 自動推導的標題。
 *
 * @example
 * ```tsx
 * // src/pages/Dashboard/Workplace/index.tsx
 * import { usePageTitle } from '../../hooks/usePageTitle';
 *
 * export default function Workplace() {
 *   usePageTitle('工作台 — 即時總覽');
 *   return <div>...</div>;
 * }
 * ```
 */
export function usePageTitle(title: string) {
  const setCustomTitle = usePageTitleStore(s => s.setCustomTitle);

  useEffect(() => {
    setCustomTitle(title);
    return () => setCustomTitle(null);
  }, [title, setCustomTitle]);
}
