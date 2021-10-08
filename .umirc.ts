import { defineConfig } from 'umi';
import h5Config from './config/h5Config';
import routes from './config/routes';

export default defineConfig({
  // 页面顶部标题上的icon
  favicon: 'faviconBase64',
  title: '  ',
  dynamicImport: {
    loading: '@/components/Loading/index', // 页面切换有加载中动画
  },
  dva: {},
  routes,
  hash: true,
  // 接口代理使用
  proxy: {
    '/api': {
      target: 'https://127.0.0.0',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
    '/${platform}': {
      target: 'https://127.0.0.0',
      changeOrigin: true,
      pathRewrite: { '^/${platform}': '' },
    },
  },
  /**
   * 二级目录配置方案
   */
  // base: '/frontend/',
  // publicPath: '/frontend/',
  // manifest: {
  //   basePath: '/frontend',
  // },
  ...h5Config,
});
