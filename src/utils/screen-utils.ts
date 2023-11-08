import { Platform, StatusBar, Dimensions, PixelRatio, NativeScrollEvent } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getRemoteConfig } from 'firebase/remote-config';

// Initialize Firebase (you should replace this config with your own Firebase project config)
const firebaseConfig = {
  apiKey: 'AIzaSyAqKID7sjCKfckEDiGOLPEp5b2i0N7wv_o',
  authDomain: 'digibank-f63d0.firebaseapp.com',
  projectId: 'digibank-f63d0',
  storageBucket: 'digibank-f63d0.appspot.com',
  messagingSenderId: '415340726884',
  appId: '1:415340726884:web:f5dad6c46be19e033d2d71',
  measurementId: 'G-KWYW33RP5P',
};

initializeApp(firebaseConfig);


// export const getRemoteConfig = () => {
  // return remoteConfig()
  //   .fetchAndActivate()
  //   .then(() => {
  //     const metadata = remoteConfig().getValue('LogoutTimeForInactivity');
  //     if (metadata && metadata._value) {
  //       return Number(metadata._value);
  //     }
  //     return 0;
  //   })
  //   .catch(() => {
  //     return 0;
  //   });
// };

export const getEnterpriseData = async (keys: string[]) => {
  try {
    await getRemoteConfig().fetchAndActivate();
    const data: any[] | PromiseLike<any[]> = [];
    keys.forEach((s) => {
      const values = remoteConfig().getValue(s);
      if (values && values.asString().length > 0) {
        data.push(JSON.parse(values.asString()));
      }
    });
    return data;
  } catch (error) {
    console.log('error ssss ',error);
  }

};
