# react-native-demo

### Main branch
This is an Expo project, to run execute `expo run:android` which will run directly on device via Expo Go

In order to build and run custom native code one needs to execute `expo eject` - this will create iOS and Android folders
Do not forget to set sdk.dir in ./android/local.properties

Building and running Andoroid app - [https://docs.expo.dev/workflow/customizing/]( https://docs.expo.dev/workflow/customizing/)

### Experiment branch 
This branch contains native Android code
To build and run an Android app execute `yarn android`

**Note**
In case of 'No common URI schemes could be found for the native iOS and Android projects' issue execute following commands 
`npm install uri-scheme` 
`expo eject`
`yarn android`