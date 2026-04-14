import { IconArrowLeft, IconHome } from '@douyinfe/semi-icons';
import { Button, Typography } from '@douyinfe/semi-ui-19';
import { useNavigate } from '@modern-js/runtime/router';
import './index.less';

const { Title, Paragraph } = Typography;

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-inner">
        {/* 數字 404 */}
        <div className="not-found-code" aria-hidden="true">
          404
        </div>

        {/* 星球插圖 */}
        <div className="not-found-orbit" aria-hidden="true">
          <div className="orbit-ring orbit-ring--outer" />
          <div className="orbit-ring orbit-ring--inner" />
          <div className="orbit-planet" />
          <div className="orbit-dot" />
        </div>

        {/* 文字內容 */}
        <Title heading={3} className="not-found-title">
          哎呀，頁面不見了
        </Title>

        <Paragraph className="not-found-subtitle">
          您訪問的頁面可能已被移除、名稱已更改，
          <br />
          或暫時無法訪問。
        </Paragraph>

        {/* 操作按鈕 */}
        <div className="not-found-actions">
          <Button
            theme="solid"
            type="primary"
            size="large"
            icon={<IconHome />}
            onClick={() => navigate('/')}
          >
            返回首頁
          </Button>
          <Button
            theme="borderless"
            type="tertiary"
            size="large"
            icon={<IconArrowLeft />}
            onClick={() => navigate(-1)}
          >
            返回上一頁
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
