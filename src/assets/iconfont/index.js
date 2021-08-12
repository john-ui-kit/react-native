/* eslint-disable */

import React from 'react';

import IconError from './IconError';
import IconInfo from './IconInfo';
import IconSuccess from './IconSuccess';
import IconWarning from './IconWarning';
import IconQuestion from './IconQuestion';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'error':
      return <IconError key="1" {...rest} />;
    case 'info':
      return <IconInfo key="2" {...rest} />;
    case 'success':
      return <IconSuccess key="3" {...rest} />;
    case 'warning':
      return <IconWarning key="4" {...rest} />;
    case 'question':
      return <IconQuestion key="5" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
