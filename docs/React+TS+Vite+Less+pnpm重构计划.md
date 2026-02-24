# React + TypeScript + Vite + Less 重构计划

## 一、技术栈

- **前端框架**: React 18+
- **语言**: TypeScript 5.x
- **构建工具**: Vite 5.x
- **包管理器**: pnpm 8.x
- **样式方案**: Less + CSS Modules
- **路由**: React Router v6
- **状态管理**: React Context / Zustand（可选）
- **UI组件**: 可选 Ant Design / Shadcn/ui

## 二、项目初始化

### 2.1 创建项目

```bash
# 使用 Vite 创建 React + TypeScript 项目
pnpm create vite@latest personal-website-navigation -- --template react-ts

cd personal-website-navigation

# 安装必要依赖
pnpm add react-router-dom zustand less @types/less

# 开发依赖
pnpm add -D @types/node eslint @eslint/react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 2.2 项目目录结构

```
src/
├── assets/
│   ├── images/          # 图片资源
│   ├── fonts/           # 字体文件
│   └── styles/          # 全局样式
│       ├── variables.less
│       ├── mixins.less
│       └── global.less
├── components/          # 公共组件
│   ├── Layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── Layout.tsx
│   ├── WebItem/
│   │   ├── WebItem.tsx
│   │   └── index.ts
│   ├── SearchBox/
│   │   ├── SearchBox.tsx
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── index.ts
│   └── common/          # 通用组件
│       ├── Button.tsx
│       ├── Modal.tsx
│       └── Select.tsx
├── pages/               # 页面组件
│   ├── Home/
│   │   ├── index.tsx
│   │   └── Home.module.less
│   ├── Manage/
│   │   ├── index.tsx
│   │   └── Manage.module.less
│   └── About/
│       ├── index.tsx
│       └── About.module.less
├── hooks/               # 自定义 Hooks
│   ├── useCategories.ts
│   ├── useLanguage.ts
│   └── useSearchEngines.ts
├── stores/              # 状态管理
│   ├── categoryStore.ts
│   ├── searchEngineStore.ts
│   └── index.ts
├── types/               # TypeScript 类型定义
│   ├── category.ts
│   ├── website.ts
│   └── searchEngine.ts
├── utils/               # 工具函数
│   ├── api.ts
│   ├── constants.ts
│   └── helpers.ts
├── data/                # 静态数据
│   └── data.json
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## 三、核心功能迁移

### 3.1 数据类型定义

```typescript
// src/types/category.ts
export interface Website {
  url: string;
  logo: string;
  title: string;
  desc: string;
  is_hot?: boolean;
}

export interface Category {
  name: string;
  en_name: string;
  icon: string;
  web?: Website[];
  children?: Category[];
}

// src/types/searchEngine.ts
export interface SearchEngine {
  name: string;
  icon: string;
  url: string;
}

// src/types/data.ts
export interface SiteData {
  categories: Category[];
  searchEngines: SearchEngine[];
}
```

### 3.2 状态管理

```typescript
// 使用 Zustand 进行状态管理
import { create } from 'zustand';
import { SiteData, Category, SearchEngine } from '../types';

interface SiteStore extends SiteData {
  setCategories: (categories: Category[]) => void;
  setSearchEngines: (engines: SearchEngine[]) => void;
  addCategory: (category: Category) => void;
  addWebsite: (categoryIndex: number, website: Website) => void;
  saveToServer: () => Promise<void>;
}

export const useSiteStore = create<SiteStore>((set, get) => ({
  categories: [],
  searchEngines: [],
  setCategories: (categories) => set({ categories }),
  setSearchEngines: (searchEngines) => set({ searchEngines }),
  addCategory: (category) => 
    set((state) => ({ categories: [...state.categories, category] })),
  addWebsite: (categoryIndex, website) =>
    set((state) => {
      const newCategories = [...state.categories];
      newCategories[categoryIndex].web = [
        ...(newCategories[categoryIndex].web || []),
        website
      ];
      return { categories: newCategories };
    }),
  saveToServer: async () => {
    const { categories, searchEngines } = get();
    await fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories, searchEngines }),
    });
  },
}));
```

### 3.3 页面组件迁移

#### 首页 (Home)

```typescript
// src/pages/Home/index.tsx
import { useState, useEffect } from 'react';
import { useSiteStore } from '../../stores';
import Layout from '../../components/Layout';
import WebItem from '../../components/WebItem';
import SearchBox from '../../components/SearchBox';
import Footer from '../../components/Footer';
import styles from './Home.module.less';

const Home: React.FC = () => {
  const { categories, setCategories } = useSiteStore();
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');

  useEffect(() => {
    // 加载数据
    import('../../data/data.json').then((data) => {
      setCategories(data.default.categories || data.default);
    });
  }, []);

  const transName = (item: Category): string => {
    return language === 'zh' ? item.name : item.en_name;
  };

  return (
    <Layout>
      <SearchBox />
      {categories.map((item, idx) => (
        <div key={idx}>
          {item.web && <WebItem item={item} transName={transName} />}
          {item.children?.map((subItem, subIdx) => (
            <WebItem key={subIdx} item={subItem} transName={transName} />
          ))}
        </div>
      ))}
      <Footer />
    </Layout>
  );
};

export default Home;
```

#### 管理页面 (Manage)

```typescript
// src/pages/Manage/index.tsx
import { useState } from 'react';
import { useSiteStore } from '../../stores';
import { Website, Category, SearchEngine } from '../../types';
import styles from './Manage.module.less';

const Manage: React.FC = () => {
  const { categories, searchEngines, setCategories, setSearchEngines, saveToServer } = useSiteStore();
  const [formData, setFormData] = useState<Website>({
    title: '',
    url: '',
    logo: '',
    desc: '',
  });

  const handleSubmit = async () => {
    // 添加网站逻辑
    await saveToServer();
  };

  return (
    <div className={styles.manage}>
      {/* 网站管理表单 */}
      {/* 分类管理 */}
      {/* 搜索引擎管理 */}
    </div>
  );
};

export default Manage;
```

## 四、样式迁移

### 4.1 全局样式变量

```less
// src/assets/styles/variables.less
@primary-color: #3498db;
@secondary-color: #2ecc71;
@text-color: #333;
@bg-color: #f5f5f5;
@sidebar-width: 260px;
@header-height: 60px;
@border-radius: 4px;
@transition-speed: 0.3s;
```

### 4.2 组件样式

```less
// src/pages/Home/Home.module.less
.home {
  min-height: 100vh;
  background: @bg-color;
  
  .category-section {
    margin-bottom: 30px;
    
    h4 {
      color: @text-color;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      
      i {
        margin-right: 8px;
      }
    }
  }
}
```

## 五、路由配置

```typescript
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Manage from '../pages/Manage';
import About from '../pages/About';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/manage', element: <Manage /> },
  { path: '/about', element: <About /> },
], {
  basename: process.env.BASE_URL,
});
```

## 六、API 服务

```typescript
// src/utils/api.ts
const API_BASE = 'http://localhost:3000/api';

export const saveData = async (data: object): Promise<void> => {
  const response = await fetch(`${API_BASE}/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to save data');
  }
};
```

## 七、迁移步骤

### 第一阶段：基础框架搭建
1. 初始化 React + TypeScript 项目
2. 配置 Vite 和 Less
3. 设置 ESLint 和 Prettier
4. 配置 React Router

### 第二阶段：核心组件开发
1. Layout 布局组件
2. WebItem 卡片组件
3. SearchBox 搜索组件
4. Footer 页脚组件

### 第三阶段：页面开发
1. 首页（导航展示）
2. 管理页面（CRUD 操作）
3. 关于页面

### 第四阶段：功能完善
1. 多语言支持
2. 拖拽排序功能
3. 数据持久化

### 第五阶段：测试与优化
1. 单元测试
2. 性能优化
3. 部署配置

## 八、性能优化

- 使用 React.lazy 路由懒加载
- 图片懒加载（使用 lazy load）
- 组件代码分割
- 优化 Less 构建

## 九、部署方案

```bash
# 构建生产版本
pnpm build

# 部署到 GitHub Pages
pnpm add -D gh-pages
pnpm run deploy
```

## 十、文件命名规范

- **文件名**: 采用 kebab-case 命名法，例如 `about-me.tsx`、`web-item.tsx`
- **组件名**: 组件文件与目录同名，如 `components/web-item/` 下放置 `web-item.tsx`
- **样式文件**: 与组件文件同名，使用 `.module.less` 后缀，如 `web-item.module.less`
- **页面文件**: 采用功能命名，如 `manage-page.tsx`、`about-page.tsx`
- **Hook 文件**: 以 `use` 开头，如 `use-categories.ts`、`use-search.ts`
- **工具文件**: 采用功能描述命名，如 `date-helper.ts`、`api-client.ts`

## 十一、注意事项

1. **保持数据格式兼容**：确保 JSON 数据结构不变
2. **平滑迁移**：可并行运行新旧版本进行对比测试
3. **渐进式重构**：建议分模块逐步迁移
4. **类型安全**：充分利用 TypeScript 类型检查
5. **兼容性**：保留原有 Express 后端 API
