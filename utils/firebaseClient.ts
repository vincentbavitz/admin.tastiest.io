import firebaseClient from 'firebase/app';
import 'firebase/auth';

const CLIENT_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FNEXT_PUBLIC_IREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);

  if (typeof window !== 'undefined') {
    firebaseClient
      .auth()
      .setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL);

    (window as any).firebase = firebaseClient;
  }
}

export { firebaseClient };
