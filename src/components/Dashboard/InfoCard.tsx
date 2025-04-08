import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface InfoCardProps {
  title: string;
  content: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content }) => {
  return (
    <View 
      style={[
        styles.infoCard, 
        { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
      ]}
    >
      <Text style={styles.sectionTitle}>
        {title}
      </Text>
      <Text style={styles.noteText}>
        {content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
    color: colors.base.white,
  },
  noteText: {
    fontSize: 12,
    lineHeight: 24,
    color: colors.base.white,
  },
});

export default InfoCard; 