import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDecO_uqefsQ6pgOT1_gZMY-4k_TdXkwwg",
  authDomain: "clothing-store-5feed.firebaseapp.com",
  databaseURL: "https://clothing-store-5feed.firebaseio.com",
  projectId: "clothing-store-5feed",
  storageBucket: "clothing-store-5feed.appspot.com",
  messagingSenderId: "1092105487150",
  appId: "1:1092105487150:web:5621256697ff1ee79a70bf",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;