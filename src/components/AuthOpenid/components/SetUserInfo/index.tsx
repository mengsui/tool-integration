import React, { useImperativeHandle } from 'react';
import { request, connect, GlobalModelState } from 'umi';
import cookie from 'react-cookies';
import config from '../../../../../config/config';
import './index.less';

interface PropsType {
  cRef: any;
  dispatch: any;
};

const SetUserInfoPage: React.FC<PropsType> = (props) => {
  const { cRef, dispatch } = props;
  const openid = cookie.load(config.token.name);

  useImperativeHandle(cRef, () => ({
    setUserInfoAjax,
  }));

  const setUserInfoAjax = async () => {
    let subscribeData = await request(`/blue-admin/public/api/wechat/subscribe?openid=${openid}`);

    // 设置信息
    dispatch({
      type: 'global/save',
      payload: {
        subscribe: subscribeData.code,
      },
    });
    return new Promise((resolve, reject) => {
      resolve('');
    });
  };

  return <></>;
};

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(SetUserInfoPage);
