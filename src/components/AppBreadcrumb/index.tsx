import { Breadcrumb } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import type { BreadcrumbItem } from '../../hooks/useMenuData';

export interface BreadcrumbComponentProps {
  breadcrumbs: BreadcrumbItem[];
}

/**
 * 預設 Breadcrumb 元件，使用 Semi Design 的 Breadcrumb.Item 子元素方式渲染。
 * 非最後一項可點擊並導航至對應路徑。
 * 可在 src/config/global.tsx 的 breadcrumbComponent 欄位替換為自訂元件。
 */
export function AppBreadcrumb({ breadcrumbs }: BreadcrumbComponentProps) {
  const navigate = useNavigate();
  const lastIndex = breadcrumbs.length - 1;

  return (
    <Breadcrumb>
      {breadcrumbs.map((b, i) => {
        const isLast = i === lastIndex;
        return (
          <Breadcrumb.Item
            key={b.path}
            onClick={isLast ? undefined : () => navigate(b.path)}
            style={isLast ? undefined : { cursor: 'pointer' }}
          >
            {b.text}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
