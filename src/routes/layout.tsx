import { Navigate, Outlet, useLocation } from '@modern-js/runtime/router';
import { ProLayout } from '../layouts/ProLayout';
import { SettingDrawer } from '../layouts/SettingDrawer';
import { useAuthStore } from '../store/authStore';
import '../styles/global.less';

export default function Layout() {
  const location = useLocation();
  const { isLoggedIn } = useAuthStore();
  const isLoginPage = location.pathname === '/login';

  // 未登入且不在登入頁 → 直接宣告式重導，無 useEffect 競爭問題
  if (!isLoggedIn && !isLoginPage) {
    return <Navigate to="/login" replace />;
  }

  // 登入頁不套 ProLayout
  if (isLoginPage) {
    return <Outlet />;
  }

  const logo = (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        background: 'linear-gradient(135deg, #4f7dff 0%, #7b52ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 800,
        fontSize: 14,
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(79, 125, 255, 0.4)',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '-0.01em',
      }}
    >
      M
    </div>
  );

  return (
    <>
      <ProLayout title="ModSemi" logo={logo}>
        <Outlet />
      </ProLayout>
      <SettingDrawer />
    </>
  );
}
