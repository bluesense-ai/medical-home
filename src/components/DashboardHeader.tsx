import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../store/useTheme';

export type DashboardHeaderProps = {
  title: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  showAdd?: boolean;
  showGrid?: boolean;
  onSearchPress?: () => void;
  onAddPress?: () => void;
  onGridPress?: () => void;
  rightComponent?: React.ReactNode;
  onBackPress?: () => void;
  rightIcons?: Array<{
    icon: string;
    iconFamily: string;
    onPress: () => void;
  }>;
};

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  showBackButton = true,
  showSearch = true,
  showAdd = true,
  showGrid = false,
  onSearchPress,
  onAddPress,
  onGridPress,
  rightComponent,
  onBackPress,
  rightIcons
}) => {
  const navigation = useNavigation();
  const theme = useTheme(state => state.theme);
  const styles = theme === 'dark' ? stylesDark : stylesLight;
  const iconColor = colors.base.white ;

  const renderIcon = (iconName: string, iconFamily: string, onPress: () => void) => {
    if (iconFamily === 'Ionicons') {
      return (
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onPress}
        >
          <Ionicons name={iconName as any} size={24} color={iconColor} />
        </TouchableOpacity>
      );
    } else if (iconFamily === 'MaterialCommunityIcons') {
      return (
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={onPress}
        >
          <MaterialCommunityIcons name={iconName as any} size={24} color={iconColor} />
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onBackPress || (() => navigation.goBack())}
          >
            <Ionicons name="chevron-back" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      <View style={styles.rightSection}>
        {rightComponent}
        
        {rightIcons && rightIcons.map((icon, index) => (
          <React.Fragment key={`custom-icon-${index}`}>
            {renderIcon(icon.icon, icon.iconFamily, icon.onPress)}
          </React.Fragment>
        ))}
        
        {showGrid && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onGridPress}
          >
            <Ionicons name="grid-outline" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
        {showSearch && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onSearchPress}
          >
            <Ionicons name="search" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
        {showAdd && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onAddPress}
          >
            <Ionicons name="add" size={24} color={iconColor} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const stylesDark = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.base.white,
  },
  iconButton: {
    padding: 8,
  },
});

const stylesLight = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "transparent",
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.base.white  ,
  },
  iconButton: {
    padding: 8,
  },
});

export default DashboardHeader; 