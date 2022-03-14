Project is generated from built-in template using command

```sh
npx react-native init ReactNativeTS --template react-native-template-typescript
```

For simplicity I used Firebase Web SDK to access firestore and put credentials into `App.tsx`. In a real project better to extract credentials into a separate file and add it to `.gitignore`.

Original design had tooltips for each word but because task didn't mentioned how they should work I didn't add tooltips to UI.