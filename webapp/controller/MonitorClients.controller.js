sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.MonitorClients", {

        onInit: function () {
            // Fetch organization data from Firebase and set it to the model
            const that = this;
            const db = firebase.firestore();
            db.collection("Organisation").get().then((querySnapshot) => {
                const orgData = {results: querySnapshot.docs.map(doc => doc.data())};
                const oModel = new JSONModel(orgData);
                that.getView().setModel(oModel, "orgData");
            });
        },

        onGenerateRandomPassword: function () {
            const randomPassword = Math.random().toString(36).slice(-8);
            this.byId("passwordInput").setValue(randomPassword);
        },

        onCreate: function () {
            const organization = this.byId("organizationSelect").getSelectedKey();
            const username = this.byId("usernameInput").getValue();
            const password = this.byId("passwordInput").getValue();

            // Handle the creation logic, such as saving the credentials to Firebase
            // Example: Saving to Firebase (Assuming a 'ClientCredentials' collection exists)
            const db = firebase.firestore();
            db.collection("ClientCredentials").add({
                organizationId: organization,
                username: username,
                password: password
            }).then(() => {
                sap.m.MessageToast.show("Client Credentials Created Successfully");
            }).catch(error => {
                sap.m.MessageToast.show("Error Creating Credentials: " + error.message);
            });
        },

        onReset: function () {
            this.byId("organizationSelect").setSelectedKey(null);
            this.byId("usernameInput").setValue("");
            this.byId("passwordInput").setValue("Welcome@123");
        },

        onRowPress: function (oEvent) {
            const selectedOrg = oEvent.getSource().getBindingContext().getObject();
            // Handle row press, perhaps navigate to another view or show more details
            sap.m.MessageToast.show("Selected Organization: " + selectedOrg.companyName);
        }
    });
});
