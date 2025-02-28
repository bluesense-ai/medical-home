import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions, ImageBackground, SafeAreaView } from 'react-native';

const { height, width } = Dimensions.get('window');

const Login = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.imageContainer}>
                {/* Content goes here */}
            </View>
            {/* Card at the bottom of the screen */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Log In</Text>
                <Text style={styles.creditSubTitle}>Enter your username</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Username"
                    placeholderTextColor="black"
                />
                <Pressable style={styles.submitButton} onPress={() => navigation.navigate('LoginVerification')}>
                    <Text style={styles.submitButtonText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#242222',
    },
    imageContainer: {
        flex: 1,
        alignSelf: 'center',
        width: width * 0.90,
        marginTop: 150,
        borderRadius: 15,
        overflow: 'hidden',
        opacity: 0.6,
        backgroundColor: 'white',
    },
    card: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: height * 0.40,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
        paddingBottom: 15,
    },
    creditSubTitle: {
        fontSize: 18,
        textAlign: 'center',
        paddingBottom: 45,
    },
    input: {
        alignContent: 'center',
        width: '90%',
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
    submitButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#32CD32',
        justifyContent: 'center',
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 35,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Login;
