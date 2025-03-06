import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';


const CARD_WIDTH = 212; // 24px padding on each side
const CARD_HEIGHT = 290;

interface DoctorCardProps {
  name: string;
  title: string;
  imageUrl: string;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ name, title, imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
    backgroundColor: "rgba(1, 79, 115, 0.9)",
    overflow: 'hidden',
    marginBottom: 16,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 230,
    resizeMode: 'cover',
  },
  infoContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.alternativeDark.primary, // darkBlue with opacity
  },
  name: {
    fontSize: 18,
    fontWeight: 'medium',
    color: colors.base.white,
    marginBottom: 4,
  },
  title: {
    fontSize: 9,
    fontWeight: 'medium',
    color: colors.base.white,
    opacity: 0.8,
  },
});

export default DoctorCard; 