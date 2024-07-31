sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
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
      }

    });
  }
);
