/**
 * title: 页面标题
 * keywords: 数据监测使用 可以不填（如后台需要页面的keywords在填写）
 * path: 访问的页面路径
 * wrappers: 高阶组件
 * component: 页面地址。
*/
const routers = [
  {
    path: '/',
    wrappers: ['@/components/BluedotAuth/index'], // 授权、数据监测、获取用户信息、微信jssdk配置。
    component: '@/pages/test/index',
  },
  {
    title: '404',
    component: '@/pages/errPage/404/index',
  },
];

export default routers;
