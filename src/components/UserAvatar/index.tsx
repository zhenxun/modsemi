import {
  IconExit,
  IconMoon,
  IconSettingStroked,
  IconSun,
} from '@douyinfe/semi-icons';
import { Avatar, Dropdown } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import { useAuthStore } from '../../store/authStore';
import { useLayoutStore } from '../../store/layoutStore';
import './index.less';

function getInitials(name: string) {
  return name.trim().slice(0, 1).toUpperCase();
}

/** Header 右側使用者頭像 + Dropdown 選單 */
export function UserAvatar() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuthStore();
  const { themeMode, toggleTheme } = useLayoutStore();

  const name = currentUser?.name ?? '使用者';
  const email = currentUser?.email;

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const menu = (
    <Dropdown.Menu className="ua-menu">
      {/* 使用者資訊區塊（非可點選） */}
      <div className="ua-user-info">
        <Avatar
          size="default"
          color="blue"
          src={currentUser?.avatar}
          className="ua-user-avatar"
        >
          {getInitials(name)}
        </Avatar>
        <div className="ua-user-text">
          <div className="ua-user-name">{name}</div>
          {email && <div className="ua-user-email">{email}</div>}
        </div>
      </div>

      <Dropdown.Divider />

      <Dropdown.Item
        icon={<IconSettingStroked />}
        onClick={() => navigate('/settings/account')}
      >
        個人設定
      </Dropdown.Item>

      <Dropdown.Item
        icon={themeMode === 'dark' ? <IconSun /> : <IconMoon />}
        onClick={toggleTheme}
      >
        {themeMode === 'dark' ? '切換亮色模式' : '切換暗色模式'}
      </Dropdown.Item>

      <Dropdown.Divider />

      <Dropdown.Item
        type="danger"
        icon={<IconExit />}
        onClick={handleLogout}
      >
        登出
      </Dropdown.Item>
    </Dropdown.Menu>
  );

  return (
    <Dropdown
      trigger="click"
      position="bottomRight"
      render={menu}
      clickToHide
    >
      <div className="ua-trigger" role="button" tabIndex={0} aria-label="使用者選單">
        <Avatar
          size="small"
          color="blue"
          src={currentUser?.avatar}
          className="ua-avatar"
        >
          {getInitials(name)}
        </Avatar>
      </div>
    </Dropdown>
  );
}
