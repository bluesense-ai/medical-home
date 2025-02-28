import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

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

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={colors.base.white} />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      <View style={styles.rightSection}>
        {rightComponent}
        {showGrid && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onGridPress}
          >
            <Ionicons name="grid-outline" size={24} color={colors.base.white} />
          </TouchableOpacity>
        )}
        {showSearch && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onSearchPress}
          >
            <Ionicons name="search" size={24} color={colors.base.white} />
          </TouchableOpacity>
        )}
        {showAdd && (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onAddPress}
          >
            <Ionicons name="add" size={24} color={colors.base.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.base.darkGray,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.base.white,
  },
  iconButton: {
    padding: 8,
  },
});

export default DashboardHeader; 