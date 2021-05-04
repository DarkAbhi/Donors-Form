import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
    
});
firebase.analytics();

const db = firebase.firestore()

export { db }