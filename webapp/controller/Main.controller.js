sap.ui.define(
  ["../controller/BaseController", "sap/m/MessageStrip"],
  function (Controller, MessageStrip) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.Main", {
      onInit: function () {
        this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        this.getRouter()
          .getRoute("Main")
          .attachPatternMatched(this._handleRouteMatched, this);

        // Firebase reference to 'notifications' collection
        var db = firebase.firestore();
        var notificationsRef = db.collection("notifications");

        // Set up a model to store notifications
        var oNotificationModel = new sap.ui.model.json.JSONModel({
          notifications: [],
          unreadCount: 0
        });
        this.getView().setModel(oNotificationModel, "notificationModel");

        // Listen for new notifications
        notificationsRef.onSnapshot(function (snapshot) {
          var notifications = [];
          var unreadCount = 0;

          snapshot.forEach(function (doc) {
            var notification = doc.data();
            notifications.push(notification);

            // Count unread notifications
            if (!notification.read) {
              unreadCount++;
            }
          });

          // Update the model
          oNotificationModel.setProperty("/notifications", notifications);
          oNotificationModel.setProperty("/unreadCount", unreadCount);
        });
      },
      _handleRouteMatched: function (oEvent) {
        var that = this;
        this.checkgetUserLog().then(user => {
          that.getView().byId("user").setText("Welcome, " + user.email);
        });
      },

      onLogOut: function () {
        this.logOut();
      },

      onTilePress: function (oEvent) {
        var lead = oEvent.getSource().getProperty("header");
        var that = this;
        if (lead) {
          lead = lead.split(" ").join("");
          that.oRouter.navTo(lead);
        }
      },

      onNotificationPress: function (oEvent) {
        // Get the MessagePopover control
        var oPopover = this.byId("notificationPopover");
    
        // Open the popover near the notification icon
        oPopover.openBy(oEvent.getSource());
    
        // Clear the unread count and remove emphasis
        var oNotificationModel = this.getView().getModel("notificationModel");
        oNotificationModel.setProperty("/unreadCount", 0);
    
        // Optionally, mark all notifications as read in Firebase
        var db = firebase.firestore();
        var notificationsRef = db.collection("notifications").where("read", "==", false);;
        
        notificationsRef.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                notificationsRef.doc(doc.id).update({ read: true });
            });
        });
    }
    
    });
  }
);
