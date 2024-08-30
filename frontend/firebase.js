import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyBNc0NoErbLQae_9P6BQ6zqb4dsyvlBN7Y",
    authDomain: "job-seeker-2aed3.firebaseapp.com",
    projectId: "job-seeker-2aed3",
    storageBucket: "job-seeker-2aed3.appspot.com",
    messagingSenderId: "103863384571",
    appId: "1:103863384571:web:0875abef097f3a9fe5f35e",
    measurementId: "G-QFQNJSLDS9"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig)