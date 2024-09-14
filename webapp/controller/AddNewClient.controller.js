sap.ui.define(
    ["../controller/BaseController", "sap/m/MessageStrip", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/m/Token",],
    function (Controller, MessageStrip, JSONModel, MessageToast, Token) {
        "use strict";

        return Controller.extend("ESGAdmin.ESGAdmin.controller.AddNewClient", {

            onInit: function () {
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var currentDate = new Date();
                var oModel = new JSONModel({
                    countries: [
                        { key: "India", text: "India" },
                        { key: "USA", text: "USA" },
                        { key: "UAE", text: "UAE" }
                    ]
                });
                this.getView().setModel(oModel, "locationModel");

                // Initialize the state dropdown with default country (India) states
                this.getRouter()
                    .getRoute("Main")
                    .attachPatternMatched(this._handleRouteMatched, this);
            },

            _handleRouteMatched: function (oEvent) {
                var that = this;
                this.checkgetUserLog().then(user => {
                    that.getView().byId("user").setText("Welcome, " + user.email);
                });
            },

            onNavBack: function () {
                this.getOwnerComponent().getRouter().navTo("Main");
            },

            onHomePress: function (oEvent) {
                this.oRouter.navTo("Main");
            },

            onLogOut: function () {
                this.logOut();
            },

            onReset: function () {
                var that = this;
                var oView = this.getView();
                oView.byId("idCountry").setSelectedKey("India");
                oView.byId("idReportingType").setSelectedKey("Both");
                // Get all input fields in the view
                var inputs = [
                    oView.byId("idOrgName"),
                    oView.byId("idAdmin"),
                    oView.byId("idAdminEmail"),
                    oView.byId("idAdminPhone"),
                    oView.byId("domainInput"),
                    oView.byId("idNumEmployees"),
                ];
                // Iterate over all input fields
                inputs.forEach(function(input) {
                        // If input is not empty, reset ValueState to None
                        input.setValueState("None");
                        input.setValue("");
                });
            },

            onSubmit: function () {
                var that = this;
                var oRouter = this.getOwnerComponent().getRouter();
                var isValid = this.onValidateInputs();
                var oView = this.getView();
                var sOrgName = oView.byId("idOrgName").getValue();
                var sAdmin = oView.byId("idAdmin").getValue();
                var sAdminEmail = oView.byId("idAdminEmail").getValue();
                var iAdminPhone = oView.byId("idAdminPhone").getValue();
                var sCountry = oView.byId("idCountry").getSelectedKey();
                var oInput = this.byId("domainInput");
                var sDomain = oInput.getValue();

                if (sDomain) {
                    var sFullDomain = sDomain + ".esgkosh";
                }
                var sNumEmployees = oView.byId("idNumEmployees").getValue();
                var sRenewableEnergy = oView.byId("idRenewableEnergy").getSelectedKey();
                var sReportingType = oView.byId("idReportingType").getSelectedKey();
                // Perform form validation
                if (!isValid) {
                    return;
                }

                // Handle form submission
                var oData = {
                    organisationName: sOrgName,
                    admin: sAdmin,
                    adminEmail: sAdminEmail,
                    adminPhone: iAdminPhone,
                    country: sCountry,
                    numEmployees: sNumEmployees,
                    renewableEnergy: sRenewableEnergy,
                    status: 'Active',
                    domain: sFullDomain,
                };
                var oFModel = this.getView().getModel("fbModel").getData();
                var oFirestore = oFModel.oFirestore;
                var db = firebase.firestore();
                db.collection(sFullDomain).doc('Master Data').set(oData)
                    .then(() => {
                        // For now, just display the data
                        MessageToast.show("Form submitted successfully!");
                        // Convert to lowercase
                        var sName = sAdmin.toLowerCase();
                        // Remove special characters except spaces
                        sName = sName.replace(/[^a-zA-Z0-9 ]/g, "");
                        // Replace spaces between names with a period
                        sName = sName.trim().replace(/\s+/g, ".");
                        var username = sName + '@' + sFullDomain;
                        var password = '123456';
                        // Create user credentials in Firebase Authentication
                        var secondaryApp = oFModel.secondaryApp;
                        secondaryApp.auth().createUserWithEmailAndPassword(username, password)
                            .then((userCredential) => {
                             //   User successfully created
                                secondaryApp.auth().signOut();
                                const user = userCredential.user;
                                var db = firebase.firestore();
                                db.collection(sFullDomain).doc('Master Data').collection("Employees").doc(user.uid).set({
                                    domain: sFullDomain,
                                    username: username,
                                    userId: user.uid,
                                    name: sAdmin,
                                    role: 'Admin',
                                    email: sAdminEmail,
                                    phone: iAdminPhone,
                                    country: sCountry,
                                    state: 'All',
                                    district: 'All',
                                    block: 'All',
                                    officeType: 'All'
                                }).then(() => {
                                    sap.m.MessageToast.show("Client Credentials Created Successfully");
                                }).catch(error => {
                                    sap.m.MessageToast.show("Error Creating Credentials: " + error.message);
                                });
                                var obj = {
                                    orgID: sFullDomain,
                                    orgName: sOrgName,
                                };
                                db.collection("KOSH").doc('Organisation').update({
                                    Clients: oFirestore.FieldValue.arrayUnion(obj)
                                }).then(() => {
                                    sap.m.MessageToast.show("Client Credentials Created Successfully");
                                }).catch(error => {
                                    sap.m.MessageToast.show("Error Creating Credentials: " + error.message);
                                });
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                sap.m.MessageToast.show("Error Creating User: " + errorMessage);
                            });
                        oView.getModel("oAppConfig").setProperty("/username", username);
                        oView.getModel("oAppConfig").setProperty("/password", password);

                        // Send Email and show message
                        // that.getOwnerComponent().getModel("oAppConfig").setProperty("/currentNav", "AddNewClient");
                        sap.m.MessageToast.show("Email with credentials of the user: " + username + " sent to the email ID: " + sAdminEmail);
                        oRouter.navTo("ReportingSheets",{currentNav: "AddNewClient", domain: sFullDomain});
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            },

            onDomainChange: function (oEvent) {
                var oInput = oEvent.getSource();
                var sValue = oInput.getValue();

                // Remove spaces and special characters
                var sCleanValue = sValue.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();;

                // Update the input with the cleaned value
                oInput.setValue(sCleanValue);
            },

            onValidateInputs: function() {
                var isValid = true;
                var oView = this.getView();
                // Get all input fields in the view
                var inputs = [
                    oView.byId("idOrgName"),
                    oView.byId("idAdmin"),
                    oView.byId("idAdminEmail"),
                    oView.byId("idAdminPhone"),
                    oView.byId("domainInput"),
                    oView.byId("idNumEmployees"),
                ];
            
                // Iterate over all input fields
                inputs.forEach(function(input) {
                    if (!input.getValue()) {
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
            }

        });
    }
);
