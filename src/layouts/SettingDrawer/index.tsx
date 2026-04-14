import {
  IconColumnsStroked,
  IconGridView,
  IconSidebar,
  IconVersionStroked,
} from '@douyinfe/semi-icons';
import { Divider, SideSheet, Switch, Tooltip, Typography } from '@douyinfe/semi-ui-19';
import { useEffect } from 'react';
import { type ColorTheme, type LayoutMode, useLayoutStore } from '../../store/layoutStore';

const { Title, Text } = Typography;

// ── 色系定義 ─────────────────────────────────────────────

interface ColorScale {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryDisabled: string;
  primaryLightDefault: string;
  primaryLightHover: string;
  primaryLightActive: string;
}

interface ColorThemeTokens {
  label: string;
  swatch: string; // 色票展示色（永遠用亮色版）
  light: ColorScale;
  dark: ColorScale;
}

const COLOR_THEMES: Record<ColorTheme, ColorThemeTokens> = {
  blue: {
    label: '靛藍',
    swatch: '#4165D7',
    light: {
      primary: '#4165D7',
      primaryHover: '#3355C3',
      primaryActive: '#2747AD',
      primaryDisabled: '#A8B6EC',
      primaryLightDefault: '#EEF0FB',
      primaryLightHover: '#DCE1F8',
      primaryLightActive: '#CAD1F4',
    },
    dark: {
      primary: '#6B8EFF',
      primaryHover: '#7A9DFF',
      primaryActive: '#89AAFF',
      primaryDisabled: '#273A7A',
      primaryLightDefault: '#141B38',
      primaryLightHover: '#182044',
      primaryLightActive: '#1C264F',
    },
  },
  violet: {
    label: '紫羅蘭',
    swatch: '#7C3AED',
    light: {
      primary: '#7C3AED',
      primaryHover: '#6D31D4',
      primaryActive: '#5E28BB',
      primaryDisabled: '#C4A3F6',
      primaryLightDefault: '#F3EFFE',
      primaryLightHover: '#E8DCFC',
      primaryLightActive: '#DCC9FA',
    },
    dark: {
      primary: '#A78BFA',
      primaryHover: '#B89DFB',
      primaryActive: '#C9AFFC',
      primaryDisabled: '#3D207F',
      primaryLightDefault: '#1A1030',
      primaryLightHover: '#1F1438',
      primaryLightActive: '#241840',
    },
  },
  teal: {
    label: '青碧',
    swatch: '#0891B2',
    light: {
      primary: '#0891B2',
      primaryHover: '#0779A0',
      primaryActive: '#05618E',
      primaryDisabled: '#7BCFE6',
      primaryLightDefault: '#ECFCFF',
      primaryLightHover: '#D0F4FB',
      primaryLightActive: '#B4ECF7',
    },
    dark: {
      primary: '#22D3EE',
      primaryHover: '#38DAEF',
      primaryActive: '#4EE0F0',
      primaryDisabled: '#073E50',
      primaryLightDefault: '#051A20',
      primaryLightHover: '#071F28',
      primaryLightActive: '#08252F',
    },
  },
  rose: {
    label: '玫瑰',
    swatch: '#E11D48',
    light: {
      primary: '#E11D48',
      primaryHover: '#C91940',
      primaryActive: '#B21538',
      primaryDisabled: '#F18FA4',
      primaryLightDefault: '#FFF0F3',
      primaryLightHover: '#FFE0E7',
      primaryLightActive: '#FFD0DB',
    },
    dark: {
      primary: '#FB7185',
      primaryHover: '#FC8595',
      primaryActive: '#FDA0AD',
      primaryDisabled: '#6B0F22',
      primaryLightDefault: '#250912',
      primaryLightHover: '#2C0C16',
      primaryLightActive: '#340F1A',
    },
  },
};

function applyColorTheme(theme: ColorTheme, isDark: boolean) {
  const scale = COLOR_THEMES[theme][isDark ? 'dark' : 'light'];
  const b = document.body;
  b.style.setProperty('--semi-color-primary', scale.primary);
  b.style.setProperty('--semi-color-primary-hover', scale.primaryHover);
  b.style.setProperty('--semi-color-primary-active', scale.primaryActive);
  b.style.setProperty('--semi-color-primary-disabled', scale.primaryDisabled);
  b.style.setProperty('--semi-color-primary-light-default', scale.primaryLightDefault);
  b.style.setProperty('--semi-color-primary-light-hover', scale.primaryLightHover);
  b.style.setProperty('--semi-color-primary-light-active', scale.primaryLightActive);
  b.style.setProperty('--semi-color-focus-border', scale.primary);
  b.style.setProperty('--semi-color-link', scale.primary);
  b.style.setProperty('--semi-color-link-hover', scale.primaryHover);
  b.style.setProperty('--semi-color-link-active', scale.primaryActive);
}

// ── 佈局模式選項 ─────────────────────────────────────────

interface LayoutOption {
  value: LayoutMode;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const LAYOUT_OPTIONS: LayoutOption[] = [
  { value: 'side', label: '側邊導航', icon: <IconSidebar size="large" />, description: '左側固定選單' },
  { value: 'top', label: '頂部導航', icon: <IconColumnsStroked size="large" />, description: '頂部水平選單' },
  { value: 'mix', label: '混合導航', icon: <IconGridView size="large" />, description: '頂部一級 + 左側二級' },
  { value: 'double', label: '雙欄導航', icon: <IconVersionStroked size="large" />, description: '圖示欄 + 文字欄' },
];

// ── 子元件 ───────────────────────────────────────────────

function LayoutCard({
  option,
  active,
  onClick,
}: {
  option: LayoutOption;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: '12px 8px',
        borderRadius: 8,
        border: `2px solid ${active ? 'var(--semi-color-primary)' : 'var(--semi-color-border)'}`,
        backgroundColor: active ? 'var(--semi-color-primary-light-default)' : 'var(--semi-color-bg-1)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        flex: 1,
      }}
    >
      <span style={{ color: active ? 'var(--semi-color-primary)' : 'var(--semi-color-text-2)', fontSize: 20 }}>
        {option.icon}
      </span>
      <Text
        strong={active}
        style={{
          fontSize: 12,
          color: active ? 'var(--semi-color-primary)' : 'var(--semi-color-text-1)',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {option.label}
      </Text>
    </button>
  );
}

function ColorSwatch({
  themeKey,
  tokens,
  active,
  onClick,
}: {
  themeKey: ColorTheme;
  tokens: ColorThemeTokens;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip content={tokens.label} position="top">
      <button
        type="button"
        onClick={onClick}
        aria-label={tokens.label}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 5,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 6px',
          borderRadius: 6,
          transition: 'background 0.15s',
        }}
      >
        <span
          style={{
            display: 'block',
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: tokens.swatch,
            boxShadow: active
              ? `0 0 0 2px var(--semi-color-bg-0), 0 0 0 4px ${tokens.swatch}`
              : `0 0 0 2px transparent`,
            transition: 'box-shadow 0.2s',
          }}
        />
        <Text
          style={{
            fontSize: 11,
            color: active ? 'var(--semi-color-primary)' : 'var(--semi-color-text-2)',
            fontWeight: active ? 600 : 400,
            whiteSpace: 'nowrap',
          }}
        >
          {tokens.label}
        </Text>
      </button>
    </Tooltip>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      type="tertiary"
      style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}
    >
      {children}
    </Text>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
      <div>
        <Text style={{ fontSize: 14 }}>{label}</Text>
        {description && (
          <Text type="tertiary" style={{ fontSize: 12, display: 'block' }}>
            {description}
          </Text>
        )}
      </div>
      {children}
    </div>
  );
}

// ── 主元件 ───────────────────────────────────────────────

export function SettingDrawer() {
  const {
    settingDrawerOpen,
    setSettingDrawerOpen,
    layoutMode,
    setLayoutMode,
    themeMode,
    toggleTheme,
    colorTheme,
    setColorTheme,
    fixedHeader,
    setFixedHeader,
    showBreadcrumb,
    setShowBreadcrumb,
  } = useLayoutStore();

  // 同步暗色模式 + 色系 CSS 變數
  useEffect(() => {
    const isDark = themeMode === 'dark';
    if (isDark) {
      document.body.setAttribute('theme-mode', 'dark');
    } else {
      document.body.removeAttribute('theme-mode');
    }
    applyColorTheme(colorTheme, isDark);
  }, [themeMode, colorTheme]);

  return (
    <SideSheet
      title={<Title heading={5} style={{ margin: 0 }}>佈局設定</Title>}
      visible={settingDrawerOpen}
      onCancel={() => setSettingDrawerOpen(false)}
      footer={null}
      width={300}
      placement="right"
    >
      {/* 佈局模式 */}
      <SectionTitle>佈局模式</SectionTitle>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 4 }}>
        {LAYOUT_OPTIONS.map(option => (
          <LayoutCard
            key={option.value}
            option={option}
            active={layoutMode === option.value}
            onClick={() => setLayoutMode(option.value)}
          />
        ))}
      </div>

      <Divider style={{ margin: '20px 0' }} />

      {/* 色系主題 */}
      <SectionTitle>色系主題</SectionTitle>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 14, marginBottom: 4 }}>
        {(Object.entries(COLOR_THEMES) as [ColorTheme, ColorThemeTokens][]).map(([key, tokens]) => (
          <ColorSwatch
            key={key}
            themeKey={key}
            tokens={tokens}
            active={colorTheme === key}
            onClick={() => setColorTheme(key)}
          />
        ))}
      </div>

      <Divider style={{ margin: '20px 0' }} />

      {/* 主題切換 */}
      <SectionTitle>主題模式</SectionTitle>
      <SettingRow
        label={themeMode === 'dark' ? '暗色模式' : '亮色模式'}
        description="切換介面整體配色主題"
      >
        <Switch
          checked={themeMode === 'dark'}
          onChange={toggleTheme}
          checkedText="暗"
          uncheckedText="亮"
        />
      </SettingRow>

      <Divider style={{ margin: '20px 0' }} />

      {/* 介面配置 */}
      <SectionTitle>介面配置</SectionTitle>
      <SettingRow label="固定頂欄" description="頁面捲動時 Header 保持固定">
        <Switch checked={fixedHeader} onChange={checked => setFixedHeader(checked)} />
      </SettingRow>
      <SettingRow label="顯示麵包屑" description="在內容區頂部顯示路徑導覽">
        <Switch checked={showBreadcrumb} onChange={checked => setShowBreadcrumb(checked)} />
      </SettingRow>
    </SideSheet>
  );
}
