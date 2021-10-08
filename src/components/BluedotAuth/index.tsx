import React, { useState, useEffect, useRef } from 'react';
import { request, connect, GlobalModelState } from 'umi';
import Loading from '@/components/Loading';
import { AuthOpenid } from 'bluedot-react-ui';
import config from '../../../config/config';

import './index.less';

interface PropsType {
  history: any;
}

const Auth: React.FC<PropsType> = (props) => {
  const { history } = props;
  const { location } = history;
  const { query: { code } } = location;

  return <AuthOpenid
    children={props.children}
    config={config}
    // loadingExtra={<Loading />}
    middleware={(resolve, reject) => {
      console.log('进入中间件了');
      resolve();
    }}
    onLoad={() => {
      console.log('授权设置完毕');
    }}
  />;
};

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(Auth);
