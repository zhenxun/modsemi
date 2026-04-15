import { Layout, Nav } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import type { ReactNode } from 'react';
import type { RouteItem } from '../../config/navigation';
import { useMenuData } from '../../hooks/useMenuData';
import { useLayoutStore } from '../../store/layoutStore';
import { LayoutBreadcrumb } from './LayoutBreadcrumb';

const { Header, Sider, Content } = Layout;

interface SideLayoutProps {
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

export function SideLayout({
  children,
  logo,
  title = 'ModSemi',
  headerExtra,
}: SideLayoutProps) {
  const navigate = useNavigate();
  const { firstLevelMenus, selectedKeys, openKeys, breadcrumbs } =
    useMenuData();
  const { fixedHeader, showBreadcrumb } = useLayoutStore();

  const navItems = toNavItems(firstLevelMenus);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          backgroundColor: 'var(--semi-color-bg-1)',
          borderRight: '1px solid var(--semi-color-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 20px',
            borderBottom: '1px solid var(--semi-color-border)',
          }}
        >
          {logo}
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--semi-color-text-0)',
              whiteSpace: 'nowrap',
            }}
          >
            {title}
          </span>
        </div>
        <Nav
          items={navItems}
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          style={{ height: 'calc(100vh - 57px)', overflowY: 'auto' }}
          onSelect={({ itemKey }) => navigate(itemKey as string)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            backgroundColor: 'var(--semi-color-bg-1)',
            borderBottom: '1px solid var(--semi-color-border)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            height: 56,
            position: fixedHeader ? 'sticky' : 'relative',
            top: 0,
            zIndex: 100,
          }}
        >
          {headerExtra}
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
    </Layout>
  );
}
