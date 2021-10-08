// h5适配依赖
import pxToViewPort from 'postcss-px-to-viewport';

const H5Config = {
  // 额外的postcss插件用这个extraPostCSSPlugins：
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 828, // (Number) The width of the viewport.
      // viewportHeight: 1280, // (Number) The height of the viewport.
      viewportUnit: 'vw', // (String) Expected units.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      selectorBlackList: [
        '.am-picker-col',
        '.am-picker-popup-item',
        '.am-toast',
        '.am-toast-mask',
        '.am-activity-indicator',
        '.am-icon-lg',
      ], // (Array) The selectors to ignore and leave as px. 不需要编译成vw的class名称
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
    }),
  ],
};

export default H5Config;
