import { useLocation } from '@modern-js/runtime/router';
import { useMemo } from 'react';
import { type RouteItem, routesConfig } from '../config/navigation';
import { type LayoutMode, useLayoutStore } from '../store/layoutStore';
import { useAccess } from './useAccess';

export interface BreadcrumbItem {
  path: string;
  text: string;
}

export interface MenuDataResult {
  /** 一級選單（hideInMenu 與無權限的項目已過濾） */
  firstLevelMenus: RouteItem[];
  /** 二級選單（mix/double 模式下根據一級選中項計算） */
  secondLevelMenus: RouteItem[];
  /** 當前路徑對應的選中 key 列表 */
  selectedKeys: string[];
  /** 當前路徑對應的展開 key 列表（側邊欄用） */
  openKeys: string[];
  /** mix/double 模式下一級選中的 itemKey */
  activeFirstKey: string;
  /** 麵包屑資料，使用 routesConfig 的 text 顯示 */
  breadcrumbs: BreadcrumbItem[];
}

/**
 * 根據 pathname 從 routesConfig 建立麵包屑資料。
 * 搜尋範圍包含 hideInMenu 的項目（如歡迎頁），以確保每個路徑都有正確的文字。
 * 麵包屑不受權限過濾影響（已知路徑就顯示文字）。
 */
function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  for (const item of routesConfig) {
    if (pathname === item.itemKey) {
      return [{ path: item.itemKey, text: item.text }];
    }
    if (item.children) {
      for (const child of item.children) {
        if (
          pathname === child.itemKey ||
          pathname.startsWith(`${child.itemKey}/`)
        ) {
          return [
            { path: item.itemKey, text: item.text },
            { path: child.itemKey, text: child.text },
          ];
        }
      }
    }
  }
  return [{ path: pathname, text: pathname }];
}

/** 根據 pathname 找到匹配的一級父節點 itemKey */
function findFirstLevelKey(pathname: string, routes: RouteItem[]): string {
  for (const item of routes) {
    if (pathname === item.itemKey || pathname.startsWith(`${item.itemKey}/`)) {
      return item.itemKey;
    }
    if (item.children) {
      for (const child of item.children) {
        if (
          pathname === child.itemKey ||
          pathname.startsWith(`${child.itemKey}/`)
        ) {
          return item.itemKey;
        }
      }
    }
  }
  return routes[0]?.itemKey ?? '';
}

/** 根據 pathname 計算選中 key 與展開 key */
function computeSelectedAndOpen(
  pathname: string,
  routes: RouteItem[],
): { selectedKeys: string[]; openKeys: string[] } {
  const selectedKeys: string[] = [];
  const openKeys: string[] = [];

  for (const item of routes) {
    if (pathname === item.itemKey) {
      selectedKeys.push(item.itemKey);
      break;
    }
    if (item.children) {
      for (const child of item.children) {
        if (
          pathname === child.itemKey ||
          pathname.startsWith(`${child.itemKey}/`)
        ) {
          selectedKeys.push(child.itemKey);
          openKeys.push(item.itemKey);
          break;
        }
      }
    }
  }

  if (selectedKeys.length === 0) {
    selectedKeys.push(pathname);
  }

  return { selectedKeys, openKeys };
}

function buildMenuData(
  layoutMode: LayoutMode,
  activeFirstKey: string,
  selectedKeys: string[],
  openKeys: string[],
  doubleFirstKey: string,
  routes: RouteItem[],
): MenuDataResult {
  const base = { breadcrumbs: [] as BreadcrumbItem[] };

  switch (layoutMode) {
    case 'side':
      return {
        ...base,
        firstLevelMenus: routes,
        secondLevelMenus: [],
        selectedKeys,
        openKeys,
        activeFirstKey,
      };

    case 'top':
      return {
        ...base,
        firstLevelMenus: routes,
        secondLevelMenus: [],
        selectedKeys,
        openKeys: [],
        activeFirstKey,
      };

    case 'mix': {
      const activeParent = routes.find(r => r.itemKey === activeFirstKey);
      return {
        ...base,
        firstLevelMenus: routes,
        secondLevelMenus: activeParent?.children ?? [],
        selectedKeys,
        openKeys,
        activeFirstKey,
      };
    }

    case 'double': {
      const activeParent = routes.find(r => r.itemKey === doubleFirstKey);
      return {
        ...base,
        firstLevelMenus: routes,
        secondLevelMenus: activeParent?.children ?? [],
        selectedKeys,
        openKeys,
        activeFirstKey: doubleFirstKey,
      };
    }

    default:
      return {
        ...base,
        firstLevelMenus: routes,
        secondLevelMenus: [],
        selectedKeys,
        openKeys,
        activeFirstKey,
      };
  }
}

export function useMenuData(): MenuDataResult {
  const { layoutMode, doubleFirstKey } = useLayoutStore();
  const location = useLocation();
  const pathname = location.pathname;
  const access = useAccess();

  /**
   * 依序套用兩層過濾：
   * 1. hideInMenu — 不顯示於選單（如歡迎頁）
   * 2. access — 無對應權限的項目自動隱藏（一、二級均過濾）
   */
  const visibleRoutes = useMemo(() => {
    const accessMap = access as unknown as Record<string, boolean>;
    return routesConfig
      .filter(item => !item.hideInMenu)
      .filter(item => !item.access || Boolean(accessMap[item.access]))
      .map(item => ({
        ...item,
        children: item.children?.filter(
          child => !child.access || Boolean(accessMap[child.access]),
        ),
      }));
  }, [access]);

  return useMemo(() => {
    const { selectedKeys, openKeys } = computeSelectedAndOpen(
      pathname,
      visibleRoutes,
    );
    const activeFirstKey = findFirstLevelKey(pathname, visibleRoutes);
    const breadcrumbs = buildBreadcrumbs(pathname);

    return {
      ...buildMenuData(
        layoutMode,
        activeFirstKey,
        selectedKeys,
        openKeys,
        doubleFirstKey,
        visibleRoutes,
      ),
      breadcrumbs,
    };
  }, [layoutMode, pathname, doubleFirstKey, visibleRoutes]);
}
