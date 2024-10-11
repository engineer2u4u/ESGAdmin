sap.ui.define(
    ["../controller/BaseController", "sap/m/MessageStrip", "sap/ui/model/json/JSONModel"],
    function (Controller, MessageStrip, JSONModel) {
        "use strict";

        return Controller.extend("ESGAdmin.ESGAdmin.controller.Support", {
            onInit: function () {
                // Create model for incidents and set to the view
                this.incidentModel = new JSONModel();
                this.getView().setModel(this.incidentModel, "incidentModel");
                this.loadIncidents();
                // Fetch clients from Firebase and set to client filter
                this.loadClients();
            },

            loadIncidents: function () {
                // Fetch incidents from Firebase where status is active
                var db = firebase.firestore();
                db.collection("Incidents").where("status", "==", "New").get()
                    .then(function (querySnapshot) {
                        var incidents = [];
                        querySnapshot.forEach(function (doc) {
                            var obj = doc.data();
                            obj.id = doc.id;
                            incidents.push(obj);
                        });
                        this.incidentModel.setData({ incidents: incidents });
                    }.bind(this));
            },

            loadClients: function () {
                var that = this;
                // Fetch client list from Firebase and populate the client filter
                var db = firebase.firestore();
                db.collection("KOSH").doc("Organisation").get().then(function (doc) {
                    var data = doc.data();
                    const orgData = { results: data.Clients };
                    const oModel = new JSONModel(orgData);
                    that.getView().setModel(oModel, "orgData");
                });
            },

            onNavBack: function () {
                this.getOwnerComponent().getRouter().navTo("Main");
            },

            onFilterChange: function () {
                // Apply filtering logic for status and client
                var status = this.getView().byId("statusFilter").getSelectedKey();
                var client = this.getView().byId("clientFilter").getSelectedKey();
                var db = firebase.firestore();

                var query = db.collection("Incidents").where("status", "==", status || "New");

                if (client) {
                    query = query.where("client", "==", client);
                }

                query.get().then(function (querySnapshot) {
                    var incidents = [];
                    querySnapshot.forEach(function (doc) {
                        incidents.push(doc.data());
                    });
                    this.incidentModel.setData({ incidents: incidents });
                }.bind(this));
            },

            loadIncidentDetails: function (incidentId) {
                var db = firebase.firestore();
                db.collection("Incidents").doc(incidentId).get().then(function (doc) {
                    if (doc.exists) {
                        var incident = doc.data();
                        this.getView().setModel(new JSONModel(incident), "incidentModel");
                    }
                }.bind(this));
            },

            onSendReply: function () {
                var remarks = this.getView().byId("idRemarks").getValue();
                var status = this.getView().byId("statusUpdate").getSelectedKey();
                var incident = this.getView().getModel("incidentModel").getData();

                // Update incident in Firebase
                var db = firebase.firestore();
                var updateData = {
                    remarks: remarks,
                    status: status
                };
                var id = this.oContext.getModel().getData().incidents[0].id;
                db.collection("Incidents").doc(id).update(updateData);
                sap.m.MessageToast.show("Incident Updated");

            },

            onViewAttachment: function () {
                var attachment = this.getView().getModel("incidentModel").getProperty("/attachment");
                if (attachment) {
                    window.open(attachment);
                }
            },

            onSelectIncident: function (oEvent) {
                var that = this;
                // Get the FlexibleColumnLayout control
                var oFlexibleColumnLayout = this.byId("flexibleColumnLayout");

                // Switch the layout to show the master and the detail view
                oFlexibleColumnLayout.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);

                // Optionally, you can bind the selected item to the detail page
                var oSelectedItem = oEvent.getParameter("listItem") || oEvent.getSource();
                this.oContext = oSelectedItem.getBindingContext("incidentModel");

                // Bind the selected incident to the detail page
                this.byId("detailPage").bindElement({
                    path: this.oContext.getPath(),
                    model: "incidentModel"
                });
            },

            onCloseDetail: function () {
                // Get the FlexibleColumnLayout control
                var oFlexibleColumnLayout = this.byId("flexibleColumnLayout");

                // Switch the layout to show only the master view
                oFlexibleColumnLayout.setLayout(sap.f.LayoutType.OneColumn);
            }

        });
    }
);
