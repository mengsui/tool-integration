import { RequestConfig } from 'umi';
import Config from '../../config/config';

const { requestConfig } = Config;

const ajaxConfig: RequestConfig = {
  // 接口是否提示
  errorConfig: {
    adaptor: (resData: any) => {
      return {
        ...resData,
        showType: 0,
      };
    },
  },
  requestInterceptors: [
    (url: string, options: any) => {
      let currentRequestConfig = requestConfig.service;
      requestConfig.thirdParty.forEach(item => {
        if (url.includes(item.stamp)) {
          currentRequestConfig = item;
        };
      });

      let currentDomain = currentRequestConfig.pro;// 当前的域名
      if (process.env.NODE_ENV == 'development') {
        currentDomain = currentRequestConfig.dev;
      };

      url = `${currentDomain}${url}`;

      options.params = {
        ...options.params,
        token: requestConfig.token,
      };

      return {
        url,
        options,
      };
    },
  ],
};

export { ajaxConfig };
