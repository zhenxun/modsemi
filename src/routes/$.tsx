/**
 * Catch-all 路由（Modern.js 通配符檔案）
 *
 * 任何未被其他 page.tsx 匹配到的路徑都會落到這裡。
 * 實際渲染哪個元件由 src/config/global.tsx 的 errorPages.notFound 決定。
 */

import { globalConfig } from '../config/global';

const NotFound = globalConfig.errorPages.notFound;

export default function NotFoundRoute() {
  return <NotFound />;
}
