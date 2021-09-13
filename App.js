import { blue } from 'color-name';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {NativeModules} from 'react-native';


const {BridgeApplicationModule} = NativeModules;

import * as ImagePicker from 'expo-image-picker'
import * as Sharing from 'expo-sharing'
import logo from './assets/logo.png'

export default function App() {

  
  const runNativeCode = () => {
      BridgeApplicationModule.runNativeCode("Hello from Native Code!")
  };

  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!')
      return;
    }
    let pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    console.log(pickerResult)
    setSelectedImage({ localUri: pickerResult.uri })
  }

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert("Sharing isn't  available")
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  }

  let cancelImageSharing = () => {
    setSelectedImage(null)
  }


  if (selectedImage !== null) {
    console.log('showing image', selectedImage.localUri)
    return (
        <View style={styles.container}>
          <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
          <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={cancelImageSharing} style={styles.button}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
  }

  function HomeScreen() {
    return (
      <View style={styles.container}>
        <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} />
        <Text style={styles.instructrions}>
          To share a photo from your phone press the button below
        </Text>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.buttonText}>Pick a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => runNativeCode()} style={styles.button}>
          <Text style={styles.buttonText}>Run native code</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructrions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10

  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  },
  thumbnail: {
    width: 300,
    height: 300,
  }
});
