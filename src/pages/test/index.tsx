import React from 'react';
import './index.less';

interface PropsType {

}

const TestPage: React.FC<PropsType> = (props) => {

  return (
    <div className="test_dom">
      测试文案
    </div>
  );
};

export default TestPage;
