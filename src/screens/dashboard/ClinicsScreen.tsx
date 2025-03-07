import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { api } from '../../api/fetch';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedCard from '../../components/ThemedCard';
import DashboardHeader from '../../components/DashboardHeader';
import { useTheme } from '../../store/useTheme';

interface Clinic {
  id: string;
  name: string;
  location: string;
  weekday_hours: string;
  weekend_hours: string;
  contact: string;
  status: string;
  services?: Array<{
    id: string;
    name: string;
  }>;
}

const ClinicsScreen = () => {
  const theme = useTheme(state => state.theme);
  
  // API'den klinikleri çekme
  const { data: clinics, isLoading, error } = api.useQuery(
    'get',
    '/clinics/get-all-clinics'
  );

  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Klinikler yüklenirken bir hata oluştu.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <DashboardHeader title="Klinikler" />
      
      <FlatList
        data={clinics as Clinic[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ThemedCard variant="primary" style={{ margin: 10, padding: 15 }}>
            <ThemedText variant="header">{item.name}</ThemedText>
            <ThemedText variant="body">Konum: {item.location}</ThemedText>
            <ThemedText variant="body">Hafta içi: {item.weekday_hours}</ThemedText>
            <ThemedText variant="body">Hafta sonu: {item.weekend_hours}</ThemedText>
            <ThemedText variant="body">İletişim: {item.contact}</ThemedText>
            
            {item.services && item.services.length > 0 && (
              <>
                <ThemedText variant="subtitle" style={{ marginTop: 10, marginBottom: 5 }}>
                  Hizmetler:
                </ThemedText>
                {item.services.map((service) => (
                  <ThemedText key={service.id} variant="caption">
                    • {service.name}
                  </ThemedText>
                ))}
              </>
            )}
          </ThemedCard>
        )}
      />
    </ThemedView>
  );
};

export default ClinicsScreen; 