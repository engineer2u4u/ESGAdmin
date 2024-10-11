sap.ui.define([
    "sap/ui/model/json/JSONModel",
], function (JSONModel) {
    "use strict";
    return {
        // Firebase-config retrieved from the Firebase-console
        initializeFirebase: function () {
            // Replace with your config here
            const firebaseConfig = {
                apiKey: "AIzaSyDyKDAG4aFAWYXAF7yOBC2p2xEUERAYpOE",
                authDomain: "esgdashboard-2c535.firebaseapp.com",
                projectId: "esgdashboard-2c535",
                storageBucket: "esgdashboard-2c535.appspot.com",
                messagingSenderId: "585639322807",
                appId: "1:585639322807:web:9f7b670b47d828de58d932",
				measurementId: "G-KCBDC4L8PX",
				databaseURL: "https://esgdashboard-2c535-default-rtdb.asia-southeast1.firebasedatabase.app",
              };
            // Initialize Firebase with the Firebase-config
            firebase.initializeApp(firebaseConfig);
            // Initialize a secondary app instance for user creation
            const secondaryApp = firebase.initializeApp(firebaseConfig, "SecondaryApp");
			// Initialize Analytics and get a reference to the service
			// const analytics = firebase.analytics();
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
                oFirestore: oFirestore,
                secondaryApp: secondaryApp,
				// analytics: analytics
            };
            // Create a Firebase model out of the oFirebase service object which contains all required Firebase services
            var fbModel = new JSONModel(oFirebase);
            // Return the Firebase Model
            return fbModel;
        }
    };
});