import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyBEMKerKmjkX8FS8vyB1dpKxd7JiBO6aqg",
  authDomain: "godo-fd7dd.firebaseapp.com",
  databaseURL: "https://godo-fd7dd.firebaseio.com",
  projectId: "godo-fd7dd",
  storageBucket: "godo-fd7dd.appspot.com",
  messagingSenderId: "332752059834"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
