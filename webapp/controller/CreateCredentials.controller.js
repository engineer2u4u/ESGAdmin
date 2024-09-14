sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.CreateCredentials", {

        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getRouter().getRoute("CreateCredentials").attachPatternMatched(this._handleRouteMatched, this);
        },

        _handleRouteMatched: function (oEvent) {
            var that = this;
            this.domain = oEvent.getParameter("arguments").domain;
            this.currentNav = oEvent.getParameter("arguments").currentNav;
            var db = firebase.firestore();
            db.collection(this.domain).doc("Master Data").get().then(function (doc) {
                var data = doc.data();
                var branchData = { results: data.branches };
                var oModel = new JSONModel(branchData);
                that.getView().setModel(oModel, "branchData");
            });
            db.collection(this.domain).doc("Master Data").collection("Employees").onSnapshot(function (querySnapshot) {
                var userData = [];
                querySnapshot.forEach(function (doc) {
                    // Push each document data into the array
                    userData.push(doc.data());
                });
                var orgData = { results: userData };
                var oModel = new JSONModel(orgData);
                that.getView().setModel(oModel, "orgData");
            });
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

        onLogOut: function () {
            this.logOut();
        },

        onGenerateRandomPassword: function () {
            const randomPassword = Math.random().toString(36).slice(-8);
            this.byId("passwordInput").setValue(randomPassword);
        },

        onCreate: function () {
            var sFullDomain = this.domain;
            var isValid = this.onValidateInputs();
            if (isValid) {
                var oView = this.getView();
                var sName = oView.byId("idName").getValue();
                var role = oView.byId("idRole").getSelectedKey();
                var sEmail = oView.byId("idEmail").getValue();
                var iPhone = oView.byId("idPhone").getValue();
                var branchModelData = this.getView().getModel("branchData").getData().results;
                // var sCountry = oView.byId("idCountry").getSelectedItem().getText();
                // var sState = oView.byId("idState").getSelectedItem().getText();
                // var sDistrict = oView.byId("idDistrict").getSelectedItem().getText();
                // var sBLock = oView.byId("idBlock").getSelectedItem().getText();
                var aBranchs = oView.byId("idBranch").getSelectedKeys();
                // Filter the branchModelData based on the selected keys
                var filteredData = branchModelData.filter(function (branch) {
                    // Assuming each branch has a unique ID or key that matches the selected keys
                    return aBranchs.includes(branch.branch);
                });
                // Map the filtered data to only include the required fields
                var oBranches = filteredData.map(function (branch) {
                    return {
                        country: branch.country,
                        state: branch.state,
                        district: branch.district,
                        block: branch.block,
                        branch: branch.branch
                    };
                });
                // Convert to lowercase
                var name = sName.toLowerCase();
                // Remove special characters except spaces
                name = name.replace(/[^a-zA-Z0-9 ]/g, "");
                // Replace spaces between names with a period
                name = name.trim().replace(/\s+/g, ".");
                var username = name + '@' + sFullDomain;
                var password = '123456';
                var oFModel = this.getView().getModel("fbModel").getData();
                var oFirestore = oFModel.oFirestore;
                var secondaryApp = oFModel.secondaryApp;
                secondaryApp.auth().createUserWithEmailAndPassword(username, password)
                    .then((userCredential) => {
                        //   User successfully created
                        secondaryApp.auth().signOut();
                        const user = userCredential.user;
                        var db = firebase.firestore();
                        db.collection(sFullDomain).doc('Master Data').collection("Employees").doc(user.uid).set({
                            // Handle form submission
                            domain: sFullDomain,
                            username: username,
                            userId: user.uid,
                            name: sName,
                            role: role,
                            email: sEmail,
                            phone: iPhone,
                            branches: oBranches
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
            }
        },

        onValidateInputs: function () {
            var isValid = true;
            var oView = this.getView();
            // Get all input fields in the view
            var inputs = [
                oView.byId("idName"),
                oView.byId("idEmail"),
                oView.byId("idPhone"),
            ];

            // Iterate over all input fields
            inputs.forEach(function (input) {
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
            // var dropdown = [
            //     oView.byId("idState"),
            //     oView.byId("idDistrict"),
            //     oView.byId("idBlock"),
            // ];
            // // Iterate over all input fields
            // dropdown.forEach(function (input) {
            //     if (!input.getSelectedKey()) {
            //         // If input is empty, set ValueState to Error
            //         input.setValueState("Error");
            //         input.setValueStateText("This field is required");
            //         isValid = false;
            //     } else {
            //         // If input is not empty, reset ValueState to None
            //         input.setValueState("None");
            //     }
            // });

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
            oView.byId("idRole").setSelectedKey("Admin");
            oView.byId("idOffice").setSelectedKey("Corporate Office");
            // Get all input fields in the view
            var inputs = [
                oView.byId("idName"),
                oView.byId("idEmail"),
                oView.byId("idPhone"),
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
        },

        onValueHelpRequest: function() {
            // Get the dialog and open it
            var oDialog = this.getView().byId("valueHelpDialog");
            oDialog.open();
        },

        onDialogClose: function() {
            // Close the dialog
            this.getView().byId("valueHelpDialog").close();
        },

        onSelectPress: function() {
            // Get the selected items from the table
            var oTable = this.getView().byId("valueHelpTable");
            var aSelectedItems = oTable.getSelectedItems();

            // Create an array to hold the selected tokens
            var aTokens = [];
            var oModel = this.getView().getModel("branchData");
            aSelectedItems.forEach(function(oItem) {
                var sPath = oItem.getBindingContextPath();
                var oData = oModel.getProperty(sPath);
                
                // Create tokens for the selected items
                aTokens.push(new sap.m.Token({
                    key: oData.country + " - " + oData.state + " - " + oData.district,
                    text: oData.country + " / " + oData.state + " / " + oData.district
                }));
            });

            // Add the selected tokens to the Input field
            var oInput = this.getView().byId("idBranch");
            oInput.setTokens(aTokens);

            // Close the dialog
            this.getView().byId("valueHelpDialog").close();
        }

    });
});
