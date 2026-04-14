import { IconToken } from '@douyinfe/semi-icons-lab';
import { Tooltip } from '@douyinfe/semi-ui-19';
import type { ReactNode } from 'react';
import { UserAvatar } from '../../components/UserAvatar';
import { useLayoutStore } from '../../store/layoutStore';
import { DoubleLayout } from './DoubleLayout';
import { MixLayout } from './MixLayout';
import { SideLayout } from './SideLayout';
import { TopLayout } from './TopLayout';

export interface ProLayoutProps {
  children: ReactNode;
  logo?: ReactNode;
  title?: string;
}

function SettingTrigger() {
  const { setSettingDrawerOpen } = useLayoutStore();
  return (
    <Tooltip content="佈局設定" position="bottom">
      <button
        type="button"
        onClick={() => setSettingDrawerOpen(true)}
        aria-label="佈局設定"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 8,
          border: '1px solid var(--semi-color-primary-light-active)',
          background: 'var(--semi-color-primary-light-default)',
          color: 'var(--semi-color-primary)',
          cursor: 'pointer',
          fontSize: 16,
          transition: 'background 0.2s, border-color 0.2s',
        }}
      >
        <IconToken />
      </button>
    </Tooltip>
  );
}

function HeaderExtra() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <SettingTrigger />
      <UserAvatar />
    </div>
  );
}

export function ProLayout({ children, logo, title }: ProLayoutProps) {
  const { layoutMode } = useLayoutStore();

  const sharedProps = {
    children,
    logo,
    title,
    headerExtra: <HeaderExtra />,
  };

  switch (layoutMode) {
    case 'top':
      return <TopLayout {...sharedProps} />;
    case 'mix':
      return <MixLayout {...sharedProps} />;
    case 'double':
      return <DoubleLayout {...sharedProps} />;
    default:
      return <SideLayout {...sharedProps} />;
  }
}
