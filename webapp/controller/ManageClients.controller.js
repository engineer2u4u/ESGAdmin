sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.ManageClients", {

        onInit: function () {
            // Fetch organization data from Firebase and set it to the model
            var that = this;
            const db = firebase.firestore();
            db.collection("KOSH").doc("Organisation").get().then(function (doc) {
                var data = doc.data();
                const orgData = { results: data.Clients };
                const oModel = new JSONModel(orgData);
                that.getView().setModel(oModel, "orgData");
            });
        },

        onSearch: function () {
            var sOrganization = this.byId("organizationSelect").getSelectedKey();
            if (sOrganization) {
                // Fetch data from Firebase
                var db = firebase.firestore();
                var that = this;

                db.collection(sOrganization).doc("Master Data").get()
                    .then(function (doc) {
                        if (doc.exists) {
                            that.domain = doc.data().domain;
                            // Bind the fetched data to the form
                            var oModel = new JSONModel(doc.data());
                            that.getView().byId("detailsForm").setModel(oModel);
                            that.byId("detailsForm").getModel().refresh();
                            // Show the details box
                            that.byId("detailsBox").setVisible(true);
                        } else {
                            MessageToast.show("No data found for the selected organization.");
                        }
                    }).catch(function (error) {
                        MessageToast.show("Error fetching data: " + error.message);
                    });
            } else {
                MessageToast.show("Please select an organization.");
            }
        },

        onReset: function () {
            // Reset the form and hide the details box
            this.byId("detailsBox").setVisible(false);
            this.getView().setModel(null); // Clear the model
            this.byId("organizationSelect").setSelectedKey(null);
            this.byId("roleSelect").setSelectedKey(null);
        },

        onAddClient: function (){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("CreateCredentials",{currentNav: "ManageClients", domain: this.domain});
        },

        onClientBranches: function (){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("ClientBranches",{currentNav: "ManageClients", domain: this.domain});
        },

        onViewSheets: function (){
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("ReportingSheets",{currentNav: "ManageClients", domain: this.domain});
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onLogOut: function () {
            this.logOut();
        },

        onHomePress: function (oEvent) {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("Main");
        }
    });
});
