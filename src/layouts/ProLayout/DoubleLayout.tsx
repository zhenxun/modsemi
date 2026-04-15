import { Layout, Nav, Tooltip } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import type { ReactNode } from 'react';
import { type RouteItem, routesConfig } from '../../config/navigation';
import { useMenuData } from '../../hooks/useMenuData';
import { useLayoutStore } from '../../store/layoutStore';
import { LayoutBreadcrumb } from './LayoutBreadcrumb';

const { Header, Sider, Content } = Layout;

interface DoubleLayoutProps {
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

export function DoubleLayout({
  children,
  logo,
  title = 'ModSemi',
  headerExtra,
}: DoubleLayoutProps) {
  const navigate = useNavigate();
  const {
    secondLevelMenus,
    selectedKeys,
    openKeys,
    activeFirstKey,
    breadcrumbs,
  } = useMenuData();
  const { fixedHeader, showBreadcrumb, doubleFirstKey, setDoubleFirstKey } =
    useLayoutStore();

  const sideItems = toNavItems(secondLevelMenus);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          backgroundColor: 'var(--semi-color-bg-1)',
          borderBottom: '1px solid var(--semi-color-border)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          position: fixedHeader ? 'sticky' : 'relative',
          top: 0,
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
        <div>{headerExtra}</div>
      </Header>

      <Layout style={{ flex: 1 }}>
        {/* 第一欄：極窄的圖示欄 */}
        <Sider
          style={{
            width: 56,
            minWidth: 56,
            backgroundColor: 'var(--semi-color-bg-2)',
            borderRight: '1px solid var(--semi-color-border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: 8,
            gap: 4,
          }}
        >
          {routesConfig.map(item => {
            const isActive = doubleFirstKey === item.itemKey;
            return (
              <Tooltip key={item.itemKey} content={item.text} position="right">
                <button
                  type="button"
                  onClick={() => {
                    setDoubleFirstKey(item.itemKey);
                    const firstChild = item.children?.[0];
                    navigate(firstChild ? firstChild.itemKey : item.itemKey);
                  }}
                  style={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 8,
                    cursor: 'pointer',
                    border: 'none',
                    backgroundColor: isActive
                      ? 'var(--semi-color-primary-light-default)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--semi-color-primary)'
                      : 'var(--semi-color-text-2)',
                    fontSize: 18,
                    transition: 'all 0.2s',
                    marginBottom: 4,
                  }}
                  title={item.text}
                >
                  {item.icon ?? item.text.slice(0, 1)}
                </button>
              </Tooltip>
            );
          })}
        </Sider>

        {/* 第二欄：文字選單 */}
        {sideItems.length > 0 && (
          <Sider
            style={{
              backgroundColor: 'var(--semi-color-bg-1)',
              borderRight: '1px solid var(--semi-color-border)',
            }}
          >
            <Nav
              items={sideItems}
              selectedKeys={selectedKeys}
              defaultOpenKeys={openKeys}
              style={{ height: 'calc(100vh - 56px)', overflowY: 'auto' }}
              onSelect={({ itemKey }) => navigate(itemKey as string)}
            />
          </Sider>
        )}

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
