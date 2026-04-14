import {
  IconCode,
  IconColumnsStroked,
  IconDoubleChevronRight,
  IconGridView,
  IconSidebar,
  IconTerminal,
  IconVersionStroked,
} from '@douyinfe/semi-icons';
import { Button, Typography } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import { useLayoutStore } from '../../store/layoutStore';
import './index.less';

const { Text } = Typography;

const STATS = [
  { value: '4', label: '佈局模式' },
  { value: '∞', label: '主題可配置' },
  { value: '100%', label: 'TypeScript' },
  { value: 'v3', label: 'Modern.js' },
];

const LAYOUTS = [
  {
    icon: <IconSidebar />,
    title: 'Side 側邊導航',
    desc: '左側固定選單，子項可巢狀展開，適合功能豐富的後台系統。',
    tag: '最常用',
    mode: 'side',
  },
  {
    icon: <IconColumnsStroked />,
    title: 'Top 頂部導航',
    desc: '水平頂欄選單，子項以 Dropdown 展開，適合寬螢幕內容型頁面。',
    tag: '寬螢幕',
    mode: 'top',
  },
  {
    icon: <IconGridView />,
    title: 'Mix 混合導航',
    desc: '頂部顯示一級模組、左側顯示二級子項，大型 SaaS 後台首選。',
    tag: '企業推薦',
    mode: 'mix',
  },
  {
    icon: <IconVersionStroked />,
    title: 'Double 雙欄導航',
    desc: '極窄圖示欄 + 文字選單欄，容納超多模組，兼顧空間與導航效率。',
    tag: '預設模式',
    mode: 'double',
  },
] as const;

const TECH = [
  { label: 'Modern.js', icon: '⚡' },
  { label: 'Semi Design', icon: '🎨' },
  { label: 'Zustand', icon: '🐻' },
  { label: 'TypeScript', icon: '🔷' },
  { label: 'Less', icon: '💅' },
];

export default function Welcome() {
  const navigate = useNavigate();
  const { setLayoutMode } = useLayoutStore();

  const handleSwitchLayout = (mode: (typeof LAYOUTS)[number]['mode']) => {
    setLayoutMode(mode);
    navigate('/dashboard/workplace');
  };

  return (
    <div className="welcome-page">
      <div className="welcome-inner">
        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            ModSemi Framework · v0.1.0
          </div>

          <h1 className="hero-title">
            現代企業級
            <br />
            <span className="hero-title-brand">中後台框架</span>
          </h1>

          <p className="hero-subtitle">
            基於 Modern.js + Semi Design
            構建，提供四種佈局模式、全域主題切換與配置化導航，讓你專注於業務，而非重複搭建基礎設施。
          </p>

          <div className="hero-actions">
            <Button
              theme="solid"
              type="primary"
              size="large"
              icon={<IconDoubleChevronRight />}
              iconPosition="right"
              onClick={() => navigate('/dashboard/workplace')}
            >
              開始使用
            </Button>
            <Button
              theme="borderless"
              type="tertiary"
              size="large"
              icon={<IconCode />}
            >
              查看原始碼
            </Button>
          </div>
        </section>

        {/* Stats */}
        <div className="stats-row">
          {STATS.map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Layout Modes */}
        <div className="section-header">
          <div className="section-label">核心能力</div>
          <div className="section-title">四種佈局模式，即選即用</div>
          <div className="section-desc">
            點擊任意卡片切換至對應佈局，或透過右下角齒輪按鈕進行設定。
          </div>
        </div>

        <div className="layout-grid">
          {LAYOUTS.map(item => (
            <button
              key={item.mode}
              type="button"
              className="layout-card"
              onClick={() => handleSwitchLayout(item.mode)}
              style={{ textAlign: 'left', width: '100%' }}
            >
              <div className="layout-card-bg" />
              <div className="layout-card-icon">{item.icon}</div>
              <div className="layout-card-title">{item.title}</div>
              <div className="layout-card-desc">{item.desc}</div>
              <span className="layout-card-tag">{item.tag}</span>
            </button>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="tech-row">
          <span className="tech-label">技術棧</span>
          {TECH.map(t => (
            <span key={t.label} className="tech-badge">
              {t.icon} {t.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
