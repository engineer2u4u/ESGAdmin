sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.ManageFactors", {

        onInit: function () {
            var that = this;
            // Initialize an array to store the changed rows
            this.aChangedRows = [];
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getRouter().getRoute("ClientBranches").attachPatternMatched(this._handleRouteMatched, this);
            var db = firebase.firestore();
            var docRef = db.collection('Master Data').doc('Factors');
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    that.firestoreData = doc.data().factor;
                }
            });
            // Load initial Scope 1 data
            this.loadData("./assets/model/ScopeFactors.json", "factorData", "Scope1");
        },

        loadData: function (sPath, sModelName, scopeKey) {
            var that = this;
            var oModel = new JSONModel();

            // Step 1: Load data from local JSON file
            oModel.attachRequestCompleted(function () {
                if (oModel.getData()) {
                    console.log("Data loaded successfully from " + sPath);
                    var aData = oModel.getData()[scopeKey];
                    var oData = { results: aData };

                    // Step 2: Fetch additional data from Firestore and merge it with the JSON data
                    var db = firebase.firestore();
                    var docRef = db.collection('Master Data').doc('Factors');

                    docRef.get().then(function (doc) {
                        if (doc.exists) {
                            var firestoreData = doc.data().factor; // Assuming 'factor' is the array in Firestore

                            // Merge Firestore data with JSON data
                            var updatedData = that._mergeData(oData.results, firestoreData);

                            // Step 3: Bind the updated data to the table
                            var oJSONModel = new JSONModel();
                            oJSONModel.setSizeLimit(4000);
                            oJSONModel.setData({ results: updatedData });
                            that.getView().setModel(oJSONModel, sModelName);

                            // Step 4: Update the MultiComboBox with unique values
                            var aUniqueLevel1 = that._getUniqueValues(updatedData, "Level 1");
                            var aUniqueLevel2 = that._getUniqueValues(updatedData, "Level 2");
                            var aUniqueLevel3 = that._getUniqueValues(updatedData, "Level 3");

                            var oLevel1Model = new JSONModel({ results: aUniqueLevel1 });
                            that.getView().byId("level1ComboBox").setModel(oLevel1Model, "level1Model");

                            var oLevel2Model = new JSONModel({ results: aUniqueLevel2 });
                            that.getView().byId("level2ComboBox").setModel(oLevel2Model, "level2Model");

                            var oLevel3Model = new JSONModel({ results: aUniqueLevel3 });
                            that.getView().byId("level3ComboBox").setModel(oLevel3Model, "level3Model");

                        } else {
                            console.error("No such document in Firestore!");
                        }
                    }).catch(function (error) {
                        console.error("Error getting Firestore document:", error);
                    });
                } else {
                    console.error("Data is empty or invalid from " + sPath);
                }
            });

            oModel.attachRequestFailed(function () {
                console.error("Failed to load data from " + sPath);
                MessageToast.show("Failed to load data from " + sPath);
            });

            // Load data from local JSON
            oModel.loadData(sPath, false);
        },

        _mergeData: function (jsonData, firestoreData) {
            // Assuming both arrays contain unique 'Lookup' keys, merge based on that
            return jsonData.map(function (jsonItem) {
                var matchingFirestoreItem = firestoreData.find(function (firestoreItem) {
                    return firestoreItem.Lookup === jsonItem.Lookup;
                });

                // If a matching Firestore item exists, update the jsonItem
                if (matchingFirestoreItem) {
                    jsonItem["GHG Conversion"] = matchingFirestoreItem["GHG Conversion"];
                }

                return jsonItem;
            });
        },

        // Utility function to get unique values from the data
        _getUniqueValues: function (aData, sKey) {
            var aUnique = [];
            var oUniqueValues = {};  // To keep track of already added values

            aData.forEach(function (oItem) {
                if (!oUniqueValues[oItem[sKey]]) {
                    oUniqueValues[oItem[sKey]] = true;
                    aUnique.push({ key: oItem[sKey], text: oItem[sKey] });
                }
            });

            return aUnique;
        },

        onSearch: function () {
            // Get the selected items from the MultiComboBoxes
            var oView = this.getView();
            var oTable = oView.byId("ghgTable");  // Assuming this is the ID of your table
            var oBinding = oTable.getBinding("items");  // Get the binding for the table rows

            var aFilters = [];  // Array to store filters

            // Get selected values from Level 1 ComboBox
            var aSelectedLevel1Items = oView.byId("level1ComboBox").getSelectedItems();
            if (aSelectedLevel1Items.length > 0) {
                var aLevel1Filters = aSelectedLevel1Items.map(function (oItem) {
                    return new sap.ui.model.Filter("Level 1", sap.ui.model.FilterOperator.EQ, oItem.getKey());
                });
                aFilters.push(new sap.ui.model.Filter({
                    filters: aLevel1Filters,
                    and: false  // 'or' condition between multiple selections in Level 1
                }));
            }

            // Get selected values from Level 2 ComboBox
            var aSelectedLevel2Items = oView.byId("level2ComboBox").getSelectedItems();
            if (aSelectedLevel2Items.length > 0) {
                var aLevel2Filters = aSelectedLevel2Items.map(function (oItem) {
                    return new sap.ui.model.Filter("Level 2", sap.ui.model.FilterOperator.EQ, oItem.getKey());
                });
                aFilters.push(new sap.ui.model.Filter({
                    filters: aLevel2Filters,
                    and: false  // 'or' condition between multiple selections in Level 2
                }));
            }

            // Get selected values from Level 3 ComboBox
            var aSelectedLevel3Items = oView.byId("level3ComboBox").getSelectedItems();
            if (aSelectedLevel3Items.length > 0) {
                var aLevel3Filters = aSelectedLevel3Items.map(function (oItem) {
                    return new sap.ui.model.Filter("Level 3", sap.ui.model.FilterOperator.EQ, oItem.getKey());
                });
                aFilters.push(new sap.ui.model.Filter({
                    filters: aLevel3Filters,
                    and: false  // 'or' condition between multiple selections in Level 3
                }));
            }

            // Apply the filters to the table binding
            oBinding.filter(aFilters);
        },

        onUpdateFinished: function (oEvent) {
            // Get the table instance
            var oTable = oEvent.getSource();

            // Get the total number of items in the binding (after filtering)
            var iTotalItems = oEvent.getParameter("total");

            // Update the header text with the count
            oTable.setHeaderText("Items (" + iTotalItems + ")");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onChangeScope: function (oEvent) {
            var oView = this.getView();
            // Show busy indicator for the whole view
            sap.ui.core.BusyIndicator.show(0); // 0 for immediate display
            // 2. Clear selections from the MultiComboBoxes
            oView.byId("level1ComboBox").clearSelection();
            oView.byId("level2ComboBox").clearSelection();
            oView.byId("level3ComboBox").clearSelection();
            var selectedKey = oEvent.getParameter("selectedItem").getKey();
            this.loadData("./assets/model/ScopeFactors.json", "factorData", selectedKey);
            // Remove loader after a delay of 1 second
            setTimeout(function () {
                sap.ui.core.BusyIndicator.hide(); // Hide the busy indicator after 1 second
            }.bind(this), 1000); // 1000 milliseconds = 1 second
        },

        onResetFilters: function () {
            var oView = this.getView();
            // 1. Set the Scope filter back to "Scope1"
            var oScopeFilter = oView.byId("filterScope");
            oScopeFilter.setSelectedKey("Scope1");

            // 2. Clear selections from the MultiComboBoxes
            oView.byId("level1ComboBox").clearSelection();
            oView.byId("level2ComboBox").clearSelection();
            oView.byId("level3ComboBox").clearSelection();

            // 3. Optionally, reset the table by clearing any applied filters
            var oTable = oView.byId("ghgTable");
            var oBinding = oTable.getBinding("items");
            oBinding.filter([]); // Clear all filters applied to the table
            // Load initial Scope 1 data
            this.loadData("./assets/model/ScopeFactors.json", "factorData", "Scope1");
        },

        onGHGConversionChange: function (oEvent) {
            // Get the row context where the change happened
            var oContext = oEvent.getSource().getBindingContext("factorData");
            var oChangedData = oContext.getObject(); // Get the row data

            // Find the index of the existing row in the array (if already modified)
            var iIndex = this.aChangedRows.findIndex(function (item) {
                return item["Lookup VALID"] === oChangedData.Lookup;
            });

            // Update the GHG Conversion value for the modified row
            if (iIndex > -1) {
                this.aChangedRows[iIndex]["GHG Conversion Factor 2021"] = oChangedData["GHG Conversion"];
            } else {
                // Push the modified row to the array
                this.aChangedRows.push({
                    "Lookup VALID": oChangedData.Lookup,
                    "GHG Conversion Factor 2021": oChangedData["GHG Conversion"]
                });
            }
        },

        onSaveChanges: function () {
            var db = firebase.firestore(); // Initialize your Firebase Firestore instance

            // Reference to the document
            var docRef = db.collection('Master Data').doc('Factors');

            // Fetch the current 'factor' array
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    var factorArray = doc.data().factor; // Get the array

                    // Apply changes to the array
                    this.applyChangesToArray(factorArray);

                    // Update the entire 'factor' array back to Firestore
                    return docRef.update({
                        factor: factorArray
                    }).then(function () {
                        console.log("Document successfully updated!");
                    }).catch(function (error) {
                        console.error("Error updating document: ", error);
                    });
                } else {
                    console.log("No such document!");
                }
            }.bind(this)).catch(function (error) {
                console.log("Error getting document:", error);
            });
        },

        applyChangesToArray: function (factorArray) {
            // Loop through the array and apply the changes (using aChangedRows)
            this.aChangedRows.forEach(function (changedRow) {
                // Find the corresponding entry in the factorArray
                var index = factorArray.findIndex(function (item) {
                    return item.Lookup === changedRow["Lookup VALID"];
                });

                if (index > -1) {
                    // Update the GHG Conversion for the matched item
                    factorArray[index]["GHG Conversion"] = changedRow["GHG Conversion Factor 2021"];
                }
            });
        },

        onUploadDefaultFactor: function () {
            var  sPath = "./assets/model/Factors.json";
            var db = firebase.firestore();
            var oModel = new JSONModel();
            oModel.attachRequestCompleted(function () {
                if (oModel.getData()) {
                    console.log("Data loaded successfully from " + sPath);
                    var aData = oModel.getData()["Factors"];
                    db.collection('Master Data').doc('Factors').set({
                        factor: aData
                    }).then(() => {
                        sap.m.MessageToast.show("Factors Updated Successfully");
                    }).catch(error => {
                        sap.m.MessageToast.show("Error Creating Factors: " + error.message);
                    });
                } else {
                    console.error("Data is empty or invalid from " + sPath);
                }
            });
            oModel.attachRequestFailed(function () {
                console.error("Failed to load data from " + sPath);
                MessageToast.show("Failed to load data from " + sPath);
            });

            // Load data from local JSON
            oModel.loadData(sPath, false);
        }
    });
});
