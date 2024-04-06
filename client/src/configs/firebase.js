    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";
    import { getStorage } from "firebase/storage";

    const firebaseConfig = {
 

      apiKey: "AIzaSyChy1ErmpgpMQMZCqZcpfdUQiuiTQEY8oA",
      authDomain: "zaloclone-a18d3.firebaseapp.com",
      projectId: "zaloclone-a18d3",
      storageBucket: "zaloclone-a18d3.appspot.com",
      messagingSenderId: "118690113668",
      appId: "1:118690113668:web:8d50290a37b346e5457ad1",
      measurementId: "G-6GD126G70S"

      // apiKey: "AIzaSyBgOnOkCSDPm5yQwF3iIiE9cPrYWgDPHZU",
      // authDomain: "zaloclonev2.firebaseapp.com",
      // projectId: "zaloclonev2",
      // storageBucket: "zaloclonev2.appspot.com",
      // messagingSenderId: "234676820915",
      // appId: "1:234676820915:web:71781079c8b9e25de809c6",
      // measurementId: "G-TZNDTCR1PK"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    auth.useDeviceLanguage();
    const db = getFirestore(app);
    const storage = getStorage(app);


      
      // Assign appVerifier to window for global access
     
    const firebase = {
    app,
    auth,
    db,
    storage,
    };

    export default firebase;