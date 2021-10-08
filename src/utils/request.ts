import { useRequest } from 'umi';

const request: any = (options?: any, config?: any) => {

  return useRequest((params: any) => {
    let _opt = {
      ...params,
    };

    if (typeof options === 'string') {
      _opt.url = options;
    };

    if (typeof options === 'object') {
      _opt = {
        ..._opt,
        ...options,
      }
    };

    return _opt;
  }, {
    formatResult: res => res,
    ...config,
  });
};

export default request;
