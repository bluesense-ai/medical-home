import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { ViewStyle } from 'react-native';
import colors from '../theme/colors';



interface BackgroundShapeProps {
  style?: ViewStyle;
}

const BackgroundShape: React.FC<BackgroundShapeProps> = ({ style }) => {
  return (
    <Svg width="100%" height="1900"  style={[{ position: 'absolute' }, style]}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-70.7324 -77.7778C42.7676 -77.7778 288.768 -78.2778 322.268 -77.7778C395.809 3.92503 435.775 361.252 501.408 455.471C573.831 559.438 627.533 697.89 632.847 843.651C638.239 991.53 591.086 1134.81 530.584 1255.66C472.948 1370.78 357.268 1565.22 305.268 1614.22C200.768 1735.72 138.268 1796.22 24.7676 1780.72C-88.7324 1765.22 -20.891 1543.81 -95.7324 1451.22C-167.475 1362.47 -126.544 1402.46 -166.733 1280.22C-202.915 1170.17 -70.5289 964.99 -72.4271 843.651C-74.3336 721.775 -129.594 648.676 -94.6776 537.222C-55.2634 411.411 -138.709 236.67 -70.7324 138.222C-91.2324 18.7222 -143.732 52.7222 -70.7324 -77.7778Z"
        fill={colors.main.primary}
        scaleX={1}
      />
    </Svg>
  );
};

export default BackgroundShape; 