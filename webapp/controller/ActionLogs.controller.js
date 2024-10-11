sap.ui.define(
    ["../controller/BaseController", "sap/m/MessageStrip", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/m/Token",],
    function (Controller, MessageStrip, JSONModel, MessageToast, Token) {
        "use strict";

        return Controller.extend("ESGAdmin.ESGAdmin.controller.ActionLogs", {

            onInit: function () {
                this.logsModel = new JSONModel();
                this.getView().setModel(this.logsModel, "logs");
                this.pageSize = 20;  // Maximum number of logs to load per page
                this.currentPage = 0;  // Keep track of the current page

                // Load initial data
                this.loadLogs();
            },

            loadLogs: function () {
                var that = this;
                var actionPerformedFilter = this.getView().byId("actionPerformedFilter").getSelectedKey();
                var fromDate = this.getView().byId("fromDateFilter").getDateValue();
                var toDate = this.getView().byId("toDateFilter").getDateValue();
                var actionPerformedOnFilter = this.getView().byId("actionPerformedOnFilter").getValue();

                // Get Firestore collection (assumes you have Firebase initialized)
                var db = firebase.firestore();
                var query = db.collection("ActionLogs");

                // Apply filters
                if (actionPerformedFilter) {
                    query = query.where("actionPerformed", "==", actionPerformedFilter);
                }
                if (fromDate && toDate) {
                    query = query.where("changedOn", ">=", fromDate).where("changedOn", "<=", toDate);
                }
                if (actionPerformedOnFilter) {
                    query = query.where("actionPerformedOn", ">=", actionPerformedOnFilter);
                }

                // Apply pagination using startAfter (start at last document of previous page)
                if (this.lastVisible) {
                    query = query.orderBy("changedOn", "desc").startAfter(this.lastVisible).limit(this.pageSize);
                } else {
                    query = query.orderBy("changedOn", "desc").limit(this.pageSize);
                }

                query.get().then(function (querySnapshot) {
                    var results = [];
                    querySnapshot.forEach(function (doc) {
                        var data = doc.data();
                        data.changedOn = new Date(data.changedOn.seconds * 1000).toLocaleString(); // Convert Firestore timestamp to readable format
                        results.push(data);
                    });

                    // Save the last visible document for the next page
                    if (!querySnapshot.empty) {
                        that.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                    }

                    // Set the data in the model
                    that.logsModel.setData({ results: results });
                }).catch(function (error) {
                    console.error("Error loading logs: ", error);
                });
            },

            onFilterChange: function () {
                this.currentPage = 0;  // Reset to the first page when filters change
                this.loadLogs();
            },

            onPrevious: function () {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    this.loadLogs();
                }
            },

            onNext: function () {
                this.currentPage++;
                this.loadLogs();
            },

            onNavBack: function () {
                this.getOwnerComponent().getRouter().navTo("Main");
            },

            onHomePress: function (oEvent) {
                this.oRouter.navTo("Main");
            },

            onLogOut: function () {
                this.logOut();
            }

        });
    }
);
