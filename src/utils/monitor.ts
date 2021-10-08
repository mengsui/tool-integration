import { request } from 'umi';
import cookie from 'react-cookies';
import config from '../../config/config';

const dataStatistics = (
  _props: any,
  event_type?: any,
  event_key?: any,
  _json?: any,
) => {
  let _url = _props.location.pathname;
  if (_props.location.search) {
    if (_props.location.search.includes('?')) {
      _url = `${_url}${_props.location.search}`;
    } else {
      _url = `${_url}?${_props.location.search}`;
    };
  };

  // 获取页面的 keywords
  let _keywords = '';
  try {
    for (let i in document.getElementsByTagName("meta")) {
      if (
        document.getElementsByTagName("meta")[i].name &&
        document.getElementsByTagName("meta")[i].name.toLowerCase() ==
        "keywords"
      ) {
        _keywords = encodeURIComponent(
          document.getElementsByTagName("meta")[i].content
        );
      };
    };
  } catch (error) { };

  let params = {
    _type: 'h5',
    user_unionid: cookie.load('unionid') || localStorage.getItem('unionid') || undefined,
    user_openid: cookie.load('openid') || localStorage.getItem('openid') || undefined,

    page_title: _props.route.title || undefined, // 页面名称
    page_keywords: _keywords || undefined, // 标签
    page_description: undefined,

    // page_url: encodeURIComponent(window.location.href),
    page_param: _props.location.query,

    page_event_type: event_type || 'read', // read == 访问量  click == 点击事件  share == 分享
    page_event_key: event_key || undefined,// 当是点击事件的时候，这里需要传点击按钮的文案。

    json: _json || undefined,

    wechat_user_name: config.monitor.user_name,
    wechat_appid: config.appid,
    wechat_name: config.monitor.name,

    wechat_event_key: undefined,
    wechat_event_msg: undefined,
    wechat_event_type: undefined,
    wechat_label: undefined,

    user_ip: undefined,
    user_network: undefined,
    user_agent: undefined,
  };

  if (process.env.NODE_ENV != 'development') {
    request(config.monitor.url, {
      method: 'get',
      params: params,
    }).then(() => { });
  } else {
    console.error('本地没有配置monitor 发送参数为：', params);
  };
};

export { dataStatistics };
