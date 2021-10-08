import React from 'react';
// import './index.less';

const CurrencyIndex: React.FC = props => {
  return (
    <div>
      <h1 className="title">layouts使用</h1>
      {props.children}
    </div>
  );
};

export default CurrencyIndex;
