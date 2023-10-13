// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { collection, getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyBdnmCyQu2u34WRqQwJMYmchCIjcM3ygAk",
//     authDomain: "project-mgt-7d637.firebaseapp.com",
//     projectId: "project-mgt-7d637",
//     storageBucket: "project-mgt-7d637.appspot.com",
//     messagingSenderId: "1066394143188",
//     appId: "1:1066394143188:web:70f410c38addf62a2d6e41"
//   };


// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app); 

// export { auth, db };

// export { app, getFirestore };
// const firebaseApp = initializeApp(firebaseConfig);
// export default firebaseApp;

// const db = getFirestore(firebaseApp); 

// const tasksCollection = collection(db, 'tasks'); 




import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdnmCyQu2u34WRqQwJMYmchCIjcM3ygAk",
  authDomain: "project-mgt-7d637.firebaseapp.com",
  projectId: "project-mgt-7d637",
  storageBucket: "project-mgt-7d637.appspot.com",
  messagingSenderId: "1066394143188",
  appId: "1:1066394143188:web:70f410c38addf62a2d6e41",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
