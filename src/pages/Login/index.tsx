import {
  IconEyeClosedSolid,
  IconEyeOpened,
  IconLock,
  IconUserStroked,
} from '@douyinfe/semi-icons';
import { Button, Input, Toast } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import './index.less';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Toast.warning({ content: '請填寫帳號與密碼', duration: 2 });
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const ok = login(username.trim(), password);
    setLoading(false);
    if (ok) {
      Toast.success({ content: '登入成功，歡迎回來！', duration: 2 });
      navigate('/', { replace: true });
    } else {
      Toast.error({ content: '帳號或密碼錯誤，請確認後重試', duration: 3 });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin();
  };

  useEffect(() => {
    document.title = '登入';
  }, []);

  return (
    <div className="lp-root">
      {/* ── 左側裝飾面板 ── */}
      <div className="lp-left" aria-hidden="true">
        <div className="lp-blob lp-blob-1" />
        <div className="lp-blob lp-blob-2" />
        <div className="lp-blob lp-blob-3" />
        <div className="lp-grid" />

        <div className="lp-left-inner">
          {/* 品牌識別 */}
          <div className="lp-brand">
            <div className="lp-brand-mark">M</div>
            <span className="lp-brand-name">ModSemi</span>
          </div>

          {/* 主標語 */}
          <div className="lp-headline">
            <h1 className="lp-headline-title">
              打造高效
              <br />
              <span className="lp-headline-accent">企業中後台</span>
              <br />
              的現代框架
            </h1>
            <p className="lp-headline-sub">
              Modern.js · Semi Design · Zustand
              <br />
              配置驅動，開箱即用，四種佈局隨心切換。
            </p>
          </div>
        </div>

        {/* 底部版權 */}
        <div className="lp-left-footer">
          © 2026 ModSemi · Enterprise Edition
        </div>
      </div>

      {/* ── 右側登入面板 ── */}
      <div className="lp-right">
        <div className="lp-form-wrap">
          {/* Logo */}
          <div className="lp-form-logo">
            <div className="lp-form-logo-mark">M</div>
          </div>

          <h2 className="lp-form-title">歡迎回來</h2>
          <p className="lp-form-subtitle">請登入您的帳號以繼續使用系統</p>

          {/* 表單欄位 */}
          <div className="lp-fields" onKeyDown={handleKeyDown}>
            <div className="lp-field-group">
              <label className="lp-label" htmlFor="lp-username">
                帳號
              </label>
              <Input
                id="lp-username"
                size="large"
                prefix={<IconUserStroked />}
                placeholder="輸入您的帳號"
                value={username}
                onChange={v => setUsername(v)}
                autoComplete="username"
                className="lp-input"
              />
            </div>

            <div className="lp-field-group">
              <div className="lp-label-row">
                <label className="lp-label" htmlFor="lp-password">
                  密碼
                </label>
                <button type="button" className="lp-forgot">
                  忘記密碼？
                </button>
              </div>
              <Input
                id="lp-password"
                size="large"
                prefix={<IconLock />}
                suffix={
                  <button
                    type="button"
                    className="lp-eye-btn"
                    onClick={() => setShowPwd(v => !v)}
                    aria-label={showPwd ? '隱藏密碼' : '顯示密碼'}
                  >
                    {showPwd ? <IconEyeClosedSolid /> : <IconEyeOpened />}
                  </button>
                }
                type={showPwd ? 'text' : 'password'}
                placeholder="輸入您的密碼"
                value={password}
                onChange={v => setPassword(v)}
                autoComplete="current-password"
                className="lp-input"
              />
            </div>
          </div>

          {/* 登入按鈕 */}
          <Button
            theme="solid"
            type="primary"
            size="large"
            block
            loading={loading}
            onClick={handleLogin}
            className="lp-submit-btn"
          >
            {loading ? '登入中...' : '登入'}
          </Button>

          {/* 分隔線 */}
          <div className="lp-divider">
            <span>或使用以下方式登入</span>
          </div>

          {/* Google 登入 */}
          <button type="button" className="lp-google-btn">
            <GoogleIcon />
            <span>使用 Google 帳號登入</span>
          </button>

          {/* 提示文字 */}
          <p className="lp-hint">
            測試帳號：<code>admin</code> / <code>admin.modsemi</code>
          </p>
        </div>
      </div>
    </div>
  );
}
