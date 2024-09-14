sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.ClientBranches", {

        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getRouter().getRoute("ClientBranches").attachPatternMatched(this._handleRouteMatched, this);
            // Load initial country data
            this.loadData("./assets/model/countries.json", "country");
            // Initialize empty models for states, districts, and blocks
            this.getView().setModel(new JSONModel([]), "states");
            this.getView().setModel(new JSONModel([]), "districts");
            this.getView().setModel(new JSONModel([]), "blocks");
        },

        _handleRouteMatched: function (oEvent) {
            var that = this;
            this.domain = oEvent.getParameter("arguments").domain;
            this.currentNav = oEvent.getParameter("arguments").currentNav;
            if (this.currentNav == "ManageClients"){
            that.getOwnerComponent().getModel("oAppConfig").setProperty("/Next", false);
            }else{
            that.getOwnerComponent().getModel("oAppConfig").setProperty("/Next", true);
            }
            var db = firebase.firestore();
            db.collection(this.domain).doc("Master Data").onSnapshot(function (querySnapshot) {
                const orgData = { results: querySnapshot.data().branches };
                const oModel = new JSONModel(orgData);
                that.getView().setModel(oModel, "orgData");
            });
        },

        loadData: function (sPath, sModelName, sDistrictId) {
            var that = this;
            var oModel = new JSONModel();
            oModel.attachRequestCompleted(function () {
                if (oModel.getData()) {
                    console.log("Data loaded successfully from " + sPath);
                    var comboData = { results: oModel.getData() };
                    if (sDistrictId) {
                        var modelData = oModel.getData();
                        comboData = { results: modelData[sDistrictId] };
                    }
                    const oJSONModel = new JSONModel(comboData);
                    that.getView().setModel(oJSONModel, sModelName);
                } else {
                    console.error("Data is empty or invalid from " + sPath);
                }
            });

            oModel.attachRequestFailed(function () {
                console.error("Failed to load data from " + sPath);
                MessageToast.show("Failed to load data from " + sPath);
            });
            oModel.loadData(sPath, false);
        },

        onCountryChange: function (oEvent) {
            var sCountryId = oEvent.getParameter("selectedItem").getKey();
            // Load the states data based on the selected country
            this.loadData("./assets/model/states_" + sCountryId + ".json", "states");

            // Clear districts and blocks
            this.getView().getModel("districts").setData([]);
            this.getView().getModel("blocks").setData([]);
        },

        onStateChange: function (oEvent) {
            this.sStateId = oEvent.getParameter("selectedItem").getKey();
            // Load the districts data based on the selected state
            this.loadData("./assets/model/districts_" + this.sStateId + ".json", "districts");

            // Clear blocks
            this.getView().getModel("blocks").setData([]);
        },

        onDistrictChange: function (oEvent) {
            var sDistrictId = oEvent.getParameter("selectedItem").getKey();
            // Load the blocks data based on the selected district
            this.loadData("./assets/model/blocks_" + this.sStateId + ".json", "blocks", sDistrictId);
        },

        onNavBack: function () {
            // var currentNav = this.getOwnerComponent().getModel("oAppConfig").getProperty("/currentNav");
            if (this.currentNav == "ManageClients") {
                this.getOwnerComponent().getRouter().navTo("ManageClients");
            }
            else if (this.currentNav == "ReportingSheets") {
                this.getOwnerComponent().getRouter().navTo("ReportingSheets", { currentNav: "AddNewClient", domain: this.domain });
            }
        },

        onNext: function () {
            this.getOwnerComponent().getRouter().navTo("CreateCredentials", { currentNav: "AddNewClient", domain: this.domain });
        },

        onLogOut: function () {
            this.logOut();
        },

        onCreate: function () {
            var sFullDomain = this.domain;
            var isValid = this.onValidateInputs();
            if (isValid) {
                var oView = this.getView();
                var sCountry = oView.byId("idCountry").getSelectedItem().getText();
                var sState = oView.byId("idState").getSelectedItem().getText();
                var sDistrict = oView.byId("idDistrict").getSelectedItem().getText();
                var sBLock = oView.byId("idBlock").getSelectedItem().getText();
                var sOfficeType = oView.byId("idOffice").getSelectedKey();
                var obj = {
                    country: sCountry,
                    state: sState,
                    district: sDistrict,
                    block: sBLock,
                    officeType: sOfficeType,
                    branch: sCountry + '-' + sState + '-' + sDistrict + '-' + sBLock
                };
                var oFModel = this.getView().getModel("fbModel").getData();
                var oFirestore = oFModel.oFirestore;
                var db = firebase.firestore();
                db.collection(sFullDomain).doc('Master Data').update({
                    // Handle form submission
                    branches: oFirestore.FieldValue.arrayUnion(obj)
                }).then(() => {
                    sap.m.MessageToast.show("Client Branch Added Successfully");
                }).catch(error => {
                    sap.m.MessageToast.show("Error Creating Branch: " + error.message);
                });
            }
        },

        onValidateInputs: function () {
            var isValid = true;
            var oView = this.getView();
            // Get all input fields in the view
            var dropdown = [
                oView.byId("idState"),
                oView.byId("idDistrict"),
                oView.byId("idBlock"),
            ];
            // Iterate over all input fields
            dropdown.forEach(function (input) {
                if (!input.getSelectedKey()) {
                    // If input is empty, set ValueState to Error
                    input.setValueState("Error");
                    input.setValueStateText("This field is required");
                    isValid = false;
                } else {
                    // If input is not empty, reset ValueState to None
                    input.setValueState("None");
                }
            });

            return isValid; // Return whether all inputs are valid
        },

        onReset: function () {
            var that = this;
            var oView = this.getView();
            oView.byId("idCountry").setSelectedKey("");
            oView.byId("idState").setSelectedKey("");
            oView.byId("idDistrict").setSelectedKey("");
            oView.byId("idBlock").setSelectedKey("");
            this.getView().setModel(new JSONModel([]), "states");
            this.getView().setModel(new JSONModel([]), "districts");
            this.getView().setModel(new JSONModel([]), "blocks");
            oView.byId("idOffice").setSelectedKey("Corporate Office");
            // Get all input fields in the view
            var inputs = [
                oView.byId("idState"),
                oView.byId("idDistrict"),
                oView.byId("idBlock"),
            ];
            // Iterate over all input fields
            inputs.forEach(function (input) {
                // If input is not empty, reset ValueState to None
                input.setValueState("None");
                input.setValue("");
            });
        }
    });
});
