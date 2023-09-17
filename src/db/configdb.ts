import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA9vBaSZpWEyn3f1RbM_x2JdbQvliA0O2Q',
  authDomain: 'e-tutor-8e3ab.firebaseapp.com',
  projectId: 'e-tutor-8e3ab',
  storageBucket: 'e-tutor-8e3ab.appspot.com',
  messagingSenderId: '795884970385',
  appId: '1:795884970385:web:a40ab25f01b4b754ccba30',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
