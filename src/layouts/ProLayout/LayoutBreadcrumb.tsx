import { useEffect } from 'react';
import { globalConfig } from '../../config/global';
import type { BreadcrumbItem } from '../../hooks/useMenuData';
import { usePageTitleStore } from '../../store/pageTitleStore';

interface LayoutBreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
  show: boolean;
}

/**
 * 讀取 globalConfig.breadcrumbComponent 並渲染。
 * 同時根據 breadcrumbs 自動同步 document.title，
 * 若頁面元件呼叫了 usePageTitle()，則優先使用自訂標題。
 */
export function LayoutBreadcrumb({ breadcrumbs, show }: LayoutBreadcrumbProps) {
  const customTitle = usePageTitleStore(s => s.customTitle);

  useEffect(() => {
    const autoTitle = breadcrumbs[breadcrumbs.length - 1]?.text;
    document.title = customTitle ?? autoTitle ?? document.title;
  }, [breadcrumbs, customTitle]);

  if (!show || breadcrumbs.length === 0) return null;

  const BreadcrumbComp = globalConfig.breadcrumbComponent;
  return (
    <div style={{ marginBottom: 16 }}>
      <BreadcrumbComp breadcrumbs={breadcrumbs} />
    </div>
  );
}
