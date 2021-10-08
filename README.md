# 问题：

- [x] 数据统计收集方案。

- [x] request 修改为 useRequest 

- [x] 授权流程修改。

- [x] code如果页面上有，进入授权页面，然后返回页面的时候会有2个code。

- [ ] token卡点过期问题。（应该放到接口错误处理里面）。

- [ ] useState 使用问题。
  1>当有多个数据需要在一个方法中同时set数据。如何避免多次渲染。因为每次 set 数据的时候都会引发重复渲染问题。
  解决方案：是否可以模仿小程序，只有一个state，页面全部去维护一个state。如果这样来的话会每次修改state的时候只能修改一次。因为 set方法是有异步问题。

- [x] 授权后页面强刷。

- [x] 微信统一配置关闭复制按钮。


# Getting Started
```bash
$ yarn
$ yarn start
```

#  目录架构
```
.
├── package.json
├── .umirc.ts
├── .env
├── mock                        # mock数据
├── config
    ├── config.ts               # 基础信息设置
    ├── fit.ts                  # h5适配方案（如果需要部分class不需要编译的话，通过这里配置）
    └── routes.ts               # 页面路由配置
└── src
    ├── .umi
    ├── assets
    ├── components              # 通用组件
        ├── Auth                # 权限验证
        └── Loading             # 页面切换中的动画
    ├── layouts                 # 布局组件
    ├── models                  # reudx
    ├── pages                   # 页面路径
    ├── services                # 接口请求
    ├── global.css              # 全局css
    └── app.ts                  # 运行时配置文件。
```

# 注意
1、code 是关键字。不要在链接上拼接使用。


# 插件说明

## request 请求方式 
[学习链接](https://ahooks.js.org/zh-CN/hooks/async)

## 时间格式化组件 moment[链接](http://momentjs.cn/)
> yarn add moment

[HH:mm 于 hh:mm区别](https://blog.csdn.net/qq_38933412/article/details/82879127)
```
moment().format("YYYY-MM-DD HH:mm");  // 2020-06-21 13:21

moment(UTC)// 里面可以传UTC的格式 其他格式请看官网
```


## 拖动插件
### div可随意拖拽
> yarn add phy-touch                拖拽组件
@/utils/transform.js            于phy-touch一起使用

## 吸顶插件 
> yarn add react-sticky-el

## 上拉加载下滑刷新react-bscroll[链接](https://github.com/soluteli/react-bscroll)
```
// @/components/Scroll/index 组件 其他使用方法看 链接
import Scroll from '@/components/Scroll/index';

```

## 滑动组件[链接](http://ustbhuangyi.github.io/better-scroll/doc/zh-hans/options.html#probetype)
> yarn add better-scroll
> yarn add @types/better-scroll

## cookies使用插件[react-cookies](https://www.npmjs.com/package/react-cookies)
> yarn add react-cookies @types/react-cookies
# tool-integration
