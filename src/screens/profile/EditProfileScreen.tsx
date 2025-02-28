import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/Router';
import * as ImagePicker from 'expo-image-picker';

interface EditProfileScreenProps {
  navigation: StackNavigationProp<RootStackParamList>;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [image, setImage] = React.useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Permission required to access photos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.base.black} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Personal Information</Text>

        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imageWrapper}>
            <Image 
              source={image ? { uri: image } : require('../../../assets/images/profile-placeholder.png')} 
              style={styles.profileImage}
            />
            <View style={styles.editImageButton}>
              <Ionicons name="camera" size={20} color={colors.base.white} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          <InputField label="First name" />
          <InputField label="Middle name (Optional)" />
          <InputField label="Last name" />
          <InputField label="Sex" />
          <InputField label="Pronouns" />
          <InputField label="Date of birth" />
          <InputField label="Health card number" />
          <Text style={styles.sectionTitle}>Contact information</Text>
          <InputField label="Email" />
          <InputField label="Phone" />
        </View>

        {/* Done Button */}
        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

interface InputFieldProps {
  label: string;
  value?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, value }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      value={value}
      placeholder=""
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.base.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: colors.base.lightGray,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 61,
    color: colors.base.black,
    marginBottom: 28,
    textAlign: "center",
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary.green,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.base.black,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.base.black,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: colors.base.lightGray,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  doneButton: {
    backgroundColor: colors.primary.green,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderRadius: 12,
    width: 114,
    alignItems: 'center',
    marginBottom: 45,
    marginTop: 45,
    alignSelf: 'center',
  },
  doneButtonText: {
    color: colors.base.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen; 