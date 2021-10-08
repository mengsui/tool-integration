interface WeChatJssdkType {
  url: string;
  jsApiList: string[];
}

interface RequestConfigType {
  token: string;
  service: {
    pro: string;
    dev: string;
  };
  thirdParty: ThirdPartyType[];
}
interface ThirdPartyType {
  stamp: string;
  pro: string;
  dev: string;
}

interface WeChatType {
  saveData?: boolean;
  oauth: () => string;
  jssdk: WeChatJssdkType;
}
interface CryptoType {
  iv: string;
  key: string;
}
interface CookieType {
  name: string;
  expires: Date;
}
interface TokenType {
  name: string;
  url: string;
  urlignore: string[];
}
interface MonitorType {
  url: string;
  user_name: string;
}

interface ConfigType {
  appid: string,
  requestConfig: RequestConfigType;
  wechat: WeChatType;
  crypto: CryptoType;
  cookie: CookieType;
  monitor: MonitorType;
}

const Config: ConfigType = {
  appid: '',// 公众号appid
  requestConfig: {
    token: '',// 中台token
    service: {
      pro: '',// 正式环境
      dev: 'http://localhost:3001'// 测试环境
    },
    thirdParty: [// 第三方接口
      {
        stamp: '${platform}',// 用于标记（注意一定不要和接口的重名）
        pro: 'https://middle-platform.blue-dot.cn',
        dev: 'http://localhost:3002',
      }
    ],
  },
  wechat: {
    saveData: true,// 是否保存wechat到localStorage中（注意：插件的默认值就是true，这里设置只是为了展示）
    oauth: () => {
      let _url = window.location.href;
      if (_url.includes('?')) {
        _url = `${_url}&token=${Config.requestConfig.token}`;
      } else {
        _url = `${_url}?token=${Config.requestConfig.token}`;
      };
      const redirect_uri = encodeURIComponent(_url);// 需要回跳的链接

      return `https://middle-platform.blue-dot.cn/api/platform/wechat/auth/oauth?appid=${Config.appid}&redirect_url=${redirect_uri}&token=${Config.requestConfig.token}`;
    },
    jssdk: {
      url: '/api/wechat/jssdk',
      jsApiList: [
        'onMenuShareTimeline',
        'updateTimelineShareData',
        'onMenuShareAppMessage',
        'updateAppMessageShareData',
        'hideMenuItems',
      ],
    },
  },
  crypto: {
    iv: '',
    key: '',
  },
  cookie: {
    name: 'openid',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // new Date(Date.now() + 10000); 10s
  },
  monitor: {// 这些信息全部向后台要
    url: '/api/analysis/monitor',
    user_name: 'xxx',
  }
};

export default Config;
