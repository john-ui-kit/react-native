/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconQuestion = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 64q190.016 4.992 316.512 131.488T960 512q-4.992 190.016-131.488 316.512T512 960q-190.016-4.992-316.512-131.488T64 512q4.992-190.016 131.488-316.512T512 64z m0 704q22.016-0.992 36.512-15.008t14.496-36-14.496-36.512T512 665.984t-36.512 14.496-14.496 36.512 14.496 36T512 768z m0-268.992q-16 0.992-27.008 11.488t-11.008 27.008 11.008 27.488T512 576q66.016-0.992 114.016-42.016t60-106.016q8.992-64.992-23.488-119.008T567.04 232.96q-63.008-20-120.992 3.488t-90.016 81.504l64.992 40.992q16.992-34.016 49.504-48.992t68.992-4.512 56 40.512 14.016 67.488-32.512 60.992-64.992 24.512z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconQuestion.defaultProps = {
  size: 18,
};

IconQuestion = React.memo ? React.memo(IconQuestion) : IconQuestion;

export default IconQuestion;
