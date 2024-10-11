sap.ui.define(
    ["../controller/BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageBox"],
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("ESGAdmin.ESGAdmin.controller.Login", {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf ESGAdmin.ESGAdmin.view.ClientPayment
             */
            onInit: function () {
                this.getRouter()
                    .getRoute("Login")
                    .attachPatternMatched(this._handleRouteMatched, this);


            },
            _handleRouteMatched: function () {
                var data = this.getUserLog();
                if (data) {
                    // alert('user logged in');
                    this.getRouter().navTo("Main");
                }
            },
            onLogin: function () {
                var that = this;
                var email = this.getView().byId('userInput').getValue();
                var password = this.getView().byId('passwordInput').getValue();
                var oFModel = this.getView().getModel("fbModel").getData();
                var fireAuth = oFModel.fireAuth;
                fireAuth.signInWithEmailAndPassword(email, password).then(function (usersigned) {
                    that.getRouter().navTo("Main");

                }).catch(function (error) {
                    // console.log(error)
                    var msg = "";
                    if (error.message) {
                        try {
                            msg = JSON.parse(error.message);
                            msg = msg.error.message;

                        }
                        catch {
                            msg = error.message;
                        }
                    }
                    else {
                        msg = error.toString();
                    }
                    MessageBox.error(msg);
                })
            }

        });
    }
);
