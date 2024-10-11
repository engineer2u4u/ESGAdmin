sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", 'sap/ui/core/Fragment',"sap/m/MessageToast"],
  function (Controller, JSONModel, Fragment, MessageToast) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.BaseController", {
      /**
       * Called when a controller is instantiated and its View controls (if available) are already created.
       * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
       * @memberOf RecieptApp.RecieptApp.view.ClientPayment
       */
      onInit: function () {
      },
      getRouter: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        return oRouter;
      },
      checkgetUserLog: function () {
        return new Promise((resolve, reject) => {
          var that = this;
          sap.ui.core.BusyIndicator.show();
          var oFModel = this.getView().getModel("fbModel").getData();
          var fireAuth = oFModel.fireAuth;
          fireAuth.onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              if (user) {
                sap.ui.core.BusyIndicator.hide();
                resolve(user);
              }
              else {
                that.getRouter().navTo("Login");
                sap.ui.core.BusyIndicator.hide();
                reject();
              }
              // ...
            } else {
              that.getRouter().navTo("Login");
              sap.ui.core.BusyIndicator.hide();
              reject();
            }
          });
        })

      },

      onHomePress: function (oEvent) {
        this.oRouter.navTo("Main");
      },
      
      getUserLog: function () {
        var oFModel = this.getView().getModel("fbModel").getData();
        var fireAuth = oFModel.fireAuth;
        if (fireAuth.currentUser) {
          return fireAuth.currentUser
        }
        else {
          return null;
        }
      },
      logOut: function () {
        var oFModel = this.getView().getModel("fbModel").getData();
        var fireAuth = oFModel.fireAuth;
        fireAuth.signOut();
        this.getRouter().navTo("Login")
      },

      handlePopoverPress: function (oEvent) {
        var oButton = oEvent.getSource(),
          oView = this.getView();
  
        // create popover
        if (!this._pPopover) {
          this._pPopover = Fragment.load({
            id: oView.getId(),
            name: "ESGAdmin.ESGAdmin.view.Dialog.userPopover",
            controller: this
          }).then(function(oPopover) {
            oView.addDependent(oPopover);
            return oPopover;
          });
        }
        this._pPopover.then(function(oPopover) {
          oPopover.openBy(oButton);
        });
      },

      onOpenPasswordChangeDialog: function () {
        var oView = this.getView();

        // Open the dialog only if it's not already created
        if (!this.byId("passwordChangeDialog")) {
            Fragment.load({
                id: oView.getId(),
                name: "ESGAdmin.ESGAdmin.view.Dialog.PasswordChangeDialog", // Replace with correct path to your view fragment
                controller: this
            }).then(function (oDialog) {
                oView.addDependent(oDialog);
                oDialog.open();
            });
        } else {
            this.byId("passwordChangeDialog").open();
        }
    },

    // Close the dialog
    onCloseDialog: function () {
      this.byId("passwordChangeDialog").close();
    },

    // Toggle password visibility
    onTogglePasswordVisibility: function (oEvent) {
        var oInput = oEvent.getSource().getParent().getItems()[0];

        // Toggle the input type between "Password" and "Text"
        var sType = oInput.getProperty("type") === "Password" ? "Text" : "Password";
        oInput.setProperty("type", sType);

        // Toggle the icon between "show" and "hide"
        var sIcon = sType === "Password" ? "sap-icon://show" : "sap-icon://hide";
        oEvent.getSource().setProperty("icon", sIcon);
    },

    // Call Firebase to change the password
    onChangePassword: function () {
        var sCurrentPassword = this.byId("currentPassword").getValue();
        var sNewPassword = this.byId("newPassword").getValue();
        var sConfirmPassword = this.byId("confirmPassword").getValue();

        // Basic validation
        if (!sCurrentPassword || !sNewPassword || !sConfirmPassword) {
            MessageToast.show("Please fill out all fields.");
            return;
        }

        if (sNewPassword !== sConfirmPassword) {
            MessageToast.show("New Password and Confirm Password do not match.");
            return;
        }

        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, sCurrentPassword);

        // Re-authenticate the user with current password
        user.reauthenticateWithCredential(credential).then(function () {
            // User successfully re-authenticated, now update the password
            user.updatePassword(sNewPassword).then(function () {
                MessageToast.show("Password changed successfully.");
            }).catch(function (error) {
                MessageToast.show("Error updating password: " + error.message);
            });
        }).catch(function (error) {
            MessageToast.show("Re-authentication failed: " + error.message);
        });
    }

    });
  }
);
