sap.ui.define(
    ["../controller/BaseController", "sap/m/MessageStrip", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/m/Token",],
    function (Controller, MessageStrip, JSONModel, MessageToast, Token) {
        "use strict";

        return Controller.extend("ESGAdmin.ESGAdmin.controller.ReportingSheets", {

            onInit: function () {
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // Initialize the state dropdown with default country (India) states
                this.getRouter().getRoute("ReportingSheets").attachPatternMatched(this._handleRouteMatched, this);
                // Define the initial data for the table

            },

            _handleRouteMatched: function (oEvent) {
                var that = this;
                this.domain = oEvent.getParameter("arguments").domain;
                this.currentNav = oEvent.getParameter("arguments").currentNav;
                this.onReset();
            },

            onNavBack: function () {
                // var currentNav = this.getOwnerComponent().getModel("oAppConfig").getProperty("/currentNav");
                if (this.currentNav == "ManageClients") {
                    this.getOwnerComponent().getRouter().navTo("ManageClients");
                }
                else if (this.currentNav == "AddNewClient") {
                    this.getOwnerComponent().getRouter().navTo("AddNewClient");
                }
            },

            onLogOut: function () {
                this.logOut();
            },

            onReset: function () {
                var that = this;
                var oData = {
                    complianceData: [
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
                if (this.currentNav == "AddNewClient") {
                    // Create and set the JSON model to the view
                    var oModel = new JSONModel(oData);
                    that.getView().setModel(oModel);
                } else {
                    var db = firebase.firestore();
                    db.collection(this.domain).doc('Master Data').collection("Reporting Master Data").doc("ReportingSheets").get().then(function (doc) {
                        var aData = doc.data();
                        var oFirebaseMap = {};
                        aData.complianceData.forEach(function (item) {
                            oFirebaseMap[item.sheetName] = true;
                        });
                        // Update the default model based on the data fetched from Firebase
                        oData.complianceData.forEach(function (item) {
                            item.enabled = !!oFirebaseMap[item.sheetName];
                        });
                        // Create and set the JSON model to the view
                        var oModel = new JSONModel(oData);
                        that.getView().setModel(oModel);
                    });
                }
            },

            onSelectAll: function () {
                var oModel = this.getView().getModel();
                var aData = oModel.getProperty("/complianceData");

                aData.forEach(function (item) {
                    item.enabled = true;
                });

                oModel.setProperty("/complianceData", aData);
            },

            onDeselectAll: function () {
                var oModel = this.getView().getModel();
                var aData = oModel.getProperty("/complianceData");

                aData.forEach(function (item) {
                    item.enabled = false;
                });

                oModel.setProperty("/complianceData", aData);
            },

            onSave: function () {
                var that = this;
                var oModel = this.getView().getModel();
                var oRouter = this.getOwnerComponent().getRouter();
                var oData = oModel.getData().complianceData;
                var db = firebase.firestore();
                var sFullDomain = this.domain;
                // Filter out items where enabled is false
                var filteredData = oData.filter(function (item) {
                    return item.enabled === true;
                });
                // Save the data to Firebase
                db.collection(sFullDomain).doc('Master Data').collection("Reporting Master Data").doc("ReportingSheets").set({ complianceData: filteredData })
                    .then(function () {
                        MessageToast.show("Data saved successfully!");
                        // var currentNav = that.getOwnerComponent().getModel("oAppConfig").getProperty("/currentNav");
                        if (that.currentNav == "AddNewClient") {
                            // that.getOwnerComponent().getModel("oAppConfig").setProperty("/currentNav", "ReportingSheets");
                            oRouter.navTo("ClientBranches", { currentNav: "ReportingSheets", domain: sFullDomain });
                        }
                    })
                    .catch(function (error) {
                        MessageToast.show("Error saving data: " + error.message);
                    });
            }


        });
    }
);
