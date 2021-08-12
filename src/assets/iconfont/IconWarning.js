/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconWarning = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 192q-26.016 0-43.008 19.008T453.984 320l23.008 256q2.016 14.016 11.488 22.496t23.488 8.512 23.488-8.512 11.488-22.496l23.008-256q2.016-26.016-15.008-44.992T511.936 256z m0 512q22.016-0.992 36.512-15.008t14.496-36-14.496-36.512T512 665.984t-36.512 14.496-14.496 36.512 14.496 36T512 768z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconWarning.defaultProps = {
  size: 18,
};

IconWarning = React.memo ? React.memo(IconWarning) : IconWarning;

export default IconWarning;
