sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function (JSONModel) {
    "use strict";
    return {
        // Firebase-config retrieved from the Firebase-console
        initializeFirebase: function () {
            // Replace with your config here
            const firebaseConfig = {
                apiKey: "AIzaSyDXE8DIGrL4rwyfRFHNLBIuKB9h_o6oGvI",
                authDomain: "admin-731aa.firebaseapp.com",
                projectId: "admin-731aa",
                storageBucket: "admin-731aa.appspot.com",
                messagingSenderId: "685845863429",
                appId: "1:685845863429:web:d69811b8a0848e8223506c"
            };
            // Initialize Firebase with the Firebase-config
            firebase.initializeApp(firebaseConfig);
            // Create a Fir estore reference
            const firestore = firebase.firestore();
            // Create a Authentication reference
            const fireAuth = firebase.auth();
            // Get Firebase Instance
            const oFirestore = firebase.firestore;
            // Firebase services object
            const oFirebase = {
                firestore: firestore,
                fireAuth: fireAuth,
                oFirestore: oFirestore
            };
            // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
            var fbModel = new JSONModel(oFirebase);
            // Return the Firebase Model
            return fbModel;
        }
    };
});