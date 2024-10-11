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
            this.loadData("./assets/model/branches/countries.json", "country");
            // Initialize empty models for states, districts, and blocks
            this.getView().setModel(new JSONModel([]), "states");
            this.getView().setModel(new JSONModel([]), "districts");
            this.getView().setModel(new JSONModel([]), "blocks");
        },

        _handleRouteMatched: function (oEvent) {
            var that = this;
            this.domain = oEvent.getParameter("arguments").domain;
            this.currentNav = oEvent.getParameter("arguments").currentNav;
            if (this.currentNav == "ManageClients") {
                that.getOwnerComponent().getModel("oAppConfig").setProperty("/Next", false);
            } else {
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
            this.loadData("./assets/model/branches/states_" + sCountryId + ".json", "states");

            // Clear districts and blocks
            this.getView().getModel("districts").setData([]);
            this.getView().getModel("blocks").setData([]);
        },

        onStateChange: function (oEvent) {
            this.sStateId = oEvent.getParameter("selectedItem").getKey();
            // Load the districts data based on the selected state
            this.loadData("./assets/model/branches/districts/districts_" + this.sStateId + ".json", "districts");

            // Clear blocks
            this.getView().getModel("blocks").setData([]);
        },

        onDistrictChange: function (oEvent) {
            var sDistrictId = oEvent.getParameter("selectedItem").getKey();
            // Load the blocks data based on the selected district
            this.loadData("./assets/model/branches/blocks/blocks_" + this.sStateId + ".json", "blocks", sDistrictId);
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
                var sBranch = '';
                var sCountry = oView.byId("idCountrySelect").getSelectedItem().getText();
                sBranch = sCountry;
                var sState = oView.byId("idState").getSelectedItem().getText();
                sBranch = sBranch + '-' + sState;
                var sDistrict = oView.byId("idDistrict").getSelectedItem();
                if (sDistrict) {
                    var sDistrict = oView.byId("idDistrict").getSelectedItem().getText();
                    sBranch = sBranch + '-' + sDistrict;
                }else{
                    sDistrict = '';
                }
                var sBLock = oView.byId("idBlock").getSelectedItem();
                if (sBLock) {
                    var sBLock = oView.byId("idBlock").getSelectedItem().getText();
                    sBranch = sBranch + '-' + sBLock;
                }else{
                    sBLock = '';
                }
                var sOfficeType = oView.byId("idOffice").getSelectedKey();
                var obj = {
                    country: sCountry,
                    state: sState,
                    district: sDistrict,
                    block: sBLock,
                    officeType: sOfficeType,
                    branch: sBranch
                };
                var oFModel = this.getView().getModel("fbModel").getData();
                var oFirestore = oFModel.oFirestore;
                var db = firebase.firestore();
                db.collection(sFullDomain).doc('Master Data').update({
                    // Handle form submission
                    branches: oFirestore.FieldValue.arrayUnion(obj)
                }).then(() => {
                    sap.m.MessageToast.show("Client Branch Added Successfully");
                    // Query the Employees collection for documents where 'role' is 'Admin'
                    db.collection(sFullDomain).doc('Master Data').collection("Employees")
                        .where("role", "==", "Admin")
                        .get()
                        .then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                // For each document, update the 'branches' field
                                db.collection(sFullDomain).doc('Master Data').collection("Employees").doc(doc.id).update({
                                    branches: oFirestore.FieldValue.arrayUnion(obj) // Add "New Branch" to the branches array
                                })
                                    .then(function () {
                                        console.log("Branches updated successfully for Admin with ID:", doc.id);
                                    })
                                    .catch(function (error) {
                                        console.error("Error updating branches: ", error);
                                    });
                            });
                        })
                        .catch(function (error) {
                            console.error("Error querying documents: ", error);
                        });

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
                oView.byId("idCountrySelect"),
                oView.byId("idState"),
                oView.byId("idOffice")
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
            oView.byId("idCountrySelect").setSelectedKey("");
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
