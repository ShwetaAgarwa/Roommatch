// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Import Auth

// 🔹 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCams-oGPKTKh4R0SAx_kKx_1qrKARVLX4",
  authDomain: "roommatechat-d478a.firebaseapp.com",
  projectId: "roommatechat-d478a",
  storageBucket: "roommatechat-d478a.appspot.com",
  messagingSenderId: "683834446074",
  appId: "1:683834446074:web:e2ecdebb75bc95bab4b943",
};

// 🔥 Initialize Firebase App
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore Database
const db = getFirestore(app);

// ✅ Initialize Firebase Auth
const auth = getAuth(app);

// 🔹 Function to Fetch All Roommates
export const fetchAllRoommates = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "roommates"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching roommates:", error);
    return [];
  }
};

// 🔹 Function to Fetch a Single Roommate by ID
export const fetchRoommateById = async (roommateId) => {
  try {
    const docRef = doc(db, "roommates", roommateId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.error("Roommate not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching roommate profile:", error);
    return null;
  }
};

export { db, auth }; // ✅ Export auth too
