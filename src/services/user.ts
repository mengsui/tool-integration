import { request } from 'umi';

import config from '../../config/config';

export function queryTokenRule(params?: any) {
  return request(config.token.url, {
    method: 'get',
    params: {
      ...params,
      appid: config.appid,
    },
  });
}
