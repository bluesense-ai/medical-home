import React from 'react';
import { View, ViewStyle } from 'react-native';
import Svg, { Path, Defs, Filter, FeFlood, FeColorMatrix, FeOffset, FeGaussianBlur, FeComposite, FeBlend } from 'react-native-svg';

interface DashboardBackgroundProps {
  style?: ViewStyle;
  fill: string;
}

const DashboardBackground: React.FC<DashboardBackgroundProps> = ({ style, fill }) => {
  return (
    <View style={[{ position: 'absolute', width: '100%', height: '100%' }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 368 702">
        <Defs>
          <Filter id="filter0_d_593_7266" x="-269.484" y="0.810547" width="637.293" height="700.279" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <FeFlood floodOpacity="0" result="BackgroundImageFix"/>
            <FeColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <FeOffset dy="4"/>
            <FeGaussianBlur stdDeviation="2"/>
            <FeComposite in2="hardAlpha" operator="out"/>
            <FeColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <FeBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_593_7266"/>
            <FeBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_593_7266" result="shape"/>
          </Filter>
        </Defs>
        <Path
          d="M21.0164 203.271C-65.5881 265.46 -163.145 257.074 -217.745 312.246C-272.636 366.615 -284.314 483.993 -231.003 572.442C-177.982 660.086 -59.9718 718.799 12.1185 681.85C83.4048 645.191 108.772 512.868 172.726 420.687C236.68 328.506 338.417 276.757 359.591 193.213C380.474 108.865 320.537 -6.72911 252.05 1.19668C184.111 9.37925 108.168 141.339 21.0164 203.271Z"
          fill={fill}
        />
      </Svg>
    </View>
  );
};

export default DashboardBackground; 