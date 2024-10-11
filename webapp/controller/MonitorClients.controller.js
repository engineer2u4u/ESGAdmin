sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.MonitorClients", {

        onInit: function () {
            // Fetch organization data from Firebase and set it to the model
            var that = this;
            var db = firebase.firestore();
            db.collection("KOSH").doc("Organisation").get().then(function (doc) {
                var data = doc.data();
                const orgData = { results: data.Clients };
                const oModel = new JSONModel(orgData);
                that.getView().setModel(oModel, "orgData");
            });
            // Sheets
            var oData = {
                results: [
                    { sheetName: "Fuel", complianceType: "Environment", enabled: true },
                    { sheetName: "Bioenergy", complianceType: "Environment", enabled: true },
                    { sheetName: "Refrigerant and other", complianceType: "Environment", enabled: true },
                    { sheetName: "Elec heat cooling", complianceType: "Environment", enabled: true },
                    { sheetName: "Owned Vehicles", complianceType: "Environment", enabled: true },
                    { sheetName: "Materials", complianceType: "Environment", enabled: true },
                    { sheetName: "WTT- fuels", complianceType: "Environment", enabled: true },
                    { sheetName: "Waste Disposal", complianceType: "Environment", enabled: true },
                    { sheetName: "Flight", complianceType: "Environment", enabled: true },
                    { sheetName: "Accommodation", complianceType: "Environment", enabled: true },
                    { sheetName: "Business travel - land and sea", complianceType: "Environment", enabled: true },
                    { sheetName: "Freighting goods", complianceType: "Environment", enabled: true },
                    { sheetName: "Employees commuting", complianceType: "Environment", enabled: true },
                    { sheetName: "Food", complianceType: "Environment", enabled: true },
                    { sheetName: "Home Office", complianceType: "Environment", enabled: true },
                    { sheetName: "Water", complianceType: "Environment", enabled: true },
                    { sheetName: "Employment", complianceType: "Social", enabled: true },
                    { sheetName: "Leave", complianceType: "Social", enabled: true },
                    { sheetName: "Retention", complianceType: "Social", enabled: true },
                    { sheetName: "OH and S", complianceType: "Social", enabled: true },
                    { sheetName: "Training and Edu", complianceType: "Social", enabled: true },
                    { sheetName: "Child Labor", complianceType: "Social", enabled: true },
                    { sheetName: "Customer Privacy", complianceType: "Social", enabled: true },
                    { sheetName: "Mktg and Labelling", complianceType: "Social", enabled: true },
                    { sheetName: "CHS", complianceType: "Social", enabled: true },
                    { sheetName: "Social Benefits", complianceType: "Social", enabled: true },
                    { sheetName: "Entity", complianceType: "Governance", enabled: true },
                    { sheetName: "Eco. Performance", complianceType: "Governance", enabled: true },
                    { sheetName: "Market Presence", complianceType: "Governance", enabled: true }
                ]
            };
            var oModel = new JSONModel(oData);
            that.getView().setModel(oModel, "sheetData");
        },

        onSelectOrg: function () {
            var that = this;
            var id = this.byId("organizationSelect").getSelectedKey();
            const db = firebase.firestore(); // Initialize Firestore
            // Reference to the collection
            // Get all document IDs
            db.collection(id).doc("Master Data").collection("Reporting Cycle").get().then((snapshot) => {
                var results = [];
                snapshot.forEach((doc) => {
                    results.push({ id: doc.id });
                });
                const orgData = { results: results };
                const oModel = new JSONModel(orgData);
                that.getView().setModel(oModel, "cycleData");
            }).catch((error) => {
                console.error("Error getting document IDs: ", error);
            });
            // Get all branches
            db.collection(id).doc("Master Data").get().then((snapshot) => {
                var results = [];
                var data = snapshot.data().branches;
                data.forEach((branchValues) => {
                    results.push({ branch: branchValues.branch });
                });
                const branchData = { results: results };
                const oModel = new JSONModel(branchData);
                that.getView().setModel(oModel, "branchData");
            }).catch((error) => {
                console.error("Error getting branches: ", error);
            });

        },

        onSearch: function () {
            var that = this;
            var id = this.byId("organizationSelect").getSelectedKey();
            var cycle = this.byId("cycleSelect").getSelectedKey();
            var sheet = this.byId("sheetSelect").getSelectedKey();
            var branch = this.byId("branchSelect").getSelectedKey();
            const db = firebase.firestore(); // Initialize Firestore

            db.collection(id).doc("TransactionData").collection(cycle).doc(sheet).get()
                .then(function (doc) {
                    if (doc.exists) {
                        var oTable = that.byId("dynamicTable");

                        // Fetching data from Firestore document
                        var oData = doc.data()[branch].data;

                        // Clear all existing columns and rows from the table
                        oTable.removeAllItems();   // Removes all rows
                        oTable.removeAllColumns(); // Removes all columns

                        // Dynamically create columns based on the first row of data
                        var firstRow = oData[0]; // Get the first row to determine the field names
                        var aKeys = Object.keys(firstRow); // Get field names (keys)
                        aKeys = aKeys.filter(item => item !== "Amount");
                        aKeys.push("Amount");
                        aKeys = aKeys.filter(item => item !== "Factor");
                        aKeys.push("Factor");
                        // Create columns based on field names
                        aKeys.forEach(function (key) {
                            var oColumn = new sap.m.Column({
                                header: new sap.m.Text({ text: key.charAt(0).toUpperCase() + key.slice(1) })
                            });
                            oTable.addColumn(oColumn);
                        });

                        // Create a UI5 JSONModel with the data
                        var oModel = new sap.ui.model.json.JSONModel({ data: oData });

                        // Set the model on the table
                        oTable.setModel(oModel);

                        // Bind items to the table
                        var oTemplate = new sap.m.ColumnListItem({
                            cells: aKeys.map(function (key) {
                                if (key === "Amount" || key === "Factor" ) {
                                    // If the field is 'amount', create an Input
                                    return new sap.m.Input({
                                        value: "{" + key + "}",  // Binding the Input to the 'amount' field
                                        liveChange: function (oEvent) {
                                            // Handle value change if needed
                                        }
                                    });
                                } else {
                                    // For all other fields, create a Text control
                                    return new sap.m.Text({
                                        text: "{" + key + "}"  // Binding the Text to the respective field
                                    });
                                }
                            })
                        });

                        // Bind the items (rows) to the table, using the correct path to the data
                        oTable.bindItems({
                            path: "/data",   // Binding path to the 'data' array in the JSONModel
                            template: oTemplate
                        });

                    } else {
                        sap.m.MessageToast.show("No data found for the selected organization.");
                    }
                }).catch(function (error) {
                    sap.m.MessageToast.show("Error fetching data: " + error.message);
                });
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },
    });
});
