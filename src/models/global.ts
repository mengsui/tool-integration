import { Effect, Reducer } from 'umi';

export interface GlobalModelState {
  name: string;
  wxConfig: boolean;
  userInfo: any;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    query: Effect;
    testAjax: Effect;
  };
  reducers: {
    save: Reducer<GlobalModelState>;
  };
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    name: '测试Model使用',
    userInfo: {}, // 用户授权信息。
    wxConfig: false, // 是否配置微信jssdk
  },

  effects: {
    *query(_, { put }) {
      yield put({
        type: 'save',
        payload: {
          name: '换一个名字',
        },
      });
    },
    *testAjax(_, { put }) {
      yield put({
        type: 'save',
        payload: {
          name: '换一个名字',
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default GlobalModel;
