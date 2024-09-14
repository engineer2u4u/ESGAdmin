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
    }
    });
  }
);
