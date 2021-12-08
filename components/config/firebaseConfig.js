import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBhIjh3lCbFvcNehwW2N8sOEdBLAGTZGAI',
  authDomain: 'tokoonlinesederhana-a6937.firebaseapp.com',
  projectId: 'tokoonlinesederhana-a6937',
  storageBucket: 'tokoonlinesederhana-a6937.appspot.com',
  messagingSenderId: '197497398975',
  appId: '1:197497398975:web:be18e7ce97552b9da3080a',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export const database = firebase.database();

export default firebase;
