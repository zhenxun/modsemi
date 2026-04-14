import { Layout, Nav } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import type { ReactNode } from 'react';
import type { RouteItem } from '../../config/navigation';
import { useMenuData } from '../../hooks/useMenuData';
import { useLayoutStore } from '../../store/layoutStore';
import { LayoutBreadcrumb } from './LayoutBreadcrumb';

const { Header, Content } = Layout;

interface TopLayoutProps {
  children: ReactNode;
  logo?: ReactNode;
  title?: string;
  headerExtra?: ReactNode;
}

function toNavItems(items: RouteItem[]): object[] {
  return items.map(item => ({
    itemKey: item.itemKey,
    text: item.text,
    icon: item.icon,
    items: item.children ? toNavItems(item.children) : undefined,
  }));
}

export function TopLayout({
  children,
  logo,
  title = 'ModSemi',
  headerExtra,
}: TopLayoutProps) {
  const navigate = useNavigate();
  const { firstLevelMenus, selectedKeys, breadcrumbs } = useMenuData();
  const { fixedHeader, showBreadcrumb } = useLayoutStore();

  const navItems = toNavItems(firstLevelMenus);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: 'var(--semi-color-bg-1)',
          borderBottom: '1px solid var(--semi-color-border)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          height: 56,
          position: fixedHeader ? 'sticky' : 'relative',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
          }}
        >
          {logo}
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--semi-color-text-0)',
            }}
          >
            {title}
          </span>
        </div>

        <Nav
          mode="horizontal"
          items={navItems}
          selectedKeys={selectedKeys}
          style={{ flex: 1, borderBottom: 'none' }}
          onSelect={({ itemKey }) => navigate(itemKey as string)}
        />

        <div style={{ flexShrink: 0 }}>{headerExtra}</div>
      </Header>

      <Content
        style={{
          padding: 24,
          backgroundColor: 'var(--semi-color-bg-0)',
          minHeight: 'calc(100vh - 56px)',
        }}
      >
        <LayoutBreadcrumb breadcrumbs={breadcrumbs} show={showBreadcrumb} />
        {children}
      </Content>
    </Layout>
  );
}
