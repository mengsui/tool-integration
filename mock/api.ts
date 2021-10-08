export default {
  // 支持值为 Object 和 Array
  'get /api/users': (req: Request, res: any) => {
    setTimeout(() => {
      res.send({ status: 'ok', data: 'mock1111', success: true });
    }, 1500);
  },
  // GET 可忽略
  '/api/users/1': { id: 1 },
  // 支持自定义函数，API 参考 express@4
  'POST /api/mock1': (req: Request, res: any) => {
    setTimeout(() => {
      res.send({ status: 'ok', data: 'mock1111', success: true });
    }, 300);
  },
  'POST /api/mock2': (req: Request, res: any) => {
    setTimeout(() => {
      res.send({ status: 'ok', data: 'mock2222', success: true });
    }, 300);
  },
  'POST /api/mock3': (req: Request, res: any) => {
    setTimeout(() => {
      res.send({ status: 'ok', data: 'mock333', success: true });
    }, 300);
  },
};
