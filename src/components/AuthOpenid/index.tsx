import React, { useState, useEffect, useRef } from 'react';
import { Helmet, request, connect, GlobalModelState } from 'umi';
import Loading from '@/components/Loading';
import config from '../../../config/config';
import routes from '../../../config/routes';
import cookie from 'react-cookies';

import { useEventListener } from 'ahooks';
import { dataStatistics } from '@/utils/monitor';
import SetUserInfo from './components/SetUserInfo';

import './index.less';

const wx = require('weixin-js-sdk');

interface PropsType {
  dispatch: any;
  global: any;
  history: any;
}

const Auth: React.FC<PropsType> = (props) => {
  const { dispatch, global, history } = props;
  const { location } = history;
  const { query: { openid }, pathname } = location;

  const [auth, setAuth] = useState(false);
  const userInfoRef = useRef<any>(null);

  // 获取当前页面的router配置
  const curRouterArr: any = routes.filter((item: any) => item.path == pathname);

  // 配置monitor的移动端点击事件
  useEventListener('click', (event: any) => {
    let _nub = 20;// 递归层级最多多少层
    let _monitor: any = null;
    let _json: any = null;

    // 是否传过来的 monitor 字段
    try {
      _monitor = event.target.getAttribute('data-monitor') || '';
    } catch (error) { console.error('monitor获取失败！') };
    // 是否传过来的 keywords 字段
    try {
      _json = event.target.getAttribute('data-json') || '';
      if (_json) {
        _json = JSON.parse(_json);
      }
    } catch (error) { };

    // 当_monitor 没有的时候去遍历当前冒泡的所有节点。寻找monitor
    if (!_monitor) {
      try {
        mapParentNode(event.target);
        // 递归节点寻找monitor。
        function mapParentNode(_node: any) {
          _nub--;

          if (_node.parentNode == null || _nub == 0) {
            // console.log(_node.parentNode, _nub);
            return;
          };

          _monitor = _node.getAttribute('data-monitor') || '';
          _json = _node.getAttribute('data-json') || '';
          if (_json) {
            _json = JSON.parse(_json);
          };
          if (!_monitor && !_json) {
            mapParentNode(_node.parentNode);
          };
        };
      } catch (error) { console.error('monitor冒泡节点遍历失败！', error); }
    };


    if (_monitor || _json) {
      dataStatistics(props, 'click', _monitor, _json);
    };
  }, {
    target: document,
  });

  // 配置jssdk
  const wechatConfig = () => {
    if (!global.wxConfig) {
      dispatch({
        type: 'global/save',
        payload: {
          wxConfig: true,
        },
      });

      request(config.wechat.jssdk.url, {
        method: 'get',
      }).then((res: any) => {
        wx.config({
          appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: res.nonceStr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: config.wechat.jssdk.jsApiList,
        });

        // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        wx.ready(() => {
          wx.hideMenuItems({
            menuList: ['menuItem:copyUrl'],
          });
        });

        wx.error(function () {
          console.error(res);
        });
      });
    } else {
      // console.log('已经配置过无需在配置');
    }
  };

  // 保存用户信息
  const setWechatInfo = () => {
    const {
      openid,
      nickname,
      headimgurl,
      city,
      language,
      province,
      sex,
      subscribe,
      country,
    } = location.query;

    localStorage.setItem('openid', openid);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('headimgurl', headimgurl);
    localStorage.setItem('city', city);
    localStorage.setItem('language', language);
    localStorage.setItem('province', province);
    localStorage.setItem('sex', sex);
    localStorage.setItem('subscribe', subscribe);
    localStorage.setItem('country', country);
  };


  const fetchData = async () => {
    // 是否授权回来了。
    if (openid) {
      // 目前 cookie 有效期设置的是1周
      cookie.save(config.cookie.name, openid || '', {
        ...config.cookie,
      });
      // 存储用户信息
      setWechatInfo();
    };

    // 判断token是否过期了 （应该在ajax请求拦截里面判断token是否过期了）
    const cookieToken = cookie.load(config.cookie.name);
    if (!cookieToken) {
      if (config.wechat.oauth()) {
        cookie.save('rurel', window.location.href, {
          expires: config.cookie.expires,
        });
        window.location.replace(config.wechat.oauth());
        return false;
      };
    };

    // 强制刷新页面。（因为如果页面上带着code去后台请求的话。会出现2个code都返回了）
    const aurl = cookie.load('rurel');
    if (aurl) {
      cookie.save('rurel', '', {
        expires: config.cookie.expires,
      });
      window.location.replace(aurl);
      return;
    };

    // 微信配置（可以异步）
    wechatConfig();

    // 设置其他的信息(必须请求完毕后才能加载页面的设置)
    userInfoRef.current.setUserInfoAjax().then(() => {
      // 信息全部配置完成后可以显示页面
      setAuth(true);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 页面浏览量监测
  useEffect(() => {
    if (auth) {
      dataStatistics(props);
    };
  }, [auth]);

  return <div>
    {
      curRouterArr.length > 0 ?
        <Helmet>
          <meta name="keywords" content={curRouterArr[0].keywords || ''} />
        </Helmet>
        : ""
    }
    <SetUserInfo
      cRef={userInfoRef} />
    {auth ? props.children : <Loading />}
  </div>;
};

export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(Auth);
