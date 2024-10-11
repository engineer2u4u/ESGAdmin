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
                // Filter Data
                // Function to get unique values for a given key
                function getUniqueValues(data, key) {
                    return [...new Set(data.map(item => item[key]))];
                }
                var aData = data.branches;
                // Extract unique values for each field
                var aUniqueBlocks = getUniqueValues(aData, "block");
                var aUniqueCountries = getUniqueValues(aData, "country");
                var aUniqueStates = getUniqueValues(aData, "state");
                var aUniqueDistricts = getUniqueValues(aData, "district");
                var aUniqueOfficeTypes = getUniqueValues(aData, "officeType");

                // Prepare the model for the Select dropdowns
                var oFilterModel = new sap.ui.model.json.JSONModel({
                    blocks: aUniqueBlocks.map(function (block) { return { key: block }; }),
                    countries: aUniqueCountries.map(function (country) { return { key: country }; }),
                    districts: aUniqueDistricts.map(function (district) { return { key: district }; }),
                    states: aUniqueStates.map(function (state) { return { key: state }; }),
                    officeTypes: aUniqueOfficeTypes.map(function (officeType) { return { key: officeType }; })
                });

                // Set this model to your core (or to the specific view if needed)
                that.getView().setModel(oFilterModel, "filterModel");
            });
            db.collection(this.domain).doc("Master Data").collection("Employees").onSnapshot(function (querySnapshot) {
                var userData = [];

                querySnapshot.forEach(function (doc) {
                    var branch = [];
                    var obj = doc.data();
                    if (doc.data().branches) {
                        doc.data().branches.forEach(function (branchData) {
                            // Push each document data into the array
                            branch.push(branchData.branch);
                        });
                        var sBranch = branch.toString();
                        obj['branch'] = sBranch;
                        // Push each document data into the array
                        userData.push(obj);
                    }
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
            else if (this.currentNav == 'AddNewClient') {
                this.getOwnerComponent().getRouter().navTo("ReportingSheets", { currentNav: "AddNewClient", domain: this.domain });
            } else {
                this.getOwnerComponent().getRouter().navTo("Main");
            }
        },

        onLogOut: function () {
            this.logOut();
        },

        onPageClose: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onGenerateRandomPassword: function () {
            const randomPassword = Math.random().toString(36).slice(-8);
            this.byId("passwordInput").setValue(randomPassword);
        },

        onChangeRole: function () {
            var role = this.getView().byId("idRole").getSelectedKey();
            if (role == 'Admin') {
                this.getView().byId("idBranch").setEnabled(false);
                this.getView().byId("idBranch").removeAllTokens();
            }
            else if (role == 'Manager') {
                this.getView().byId("idBranch").setEnabled(true);
            }
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
                if (role == 'Manager') {
                    var aBranchs = oView.byId("idBranch").getTokens();
                    // Extract the token texts (or keys if needed)
                    var aTokenTexts = aBranchs.map(function (oToken) {
                        return oToken.getKey();  // or oToken.getKey() if you want to get the key
                    });
                    // Filter the branchModelData based on the selected keys
                    var filteredData = branchModelData.filter(function (branch) {
                        // Assuming each branch has a unique ID or key that matches the selected keys
                        return aTokenTexts.includes(branch.branch);
                    });
                    // Map the filtered data to only include the required fields
                    var oBranches = filteredData.map(function (branch) {
                        return {
                            country: branch.country,
                            state: branch.state,
                            district: branch.district,
                            block: branch.block,
                            branch: branch.branch,
                            officeType: branch.officeType
                        };
                    });
                } else if (role == 'Admin') {
                    oBranches = branchModelData;
                }
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
            // Validate Email
            var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            var validEmail = pattern.test(oView.byId("idEmail").getValue());
            if (!validEmail) {
                oView.byId("idEmail").setValueState("Error");
                oView.byId("idEmail").setValueStateText("Enter a valid email ID");
                isValid = false;
            } else {
                // If input is not empty, reset ValueState to None
                oView.byId("idEmail").setValueState("None");
            }
            // Validate Branch
            var role = oView.byId("idRole").getSelectedKey();
            var aBranches = oView.byId("idBranch").getTokens();
            if(aBranches.length == 0 && role == 'Manager'){
                oView.byId("idBranch").setValueState("Error");
                oView.byId("idBranch").setValueStateText("Select a Branch");
                isValid = false;
            }else{
                oView.byId("idBranch").setValueState("None");
            }

            return isValid; // Return whether all inputs are valid
        },

        onReset: function () {
            var that = this;
            var oView = this.getView();
            oView.byId("idRole").setSelectedKey("Manager");
            // Clear all tokens from the MultiInput
            oView.byId("idBranch").removeAllTokens();
            // Get all input fields in the view
            var inputs = [
                oView.byId("idName"),
                oView.byId("idEmail"),
                oView.byId("idPhone"),
            ];
            // Iterate over all input fields
            inputs.forEach(function (input) {
                // If input is not empty, reset ValueState to None
                input.setValueState("None");
                input.setValue("");
            });
        },

        onValueHelpRequest: function () {
            // Get the dialog and open it
            var oDialog = this.getView().byId("valueHelpDialog");
            oDialog.open();
        },

        onDialogClose: function () {
            // Close the dialog
            this.getView().byId("valueHelpDialog").close();
        },

        onSelectPress: function () {
            // Get the selected items from the table
            var oTable = this.getView().byId("valueHelpTable");
            var aSelectedItems = oTable.getSelectedItems();

            // Create an array to hold the selected tokens
            var aTokens = [];
            var oModel = this.getView().getModel("branchData");
            aSelectedItems.forEach(function (oItem) {
                var sPath = oItem.getBindingContextPath();
                var oData = oModel.getProperty(sPath);
            
                // Start with country and state
                var sKey = oData.country + "-" + oData.state;
                var sText = oData.country + " / " + oData.state;
            
                // Add district if it's not empty
                if (oData.district) {
                    sKey += "-" + oData.district;
                    sText += " / " + oData.district;
                }
            
                // Add block if it's not empty
                if (oData.block) {
                    sKey += "-" + oData.block;
                    sText += " / " + oData.block;
                }
            
                // Create tokens for the selected items
                aTokens.push(new sap.m.Token({
                    key: sKey,
                    text: sText
                }));
            });
            

            // Add the selected tokens to the Input field
            var oInput = this.getView().byId("idBranch");
            oInput.setTokens(aTokens);

            // Close the dialog
            this.getView().byId("valueHelpDialog").close();
        },

        onFilterChange: function () {
            // Get selected values from each Select control
            var oView = this.getView();
            var sSelectedCountry = oView.byId("idCountrySearch").getSelectedKey();
            var sSelectedState = oView.byId("idStateSearch").getSelectedKey();
            var sSelectedDistrict = oView.byId("idDistrictSearch").getSelectedKey();
            var sSelectedBlock = oView.byId("idBlockSearch").getSelectedKey();
            var sSelectedOfficeType = oView.byId("idOfficeSearch").getSelectedKey();
        
            // Create an array of filters
            var aFilters = [];
        
            // Add filters for each selected value (if a value is selected)
            if (sSelectedCountry) {
                aFilters.push(new sap.ui.model.Filter("country", sap.ui.model.FilterOperator.EQ, sSelectedCountry));
            }
            if (sSelectedState) {
                aFilters.push(new sap.ui.model.Filter("state", sap.ui.model.FilterOperator.EQ, sSelectedState));
            }
            if (sSelectedDistrict) {
                aFilters.push(new sap.ui.model.Filter("district", sap.ui.model.FilterOperator.EQ, sSelectedDistrict));
            }
            if (sSelectedBlock) {
                aFilters.push(new sap.ui.model.Filter("block", sap.ui.model.FilterOperator.EQ, sSelectedBlock));
            }
            if (sSelectedOfficeType) {
                aFilters.push(new sap.ui.model.Filter("officeType", sap.ui.model.FilterOperator.EQ, sSelectedOfficeType));
            }
        
            // Get the binding for the table
            var oTable = oView.byId("valueHelpTable"); // Replace "myTableId" with your actual table ID
            var oBinding = oTable.getBinding("items");
        
            // Apply the filters to the table binding
            oBinding.filter(aFilters);
        },

        onResetFilters: function () {
            var oView = this.getView();
        
            // Clear the selection from each Select control
            oView.byId("idCountrySearch").setSelectedKey(null);
            oView.byId("idStateSearch").setSelectedKey(null);
            oView.byId("idDistrictSearch").setSelectedKey(null);
            oView.byId("idBlockSearch").setSelectedKey(null);
            oView.byId("idOfficeSearch").setSelectedKey(null);
        
            // Get the table binding
            var oTable = oView.byId("valueHelpTable"); // Replace "myTableId" with your actual table ID
            var oBinding = oTable.getBinding("items");
        
            // Remove all filters by applying an empty array of filters
            oBinding.filter([]);
        }
        

    });
});
