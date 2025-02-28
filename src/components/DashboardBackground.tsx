import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface DashboardBackgroundProps {
  style?: ViewStyle;
}

const DashboardBackground: React.FC<DashboardBackgroundProps> = ({ style }) => {
  return (
    <View style={[{ position: 'absolute', width: '100%', height: '100%' }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 390 844">
        <Path
          d="M390 0C390 0 390 300 390 300C390 300 350 500 250 600C150 700 0 750 0 750L0 0L390 0Z"
          fill="#247401"
        />
      </Svg>
    </View>
  );
};

export default DashboardBackground; 