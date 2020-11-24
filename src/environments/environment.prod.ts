import { firebaseConfig } from './firebase';
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: '${process.env.FIREBASE_API_KEY}' || firebaseConfig.apiKey,
    authDomain: 'olivier-levy.firebaseapp.com',
    databaseURL: 'https://olivier-levy.firebaseio.com',
    projectId: 'olivier-levy',
    storageBucket: 'olivier-levy.appspot.com',
    messagingSenderId:
      '${process.env.FIREBASE_MESSAGING_SENDER_ID}' ||
      firebaseConfig.messagingSenderId,
    appId: '${process.env.FIREBASE_APP_ID}' || firebaseConfig.appId,
    measurementId:
      '${process.env.FIREBASE_MEASUREMENT_ID}' || firebaseConfig.measurementId,
  },
};
