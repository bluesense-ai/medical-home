import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import moment from 'moment';
import { useTheme } from '../../store/useTheme';
import ThemedView from '../../components/ThemedView';
import DashboardHeader from '../../components/DashboardHeader';
import YearSection from '../../components/YearSection';
import { colors } from '../../theme/colors';

type YearlyCalendarScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const YearlyCalendarScreen: React.FC = () => {
  const theme = useTheme(state => state.theme);
  const navigation = useNavigation<YearlyCalendarScreenNavigationProp>();
  const currentYear = moment().year();

  const years = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  }, [currentYear]);

  const handleMonthSelect = (year: number, monthIndex: number) => {
    navigation.navigate('DashboardEventsScreen', {
      selectedDate: moment(`${year}-${monthIndex + 1}-01`).format('YYYY-MM-DD'),
    });
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: colors.main.primary }} useSafeArea>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={colors.main.primary} 
      />
      
      <View style={{ paddingBottom: 16 }}>
        <DashboardHeader
          title="Calendar"
          showBackButton
          onBackPress={() => navigation.goBack()}
          showSearch
          showAdd
          onSearchPress={() => {}}
          onAddPress={() => {}}
        />
      </View>
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {years.map(year => (
          <YearSection
            key={`year-${year}`}
            year={year}
            onMonthSelect={handleMonthSelect}
          />
        ))}
      </ScrollView>
    </ThemedView>
  );
};

export default YearlyCalendarScreen; 