sap.ui.define([
    "../controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ESGAdmin.ESGAdmin.controller.ManageFactors", {

        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.getRouter().getRoute("ClientBranches").attachPatternMatched(this._handleRouteMatched, this);
            // Load initial country data
            this.loadData("./assets/model/Factors.json", "factorData");
        },

        loadData: function (sPath, sModelName, sDistrictId) {
            var that = this;
            var oModel = new JSONModel();
            oModel.attachRequestCompleted(function () {
                if (oModel.getData()) {
                    console.log("Data loaded successfully from " + sPath);
                    var comboData = { results: oModel.getData().Factors };
                    if (sDistrictId) {
                        var modelData = oModel.getData();
                        comboData = { results: modelData[sDistrictId] };
                    }
                    const oJSONModel = new JSONModel(comboData);
                    that.getView().setModel(oJSONModel, sModelName);
                } else {
                    console.error("Data is empty or invalid from " + sPath);
                }
            });
            oModel.attachRequestFailed(function () {
                console.error("Failed to load data from " + sPath);
                MessageToast.show("Failed to load data from " + sPath);
            });
            oModel.loadData(sPath, false);
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("Main");
        },

        onUploadFactor: function () {
            var db = firebase.firestore();
           var obj = [
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsButanekWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsButanekWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsButanelitres",
                 "GHG Conversion Factor 2021": 1.75
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsButanetonnes",
                 "GHG Conversion Factor 2021": 3033.32
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsCNGkWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsCNGkWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsCNGlitres",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsCNGtonnes",
                 "GHG Conversion Factor 2021": 2538.48
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLNGkWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLNGkWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLNGlitres",
                 "GHG Conversion Factor 2021": 1.16
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLNGtonnes",
                 "GHG Conversion Factor 2021": 2555.28
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLPGkWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLPGkWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLPGlitres",
                 "GHG Conversion Factor 2021": 1.56
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsLPGtonnes",
                 "GHG Conversion Factor 2021": 2939.29
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gaskWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gaskWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gascubic metres",
                 "GHG Conversion Factor 2021": 2.02
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gastonnes",
                 "GHG Conversion Factor 2021": 2538.48
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsOther petroleum gaskWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsOther petroleum gaskWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsOther petroleum gaslitres",
                 "GHG Conversion Factor 2021": 0.94
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsOther petroleum gastonnes",
                 "GHG Conversion Factor 2021": 2578.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsPropanekWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsPropanekWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsPropanelitres",
                 "GHG Conversion Factor 2021": 1.54
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsPropanetonnes",
                 "GHG Conversion Factor 2021": 2997.55
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation spiritkWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation spiritkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation spiritlitres",
                 "GHG Conversion Factor 2021": 2.33
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation spirittonnes",
                 "GHG Conversion Factor 2021": 3192.76
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation turbine fuelkWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation turbine fuelkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation turbine fuellitres",
                 "GHG Conversion Factor 2021": 2.55
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsAviation turbine fueltonnes",
                 "GHG Conversion Factor 2021": 3181.43
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsBurning oilkWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsBurning oilkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsBurning oillitres",
                 "GHG Conversion Factor 2021": 2.54
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsBurning oiltonnes",
                 "GHG Conversion Factor 2021": 3165.01
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (average biofuel blend)kWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (average biofuel blend)kWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (average biofuel blend)litres",
                 "GHG Conversion Factor 2021": 2.51
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (average biofuel blend)tonnes",
                 "GHG Conversion Factor 2021": 2969.07
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (100% mineral diesel)kWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (100% mineral diesel)kWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (100% mineral diesel)litres",
                 "GHG Conversion Factor 2021": 2.71
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsDiesel (100% mineral diesel)tonnes",
                 "GHG Conversion Factor 2021": 3208.76
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsFuel oilkWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsFuel oilkWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsFuel oillitres",
                 "GHG Conversion Factor 2021": 3.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsFuel oiltonnes",
                 "GHG Conversion Factor 2021": 3229.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsGas oilkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsGas oilkWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsGas oillitres",
                 "GHG Conversion Factor 2021": 2.76
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsGas oiltonnes",
                 "GHG Conversion Factor 2021": 3230.28
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsLubricantskWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsLubricantskWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsLubricantslitres",
                 "GHG Conversion Factor 2021": 2.75
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsLubricantstonnes",
                 "GHG Conversion Factor 2021": 3181.43
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsNaphthakWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsNaphthakWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsNaphthalitres",
                 "GHG Conversion Factor 2021": 2.12
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsNaphthatonnes",
                 "GHG Conversion Factor 2021": 3142.87
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (average biofuel blend)kWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (average biofuel blend)kWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (average biofuel blend)litres",
                 "GHG Conversion Factor 2021": 2.19
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (average biofuel blend)tonnes",
                 "GHG Conversion Factor 2021": 2947.62
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (100% mineral petrol)kWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (100% mineral petrol)kWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (100% mineral petrol)litres",
                 "GHG Conversion Factor 2021": 2.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsPetrol (100% mineral petrol)tonnes",
                 "GHG Conversion Factor 2021": 3153.9
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - residual oilkWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - residual oilkWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - residual oillitres",
                 "GHG Conversion Factor 2021": 3.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - residual oiltonnes",
                 "GHG Conversion Factor 2021": 3229.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - distillate oilkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - distillate oilkWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - distillate oillitres",
                 "GHG Conversion Factor 2021": 2.76
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsProcessed fuel oils - distillate oiltonnes",
                 "GHG Conversion Factor 2021": 3230.28
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsRefinery miscellaneouskWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsRefinery miscellaneouskWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsRefinery miscellaneouslitres"
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsRefinery miscellaneoustonnes",
                 "GHG Conversion Factor 2021": 2944.82
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsWaste oilskWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsWaste oilskWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsWaste oilslitres",
                 "GHG Conversion Factor 2021": 2.75
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsWaste oilstonnes",
                 "GHG Conversion Factor 2021": 3224.56
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine gas oilkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine gas oilkWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine gas oillitres",
                 "GHG Conversion Factor 2021": 2.78
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine gas oiltonnes",
                 "GHG Conversion Factor 2021": 3249.99
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine fuel oilkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine fuel oilkWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine fuel oillitres",
                 "GHG Conversion Factor 2021": 3.11
                },
                {
                 "Lookup VALID": "Scope 1FuelsLiquid fuelsMarine fuel oiltonnes",
                 "GHG Conversion Factor 2021": 3159.51
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (industrial)kWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (industrial)kWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (industrial)tonnes",
                 "GHG Conversion Factor 2021": 2403.84
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (electricity generation)kWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (electricity generation)kWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (electricity generation)tonnes",
                 "GHG Conversion Factor 2021": 2252.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (domestic)kWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (domestic)kWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (domestic)tonnes",
                 "GHG Conversion Factor 2021": 2883.26
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoking coalkWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoking coalkWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoking coaltonnes",
                 "GHG Conversion Factor 2021": 3165.24
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsPetroleum cokekWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsPetroleum cokekWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsPetroleum coketonnes",
                 "GHG Conversion Factor 2021": 3386.86
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (electricity generation - home produced coal only)kWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (electricity generation - home produced coal only)kWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1FuelsSolid fuelsCoal (electricity generation - home produced coal only)tonnes",
                 "GHG Conversion Factor 2021": 2248.82
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBioethanolGJ",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBioethanolkg",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBioethanollitres",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel MEGJ",
                 "GHG Conversion Factor 2021": 5.06
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel MEkg",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel MElitres",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiomethaneGJ",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiomethanekg",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiomethanelitres",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel ME (from used cooking oil)GJ",
                 "GHG Conversion Factor 2021": 5.06
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel ME (from used cooking oil)kg",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel ME (from used cooking oil)litres",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel ME (from tallow)GJ",
                 "GHG Conversion Factor 2021": 5.06
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel ME (from tallow)kg",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel ME (from tallow)litres",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel HVO",
                 "GHG Conversion Factor 2021": 1.04
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel HVO",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiodiesel HVO",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiopropane",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiopropane",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBiopropane",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBio Petrol",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBio Petrol",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelBio Petrol",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelRenewable petrol",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelRenewable petrol",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiofuelRenewable petrol",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassWood logskWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassWood logstonnes",
                 "GHG Conversion Factor 2021": 61.82
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassWood chipskWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassWood chipstonnes",
                 "GHG Conversion Factor 2021": 57.15
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassWood pelletskWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassWood pelletstonnes",
                 "GHG Conversion Factor 2021": 72.62
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassGrass\/strawkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiomassGrass\/strawtonnes",
                 "GHG Conversion Factor 2021": 49.24
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiogasBiogaskWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiogasBiogastonnes",
                 "GHG Conversion Factor 2021": 1.22
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiogasLandfill gaskWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 1BioenergyBiogasLandfill gastonnes",
                 "GHG Conversion Factor 2021": 0.69
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardCarbon dioxidekg",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardMethanekg",
                 "GHG Conversion Factor 2021": 25
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardNitrous oxidekg",
                 "GHG Conversion Factor 2021": 298
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-23kg",
                 "GHG Conversion Factor 2021": 14800
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-32kg",
                 "GHG Conversion Factor 2021": 675
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-41kg",
                 "GHG Conversion Factor 2021": 92
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-125kg",
                 "GHG Conversion Factor 2021": 3500
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-134kg",
                 "GHG Conversion Factor 2021": 1100
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-134akg",
                 "GHG Conversion Factor 2021": 1430
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-143kg",
                 "GHG Conversion Factor 2021": 353
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-143akg",
                 "GHG Conversion Factor 2021": 4470
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-152akg",
                 "GHG Conversion Factor 2021": 124
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-227eakg",
                 "GHG Conversion Factor 2021": 3220
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-236fakg",
                 "GHG Conversion Factor 2021": 9810
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-245fakg",
                 "GHG Conversion Factor 2021": 1030
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-43-I0meekg",
                 "GHG Conversion Factor 2021": 1640
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluoromethane (PFC-14)kg",
                 "GHG Conversion Factor 2021": 7390
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluoroethane (PFC-116)kg",
                 "GHG Conversion Factor 2021": 12200
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluoropropane (PFC-218)kg",
                 "GHG Conversion Factor 2021": 8830
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluorocyclobutane (PFC-318)kg",
                 "GHG Conversion Factor 2021": 10300
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluorobutane (PFC-3-1-10)kg",
                 "GHG Conversion Factor 2021": 8860
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluoropentane (PFC-4-1-12)kg",
                 "GHG Conversion Factor 2021": 9160
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardPerfluorohexane (PFC-5-1-14)kg",
                 "GHG Conversion Factor 2021": 9300
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardSulphur hexafluoride (SF6)kg",
                 "GHG Conversion Factor 2021": 22800
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-152kg",
                 "GHG Conversion Factor 2021": 53
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-161kg",
                 "GHG Conversion Factor 2021": 12
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-236cbkg",
                 "GHG Conversion Factor 2021": 1340
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-236eakg",
                 "GHG Conversion Factor 2021": 1370
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-245cakg",
                 "GHG Conversion Factor 2021": 693
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol - standardHFC-365mfckg",
                 "GHG Conversion Factor 2021": 794
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR404Akg",
                 "GHG Conversion Factor 2021": 3922
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR407Akg",
                 "GHG Conversion Factor 2021": 2107
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR407Ckg",
                 "GHG Conversion Factor 2021": 1774
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR407Fkg",
                 "GHG Conversion Factor 2021": 1825
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR408Akg",
                 "GHG Conversion Factor 2021": 3152
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR410Akg",
                 "GHG Conversion Factor 2021": 2088
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR507Akg",
                 "GHG Conversion Factor 2021": 3985
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR508Bkg",
                 "GHG Conversion Factor 2021": 13396
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherKyoto protocol- blendsR403akg",
                 "GHG Conversion Factor 2021": 3124
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCFC-11\/R11 = trichlorofluoromethanekg",
                 "GHG Conversion Factor 2021": 4750
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCFC-12\/R12 = dichlorodifluoromethanekg",
                 "GHG Conversion Factor 2021": 10900
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCFC-13kg",
                 "GHG Conversion Factor 2021": 14400
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCFC-113kg",
                 "GHG Conversion Factor 2021": 6130
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCFC-114kg",
                 "GHG Conversion Factor 2021": 10000
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCFC-115kg",
                 "GHG Conversion Factor 2021": 7370
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHalon-1211kg",
                 "GHG Conversion Factor 2021": 1890
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHalon-1301kg",
                 "GHG Conversion Factor 2021": 7140
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHalon-2402kg",
                 "GHG Conversion Factor 2021": 1640
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardCarbon tetrachloridekg",
                 "GHG Conversion Factor 2021": 1400
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardMethyl bromidekg",
                 "GHG Conversion Factor 2021": 5
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardMethyl chloroformkg",
                 "GHG Conversion Factor 2021": 146
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-22\/R22 = chlorodifluoromethanekg",
                 "GHG Conversion Factor 2021": 1810
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-123kg",
                 "GHG Conversion Factor 2021": 77
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-124kg",
                 "GHG Conversion Factor 2021": 609
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-141bkg",
                 "GHG Conversion Factor 2021": 725
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-142bkg",
                 "GHG Conversion Factor 2021": 2310
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-225cakg",
                 "GHG Conversion Factor 2021": 122
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-225cbkg",
                 "GHG Conversion Factor 2021": 595
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - standardHCFC-21kg",
                 "GHG Conversion Factor 2021": 151
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther perfluorinated gasesNitrogen trifluoridekg",
                 "GHG Conversion Factor 2021": 17200
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther perfluorinated gasesPFC-9-1-18kg",
                 "GHG Conversion Factor 2021": 7500
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther perfluorinated gasesTrifluoromethyl sulphur pentafluoridekg",
                 "GHG Conversion Factor 2021": 17700
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther perfluorinated gasesPerfluorocyclopropanekg",
                 "GHG Conversion Factor 2021": 17340
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-125kg",
                 "GHG Conversion Factor 2021": 14900
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-134kg",
                 "GHG Conversion Factor 2021": 6320
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-143akg",
                 "GHG Conversion Factor 2021": 756
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHCFE-235da2kg",
                 "GHG Conversion Factor 2021": 350
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-245cb2kg",
                 "GHG Conversion Factor 2021": 708
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-245fa2kg",
                 "GHG Conversion Factor 2021": 659
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-254cb2kg",
                 "GHG Conversion Factor 2021": 359
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-347mcc3kg",
                 "GHG Conversion Factor 2021": 575
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-347pcf2kg",
                 "GHG Conversion Factor 2021": 580
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-356pcc3kg",
                 "GHG Conversion Factor 2021": 110
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-449sl (HFE-7100)kg",
                 "GHG Conversion Factor 2021": 297
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-569sf2 (HFE-7200)kg",
                 "GHG Conversion Factor 2021": 59
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-43-10pccc124 (H-Galden1040x)kg",
                 "GHG Conversion Factor 2021": 1870
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-236ca12 (HG-10)kg",
                 "GHG Conversion Factor 2021": 2800
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherFluorinated ethersHFE-338pcc13 (HG-01)kg",
                 "GHG Conversion Factor 2021": 1500
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsPFPMIEkg",
                 "GHG Conversion Factor 2021": 10300
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsDimethyletherkg",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsMethylene chloridekg",
                 "GHG Conversion Factor 2021": 8.7
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsMethyl chloridekg",
                 "GHG Conversion Factor 2021": 13
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsR290 = propanekg",
                 "GHG Conversion Factor 2021": 3.3
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsR600A = isobutanekg",
                 "GHG Conversion Factor 2021": 3
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsR1234yf kg",
                 "GHG Conversion Factor 2021": "< 1"
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherOther refrigerantsR1234ze kg",
                 "GHG Conversion Factor 2021": "< 1"
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - blendsR406Akg",
                 "GHG Conversion Factor 2021": 1943
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - blendsR409Akg",
                 "GHG Conversion Factor 2021": 1585
                },
                {
                 "Lookup VALID": "Scope 1Refrigerant & otherMontreal protocol - blendsR502kg",
                 "GHG Conversion Factor 2021": 4657
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniDieselkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniDieselmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniPetrolkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniPetrolmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniUnknownkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniUnknownmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MiniBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiDieselkm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiDieselmiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiPetrolkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiPetrolmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiUnknownkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiUnknownmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SuperminiBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Lower mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Upper mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutiveDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutiveDieselmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutivePetrolkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutivePetrolmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutiveUnknownkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutiveUnknownmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutiveBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)ExecutiveBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryDieselkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryDieselmiles",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryPetrolkm",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryPetrolmiles",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryUnknownkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryUnknownmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)LuxuryBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsPetrolkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsPetrolmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsUnknownkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsUnknownmiles",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)SportsBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Dieselkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Dieselmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Petrolkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Petrolmiles",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Unknownkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Unknownmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)Dual purpose 4X4Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVDieselkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVDieselmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVPetrolkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVPetrolmiles",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVUnknownkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVUnknownmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by market segment)MPVBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carDieselkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carDieselmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carPetrolkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carHybridkm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carHybridmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carCNGkm"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carCNGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carLPGkm"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carLPGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carUnknownkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Small carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carDieselkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carPetrolkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carHybridkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carHybridmiles",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carCNGkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carCNGmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carLPGkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carLPGmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carUnknownkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Medium carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carDieselkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carDieselmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carPetrolkm",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carHybridkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carHybridmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carCNGkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carCNGmiles",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carLPGkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carLPGmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carUnknownkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Large carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carPetrolkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carHybridkm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carHybridmiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carCNGkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carCNGmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carLPGkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carLPGmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carUnknownkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesCars (by size)Average carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeSmallkm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeSmallmiles",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeMediumkm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeMediummiles",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeLargekm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeLargemiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeAveragekm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 1Passenger vehiclesMotorbikeAveragemiles",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass I (up to 1.305 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)CNGkm",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)CNGmiles",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)LPGkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)LPGmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Unknownkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Unknownmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesVansAverage (up to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.78
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.84
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.98
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.69
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.94
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.5
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.77
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Rigid (>17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.54
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigids0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigids50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.27
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigids100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.8
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All rigidsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.29
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.78
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.25
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.49
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>3.5 - 33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.05
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.39
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.73
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.92
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)Articulated (>33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All artics0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.04
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All artics50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.38
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All artics100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.72
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All articsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVs0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.06
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.83
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVs50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.33
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVs100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.61
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGV (all diesel)All HGVsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.39
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.85
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.57
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.92
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.64
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.03
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.73
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.17
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.82
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.32
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.12
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 1.11
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.79
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.31
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 2.1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 1.14
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Rigid (>17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.83
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigids0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.27
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.94
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigids50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.51
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.09
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigids100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.75
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All rigidsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.54
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.16
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.9
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.44
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.73
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.89
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.43
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.21
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.6
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 2
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 1.06
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)Articulated (>33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.71
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All artics0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.21
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All artics50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.6
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All artics100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.99
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 1.05
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All articsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.69
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVs0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.97
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVs50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.56
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.17
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVs100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.89
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 1.01
                },
                {
                 "Lookup VALID": "Scope 1Delivery vehiclesHGVs refrigerated (all diesel)All HGVsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.63
                },
                {
                 "Lookup VALID": "Scope 2UK electricityElectricity generatedElectricity: UKkWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MiniPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MiniPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MiniBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MiniBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SuperminiBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SuperminiBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Lower mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Lower mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Upper mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Upper mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)ExecutiveBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)ExecutiveBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)LuxuryBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)LuxuryBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SportsPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SportsPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SportsBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)SportsBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Dual purpose 4X4Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)Dual purpose 4X4Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MPVPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MPVPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MPVBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by market segment)MPVBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Small carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Small carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Small carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Small carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Medium carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Medium carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Medium carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Medium carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Large carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Large carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Large carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Large carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Average carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Average carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Average carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsCars (by size)Average carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass I (up to 1.305 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass I (up to 1.305 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass I (up to 1.305 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansAverage (up to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansAverage (up to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2UK electricity for EvsVansAverage (up to 3.5 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2Heat and steamHeat and steamOnsite heat and steamkWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 2Heat and steamHeat and steamDistrict heat and steamkWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Water supplyWater supplyWater supplycubic metres",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Water supplyWater supplyWater supplymillion litres",
                 "GHG Conversion Factor 2021": 149
                },
                {
                 "Lookup VALID": "Scope 3Water treatmentWater treatmentWater treatmentcubic metres",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Water treatmentWater treatmentWater treatmentmillion litres",
                 "GHG Conversion Factor 2021": 272
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAggregatesPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 7.76
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAggregatesRe-usedtonnes",
                 "GHG Conversion Factor 2021": 2.21
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAggregatesOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3.2
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAggregatesClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3.2
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAverage constructionPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 79.97
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAverage constructionRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAverage constructionOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAverage constructionClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsbestosPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 27
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsbestosRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsbestosOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsbestosClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsphaltPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 39.21
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsphaltRe-usedtonnes",
                 "GHG Conversion Factor 2021": 1.74
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsphaltOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionAsphaltClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 28.66
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionBricksPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 241.76
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionBricksRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionBricksOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3.2
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionBricksClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionConcretePrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 131.76
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionConcreteRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionConcreteOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3.2
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionConcreteClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3.2
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionInsulationPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 1861.76
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionInsulationRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionInsulationOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionInsulationClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1852.09
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMetalsPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3975.82
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMetalsRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMetalsOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMetalsClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1571.27
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionSoilsPrimary material productiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionSoilsRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionSoilsOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionSoilsClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMineral oilPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 1401
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMineral oilRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMineral oilOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionMineral oilClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 676
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionPlasterboardPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 120.05
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionPlasterboardRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionPlasterboardOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionPlasterboardClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 32.17
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionTyresPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3335.57
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionTyresRe-usedtonnes",
                 "GHG Conversion Factor 2021": 731.22
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionTyresOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 308.4
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionTyresClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionWoodPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 312.61
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionWoodRe-usedtonnes",
                 "GHG Conversion Factor 2021": 38.54
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionWoodOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 259.13
                },
                {
                 "Lookup VALID": "Scope 3Material useConstructionWoodClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 112.97
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherBooksPrimary material productiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherBooksRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherBooksOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherBooksClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherGlassPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 1402.77
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherGlassRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherGlassOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 24.76
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherGlassClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 823.19
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherClothingPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 22310
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherClothingRe-usedtonnes",
                 "GHG Conversion Factor 2021": 152.25
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherClothingOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 152.25
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherClothingClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherFood and drinkPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3701.4
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherFood and drinkRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherFood and drinkOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOtherFood and drinkClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useOrganicCompost derived from garden wastePrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 113.31
                },
                {
                 "Lookup VALID": "Scope 3Material useOrganicCompost derived from food and garden wastePrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 116.13
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - fridges and freezersPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 4363.33
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - fridges and freezersRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - fridges and freezersOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - fridges and freezersClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - largePrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3267
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - largeRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - largeOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - largeClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - ITPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 24865.48
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - ITRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - ITOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - ITClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - smallPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 5647.95
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - smallRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - smallOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsElectrical items - smallClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - AlkalinePrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 4633.48
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - AlkalineRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - AlkalineOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - AlkalineClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - Li ionPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 6308
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - Li ionRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - Li ionOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - Li ionClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - NiMhPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 28380
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - NiMhRe-usedtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - NiMhOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useElectrical itemsBatteries - NiMhClosed-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: aluminium cans and foil (excl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 9122.64
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: aluminium cans and foil (excl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 999.4
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: mixed cansPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 5268.56
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: mixed cansClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1473.79
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: scrap metalPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3682.68
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: scrap metalClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1633.18
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: steel cansPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3100.64
                },
                {
                 "Lookup VALID": "Scope 3Material useMetalMetal: steel cansClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1740.64
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plasticsPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3116.29
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plasticsOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plasticsClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 2326.53
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plastic filmPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 2574.16
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plastic filmOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plastic filmClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1894.63
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plastic rigidPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 3276.71
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plastic rigidOpen-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: average plastic rigidClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 2748.83
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: HDPE (incl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 3269.84
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: HDPE (incl. forming)Open-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: HDPE (incl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 2350.62
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: LDPE and LLDPE (incl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 2600.64
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: LDPE and LLDPE (incl. forming)Open-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: LDPE and LLDPE (incl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 1797.22
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PET (incl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 4032.39
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PET (incl. forming)Open-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PET (incl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3125.27
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PP (incl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 3104.73
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PP (incl. forming)Open-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PP (incl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 2541.31
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PS (incl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 3777.95
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PS (incl. forming)Open-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PS (incl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 3198.96
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PVC (incl. forming)Primary material productiontonnes",
                 "GHG Conversion Factor 2021": 3413.08
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PVC (incl. forming)Open-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 600
                },
                {
                 "Lookup VALID": "Scope 3Material usePlasticPlastics: PVC (incl. forming)Closed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 2489.67
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: boardPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 821.23
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: boardOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: boardClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 718.54
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: mixedPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 881.19
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: mixedOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: mixedClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 731.28
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: paperPrimary material productiontonnes",
                 "GHG Conversion Factor 2021": 919.4
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: paperOpen-loop sourcetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Material usePaperPaper and board: paperClosed-loop sourcetonnes",
                 "GHG Conversion Factor 2021": 739.4
                },
                {
                 "Lookup VALID": "Scope 3Transmission and distributionT&D- UK electricityElectricity: UKkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Transmission and distributionDistribution - district heat & steam5% losskWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MiniPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MiniPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MiniBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MiniBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SuperminiBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SuperminiBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Lower mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Lower mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Upper mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Upper mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)ExecutiveBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)ExecutiveBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)LuxuryBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)LuxuryBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SportsPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SportsPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SportsBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)SportsBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Dual purpose 4X4Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)Dual purpose 4X4Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MPVPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MPVPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MPVBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by market segment)MPVBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Small carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Small carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Small carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Small carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Medium carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Medium carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Medium carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Medium carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Large carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Large carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Large carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Large carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Average carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Average carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Average carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsCars (by size)Average carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass I (up to 1.305 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass I (up to 1.305 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass I (up to 1.305 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansAverage (up to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansAverage (up to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3UK electricity T&D for EVsVansAverage (up to 3.5 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsButaneEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsButaneEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsButanelitres",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsButaneTonnestonnes",
                 "GHG Conversion Factor 2021": 342.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsCNGEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsCNGEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsCNGlitres",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsCNGTonnestonnes",
                 "GHG Conversion Factor 2021": 542.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLNGEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLNGEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLNGlitres",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLNGTonnestonnes",
                 "GHG Conversion Factor 2021": 882.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLPGEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLPGEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLPGlitres",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsLPGTonnestonnes",
                 "GHG Conversion Factor 2021": 347.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural GasEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural GasEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural Gascubic metres",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural GasTonnestonnes",
                 "GHG Conversion Factor 2021": 434.43
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsOther Petroleum GasEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsOther Petroleum GasEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsOther Petroleum Gaslitres",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsOther Petroleum GasTonnestonnes",
                 "GHG Conversion Factor 2021": 304.51
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsPropaneEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsPropaneEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsPropanelitres",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsPropaneTonnestonnes",
                 "GHG Conversion Factor 2021": 350.46
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation SpiritEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation SpiritEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation Spiritlitres",
                 "GHG Conversion Factor 2021": 0.6
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation SpiritTonnestonnes",
                 "GHG Conversion Factor 2021": 815.31
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation Turbine FuelEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation Turbine FuelEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation Turbine Fuellitres",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsAviation Turbine FuelTonnestonnes",
                 "GHG Conversion Factor 2021": 658.57
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsBurning OilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsBurning OilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsBurning Oillitres",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsBurning OilTonnestonnes",
                 "GHG Conversion Factor 2021": 657.97
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (average biofuel blend)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (average biofuel blend)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (average biofuel blend)litres",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (average biofuel blend)Tonnestonnes",
                 "GHG Conversion Factor 2021": 720.73
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (100% mineral diesel)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (100% mineral diesel)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (100% mineral diesel)litres",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsDiesel (100% mineral diesel)Tonnestonnes",
                 "GHG Conversion Factor 2021": 745.68
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsFuel OilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsFuel OilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsFuel Oillitres",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsFuel OilTonnestonnes",
                 "GHG Conversion Factor 2021": 709.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsGas OilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsGas OilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsGas Oillitres",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsGas OilTonnestonnes",
                 "GHG Conversion Factor 2021": 740.7
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsLubricantsEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsLubricantsEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsLubricantslitres"
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsLubricantsTonnestonnes",
                 "GHG Conversion Factor 2021": 824.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsNaphthaEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsNaphthaEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsNaphthalitres"
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsNaphthaTonnestonnes",
                 "GHG Conversion Factor 2021": 640.81
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (average biofuel blend)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (average biofuel blend)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (average biofuel blend)litres",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (average biofuel blend)Tonnestonnes",
                 "GHG Conversion Factor 2021": 824.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (100% mineral petrol)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (100% mineral petrol)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (100% mineral petrol)litres",
                 "GHG Conversion Factor 2021": 0.6
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsPetrol (100% mineral petrol)Tonnestonnes",
                 "GHG Conversion Factor 2021": 812.61
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - residual oilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - residual oilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - residual oillitres",
                 "GHG Conversion Factor 2021": 0.82
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - residual oilTonnestonnes",
                 "GHG Conversion Factor 2021": 835.82
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - distillate oilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - distillate oilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - distillate oillitres",
                 "GHG Conversion Factor 2021": 0.71
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsProcessed fuel oils - distillate oilTonnestonnes",
                 "GHG Conversion Factor 2021": 828.96
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsRefinery MiscellaneousEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsRefinery MiscellaneousEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsRefinery Miscellaneouslitres"
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsRefinery MiscellaneousTonnestonnes",
                 "GHG Conversion Factor 2021": 346.79
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsWaste oilsEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsWaste oilsEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsWaste oilslitres"
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsWaste oilsTonnestonnes",
                 "GHG Conversion Factor 2021": 824.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine gas oilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine gas oilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine gas oillitres",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine gas oilTonnestonnes",
                 "GHG Conversion Factor 2021": 740.7
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine fuel oilEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine fuel oilEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine fuel oillitres",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- liquid fuelsMarine fuel oilTonnestonnes",
                 "GHG Conversion Factor 2021": 709.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (industrial)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (industrial)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (industrial)Tonnestonnes",
                 "GHG Conversion Factor 2021": 393.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (electricity generation)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (electricity generation)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (electricity generation)Tonnestonnes",
                 "GHG Conversion Factor 2021": 372.28
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (domestic)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (domestic)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (domestic)Tonnestonnes",
                 "GHG Conversion Factor 2021": 442.79
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoking CoalEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoking CoalEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoking CoalTonnestonnes",
                 "GHG Conversion Factor 2021": 467.97
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsPetroleum CokeEnergy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsPetroleum CokeEnergy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsPetroleum CokeTonnestonnes",
                 "GHG Conversion Factor 2021": 399.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (electricity generation - home produced coal only)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (electricity generation - home produced coal only)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- solid fuelsCoal (electricity generation - home produced coal only)Tonnestonnes",
                 "GHG Conversion Factor 2021": 371.7
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- UK electricity (generation)Electricity: UKkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- UK electricity (T&D)Electricity: UKkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: AustraliakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: AustriakWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: BelgiumkWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: BrazilkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: BulgariakWh",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: CanadakWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Chinese TaipeikWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: CroatiakWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: CypruskWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Czech RepublickWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: DenmarkkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: EgyptkWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: EstoniakWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: FinlandkWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: FrancekWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: GermanykWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: GibraltarkWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: GreecekWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Hong Kong, ChinakWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: HungarykWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: IcelandkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: IndiakWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: IndonesiakWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: IrelandkWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: IsraelkWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: ItalykWh",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: JapankWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: LatviakWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: LithuaniakWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: LuxembourgkWh",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: MalaysiakWh",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: MaltakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: MexicokWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: NetherlandskWh",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: New ZealandkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: NorwaykWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: PakistankWh",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: People's Rep. of ChinakWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: PhilippineskWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: PolandkWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: PortugalkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: RomaniakWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Russian FederationkWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Saudi ArabiakWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: SingaporekWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Slovak RepublickWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: SloveniakWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: South AfricakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: South KoreakWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: SpainkWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: SwedenkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: SwitzerlandkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: ThailandkWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: TurkeykWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: UkrainekWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: United StateskWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Africa (average)kWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: EU (average)kWh",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Latin America (average)kWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Middle East (average)kWh",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (generation)Electricity: Non-OECD Europe and Eurasia (average)kWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: AustraliakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: AustriakWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: BelgiumkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: BrazilkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: BulgariakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: CanadakWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Chinese TaipeikWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: CroatiakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: CypruskWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Czech RepublickWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: DenmarkkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: EgyptkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: EstoniakWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: FinlandkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: FrancekWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: GermanykWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: GibraltarkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: GreecekWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Hong Kong, ChinakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: HungarykWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: IcelandkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: IndiakWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: IndonesiakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: IrelandkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: IsraelkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: ItalykWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: JapankWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: LatviakWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: LithuaniakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: LuxembourgkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: MalaysiakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: MaltakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: MexicokWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: NetherlandskWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: New ZealandkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: NorwaykWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: PakistankWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: People's Rep. of ChinakWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: PhilippineskWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: PolandkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: PortugalkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: RomaniakWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Russian FederationkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Saudi ArabiakWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: SingaporekWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Slovak RepublickWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: SloveniakWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: South AfricakWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: South KoreakWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: SpainkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: SwedenkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: SwitzerlandkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: ThailandkWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: TurkeykWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: UkrainekWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: United StateskWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Africa (average)kWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: EU (average)kWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Latin America (average)kWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Middle East (average)kWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- UK & overseas elecWTT- overseas electricity (T&D)Electricity: Non-OECD Europe and Eurasia (average)kWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- heat and steamWTT- heat and steamOnsite heat and steamkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- heat and steamWTT- heat and steamDistrict heat and steamkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- heat and steamWTT- district heat & steam distribution5% losskWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsDomestic, to\/from UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsDomestic, to\/from UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsShort-haul, to\/from UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsShort-haul, to\/from UKEconomy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsShort-haul, to\/from UKBusiness classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsShort-haul, to\/from UKBusiness classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsShort-haul, to\/from UKEconomy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsShort-haul, to\/from UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKEconomy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKPremium economy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKFirst classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKBusiness classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKBusiness classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKFirst classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKPremium economy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKEconomy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsLong-haul, to\/from UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKEconomy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKFirst classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKPremium economy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKBusiness classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKBusiness classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKPremium economy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKFirst classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKEconomy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- airWTT- flightsInternational, to\/from non-UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- seaWTT- ferryFoot passengerpassenger.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- seaWTT- ferryCar passengerpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- business travel- seaWTT- ferryAverage (all passenger)passenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniDieselkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniDieselmiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniPetrolkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniPetrolmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniUnknownkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniUnknownmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MiniBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiDieselkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiDieselmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiPetrolkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiPetrolmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiUnknownkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiUnknownmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SuperminiBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Lower mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Upper mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutiveDieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutiveDieselmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutivePetrolkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutivePetrolmiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutiveUnknownkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutiveUnknownmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutiveBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)ExecutiveBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryDieselkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryDieselmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryPetrolkm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryPetrolmiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryUnknownkm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryUnknownmiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)LuxuryBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsDieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsDieselmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsPetrolkm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsPetrolmiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsUnknownkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsUnknownmiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)SportsBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Dieselkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Dieselmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Petrolkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Petrolmiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Unknownkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Unknownmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)Dual purpose 4X4Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVDieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVDieselmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVPetrolkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVPetrolmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVUnknownkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVUnknownmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by market segment)MPVBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carDieselkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carDieselmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carPetrolkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carHybridkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carHybridmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carCNGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carCNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carLPGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carLPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carUnknownkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Small carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carDieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carDieselmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carPetrolkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carHybridkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carHybridmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carCNGkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carCNGmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carLPGkm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carLPGmiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carUnknownkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Medium carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carDieselkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carDieselmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carPetrolkm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carHybridkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carHybridmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carCNGkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carCNGmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carLPGkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carLPGmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carUnknownkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Large carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carDieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carDieselmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carPetrolkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carHybridkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carHybridmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carCNGkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carCNGmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carLPGkm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carLPGmiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carUnknownkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- cars (by size)Average carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeSmallkm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeSmallmiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeMediumkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeMediummiles",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeLargekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeLargemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeAveragekm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- motorbikeAveragemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- taxisRegular taxikm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- taxisRegular taxipassenger.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- taxisBlack cabkm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- taxisBlack cabpassenger.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- busLocal bus (not London)passenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- busLocal London buspassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- busAverage local buspassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- busCoachpassenger.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- railNational railpassenger.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- railInternational railpassenger.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- railLight rail and trampassenger.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- pass vehs & travel- landWTT- railLondon Undergroundpassenger.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)CNGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)LPGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Unknowntonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass I (up to 1.305 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)CNGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)LPGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Unknowntonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)CNGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)LPGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Unknowntonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)CNGkm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)CNGmiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)CNGtonne.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)LPGkm",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)LPGmiles",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)LPGtonne.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Unknownkm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Unknownmiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Unknowntonne.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- vansAverage (up to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Rigid (>17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigids100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigidsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All rigidsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>3.5 - 33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)Articulated (>33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All artics100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All articsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All articsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVs100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV (all diesel)All HGVsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigids100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigidsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All rigidsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)Articulated (>33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All artics100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All articsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All articsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVs100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- HGV refrigerated (all diesel)All HGVsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsDomestic, to\/from UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsDomestic, to\/from UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsShort-haul, to\/from UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsShort-haul, to\/from UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsLong-haul, to\/from UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsLong-haul, to\/from UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsInternational, to\/from non-UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- freight flightsInternational, to\/from non-UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- railFreight traintonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tanker200,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tanker120,000–199,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tanker80,000–119,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tanker60,000–79,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tanker10,000–59,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tanker0–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerCrude tankerAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerProducts tanker 60,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerProducts tanker 20,000–59,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerProducts tanker 10,000–19,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerProducts tanker 5000–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerProducts tanker 0–4999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerProducts tanker Averagetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerChemical tanker 20,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerChemical tanker 10,000–19,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerChemical tanker 5000–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerChemical tanker 0–4999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerChemical tanker Averagetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerLNG tanker200,000+ m3tonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerLNG tanker0–199,999 m3tonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerLNG tankerAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerLPG tanker50,000+ m3tonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerLPG tanker0–49,999 m3tonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- sea tankerLPG tankerAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargo10,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargo5000–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargo0–4999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargo10,000+ dwt 100+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargo5000–9999 dwt 100+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargo0–4999 dwt 100+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipGeneral cargoAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipRefrigerated cargo All dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipVehicle transport4000+ CEUtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipVehicle transport0–3999 CEUtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipVehicle transportAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipRoRo-Ferry2000+ LMtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipRoRo-Ferry0–1999 LMtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipRoRo-FerryAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipLarge RoPax ferryAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer ship8000+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer ship5000–7999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer ship3000–4999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer ship2000–2999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer ship1000–1999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer ship0–999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipContainer shipAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrier200,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrier100,000–199,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrier60,000–99,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrier35,000–59,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrier10,000–34,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrier0–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- delivery vehs & freightWTT- cargo shipBulk carrierAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBioethanolGJ",
                 "GHG Conversion Factor 2021": 25.61
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBioethanolkg",
                 "GHG Conversion Factor 2021": 0.69
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBioethanollitres",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel MEGJ",
                 "GHG Conversion Factor 2021": 12.66
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel MEkg",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel MElitres",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiomethaneGJ",
                 "GHG Conversion Factor 2021": 17.45
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiomethanekg",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiomethanelitres"
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel ME (from used cooking oil)GJ",
                 "GHG Conversion Factor 2021": 10.54
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel ME (from used cooking oil)kg",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel ME (from used cooking oil)litres",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel ME (from tallow)GJ",
                 "GHG Conversion Factor 2021": 13.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel ME (from tallow)kg",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel ME (from tallow)litres",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel HVOGJ",
                 "GHG Conversion Factor 2021": 6.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel HVOkg",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiodiesel HVOlitres",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiopropaneGJ",
                 "GHG Conversion Factor 2021": 12.17
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiopropanekg",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBiopropanelitres",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBio PetrolGJ",
                 "GHG Conversion Factor 2021": 9
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBio Petrolkg",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelBio Petrollitres",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelRenewable PetrolGJ",
                 "GHG Conversion Factor 2021": 24.27
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelRenewable Petrolkg",
                 "GHG Conversion Factor 2021": 0.67
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biofuelRenewable Petrollitres",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassWood logskWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassWood logstonnes",
                 "GHG Conversion Factor 2021": 52.14
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassWood chipskWh",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassWood chipstonnes",
                 "GHG Conversion Factor 2021": 30.4
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassWood pelletskWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassWood pelletstonnes",
                 "GHG Conversion Factor 2021": 177
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassGrass\/strawkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biomassGrass\/strawtonnes",
                 "GHG Conversion Factor 2021": 68.65
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biogasBiogaskWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biogasBiogastonnes",
                 "GHG Conversion Factor 2021": 133.61
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biogasLandfill gaskWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 3WTT- bioenergyWTT- biogasLandfill gastonnes",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsDomestic, to\/from UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsDomestic, to\/from UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsShort-haul, to\/from UKBusiness classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsShort-haul, to\/from UKEconomy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsShort-haul, to\/from UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsShort-haul, to\/from UKBusiness classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsShort-haul, to\/from UKEconomy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsShort-haul, to\/from UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKEconomy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKPremium economy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKBusiness classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKFirst classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKEconomy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKPremium economy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKBusiness classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsLong-haul, to\/from UKFirst classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKAverage passengerWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKEconomy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKPremium economy classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKBusiness classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKFirst classWith RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKAverage passengerWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKEconomy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKPremium economy classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKBusiness classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Business travel- airFlightsInternational, to\/from non-UKFirst classWithout RFpassenger.km",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3Business travel- seaFerryFoot passengerpassenger.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Business travel- seaFerryCar passengerpassenger.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Business travel- seaFerryAverage (all passenger)passenger.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniDieselkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniDieselmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniPetrolkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniPetrolmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniUnknownkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniUnknownmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MiniBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiDieselkm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiDieselmiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiPetrolkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiPetrolmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiUnknownkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiUnknownmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SuperminiBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Lower mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Upper mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutiveDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutiveDieselmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutivePetrolkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutivePetrolmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutiveUnknownkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutiveUnknownmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutiveBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)ExecutiveBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryDieselkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryDieselmiles",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryPetrolkm",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryPetrolmiles",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryUnknownkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryUnknownmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)LuxuryBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsPetrolkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsPetrolmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsUnknownkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsUnknownmiles",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)SportsBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Dieselkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Dieselmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Petrolkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Petrolmiles",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Unknownkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Unknownmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)Dual purpose 4X4Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVDieselkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVDieselmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVPetrolkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVPetrolmiles",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVUnknownkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVUnknownmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by market segment)MPVBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carDieselkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carDieselmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carPetrolkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carHybridkm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carHybridmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carCNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carCNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carLPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carLPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carUnknownkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Small carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carDieselkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carPetrolkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carHybridkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carHybridmiles",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carCNGkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carCNGmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carLPGkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carLPGmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carUnknownkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Medium carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carDieselkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carDieselmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carPetrolkm",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carHybridkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carHybridmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carCNGkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carCNGmiles",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carLPGkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carLPGmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carUnknownkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Large carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carPetrolkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carHybridkm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carHybridmiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carCNGkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carCNGmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carLPGkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carLPGmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carUnknownkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landCars (by size)Average carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeSmallkm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeSmallMotorbikemiles",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeMediumkm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeMediumMotorbikemiles",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeLargekm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeLargeMotorbikemiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeAveragekm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landMotorbikeAverageMotorbikemiles",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landTaxisRegular taxikm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landTaxisRegular taxipassenger.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landTaxisBlack cabkm",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landTaxisBlack cabpassenger.km",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landBusLocal bus (not London)passenger.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landBusLocal London buspassenger.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landBusAverage local buspassenger.km",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landBusCoachpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landRailNational railpassenger.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landRailInternational railpassenger.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landRailLight rail and trampassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Business travel- landRailLondon Undergroundpassenger.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- electricityUK electricity generated (managed assets)Electricity: UKkWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniDieselkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniDieselmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniPetrolkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniPetrolmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniUnknownkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniUnknownmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MiniBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiDieselkm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiDieselmiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiPetrolkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiPetrolmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiUnknownkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiUnknownmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SuperminiBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Lower mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumDieselkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumDieselmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumPetrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumPetrolmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumUnknownkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumUnknownmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Upper mediumBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutiveDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutiveDieselmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutivePetrolkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutivePetrolmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutiveUnknownkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutiveUnknownmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutivePlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutiveBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)ExecutiveBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryDieselkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryDieselmiles",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryPetrolkm",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryPetrolmiles",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryUnknownkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryUnknownmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)LuxuryBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsPetrolkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsPetrolmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsUnknownkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsUnknownmiles",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)SportsBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Dieselkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Dieselmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Petrolkm",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Petrolmiles",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Unknownkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Unknownmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)Dual purpose 4X4Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVDieselkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVDieselmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVPetrolkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVPetrolmiles",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVUnknownkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVUnknownmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVPlug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVPlug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by market segment)MPVBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small carDieselkm",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Dieselmiles",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Petrolkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Petrolmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Hybridkm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Hybridmiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Unknownkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Unknownmiles",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Plug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Plug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Small car0Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium car0Dieselkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium car0Dieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carPetrolkm",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carHybridkm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carHybridmiles",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carCNGkm",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carCNGmiles",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carLPGkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carLPGmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carUnknownkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Medium carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carDieselkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carDieselmiles",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carPetrolkm",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carHybridkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carHybridmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carCNGkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carCNGmiles",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carLPGkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carLPGmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carUnknownkm",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Large carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carDieselkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carDieselmiles",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carPetrolkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carPetrolmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carHybridkm",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carHybridmiles",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carCNGkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carCNGmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carLPGkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carLPGmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carUnknownkm",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carUnknownmiles",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carPlug-in Hybrid Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carPlug-in Hybrid Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carBattery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged cars (by size)Average carBattery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass I (up to 1.305 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)CNGkm",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)LPGkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)Unknownkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged vansAverage (up to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.69
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.8
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.78
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.92
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.83
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.57
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.64
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.73
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.82
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 1.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.31
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 1.14
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.94
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.09
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.9
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.89
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 1.06
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 1.05
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.97
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.17
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged HGV refrigerated (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 1.01
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesSmallkm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesSmallmiles",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesMediumkm",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesMediummiles",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesLargekm",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesLargemiles",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesAveragekm",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Managed assets- vehiclesManaged motorbikesAveragemiles",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.81
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)CNGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)LPGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Unknowntonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass I (up to 1.305 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)CNGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)LPGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Unknowntonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass II (1.305 to 1.74 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.78
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)CNGkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)CNGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)CNGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)LPGkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)LPGmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)LPGtonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Unknownkm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Unknownmiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Unknowntonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansClass III (1.74 to 3.5 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Dieselkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Dieselmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Dieseltonne.km",
                 "GHG Conversion Factor 2021": 0.6
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Petrolkm",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Petrolmiles",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Petroltonne.km",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)CNGkm",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)CNGmiles",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)CNGtonne.km",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)LPGkm",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)LPGmiles",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)LPGtonne.km",
                 "GHG Conversion Factor 2021": 0.68
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Unknownkm",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Unknownmiles",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Unknowntonne.km",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclekm"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehiclemiles"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Plug-in Hybrid Electric Vehicletonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Battery Electric Vehiclekm",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Battery Electric Vehiclemiles",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsVansAverage (up to 3.5 tonnes)Battery Electric Vehicletonne.km",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.78
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.84
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.98
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.69
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.94
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.5
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.77
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.54
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Rigid (>17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.27
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigids100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.8
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigidsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.29
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All rigidsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.78
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.25
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.49
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>3.5 - 33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.39
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.73
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.92
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)Articulated (>33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.04
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.38
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.72
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All artics100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All articsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All articsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.83
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.33
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.61
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVs100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.86
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.39
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV (all diesel)All HGVsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.85
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 0.93
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.57
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 0.92
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>3.5 - 7.5 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.64
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.73
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.17
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 0.82
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.32
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.12
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>7.5 tonnes-17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.91
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.47
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenkm",
                 "GHG Conversion Factor 2021": 1.11
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.79
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.31
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 2.1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladenkm",
                 "GHG Conversion Factor 2021": 1.14
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.83
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Rigid (>17 tonnes)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.27
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.94
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.51
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.75
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigids100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigidsAverage ladenkm",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigidsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.54
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All rigidsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.16
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.9
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.44
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.73
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 0.89
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.43
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>3.5 - 33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.21
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)50% Ladenkm",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.6
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)100% Ladenmiles",
                 "GHG Conversion Factor 2021": 2
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)Average ladenkm",
                 "GHG Conversion Factor 2021": 1.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)Average ladenmiles",
                 "GHG Conversion Factor 2021": 1.71
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)Articulated (>33t)Average ladentonne.km",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.21
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.6
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.99
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All artics100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All articsAverage ladenkm",
                 "GHG Conversion Factor 2021": 1.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All articsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.69
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All articsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs0% Ladenkm",
                 "GHG Conversion Factor 2021": 0.77
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs0% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.23
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs0% Ladentonne.km"
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs50% Ladenkm",
                 "GHG Conversion Factor 2021": 0.97
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs50% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.56
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs50% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs100% Ladenkm",
                 "GHG Conversion Factor 2021": 1.17
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs100% Ladenmiles",
                 "GHG Conversion Factor 2021": 1.89
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVs100% Ladentonne.km",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVsAverage ladenkm",
                 "GHG Conversion Factor 2021": 1.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVsAverage ladenmiles",
                 "GHG Conversion Factor 2021": 1.63
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsHGV refrigerated (all diesel)All HGVsAverage ladentonne.km",
                 "GHG Conversion Factor 2021": 0.13
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsDomestic, to\/from UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 4.49
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsDomestic, to\/from UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 2.38
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsShort-haul, to\/from UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 2.3
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsShort-haul, to\/from UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 1.22
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsLong-haul, to\/from UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 1.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsLong-haul, to\/from UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsInternational, to\/from non-UKWith RFtonne.km",
                 "GHG Conversion Factor 2021": 1.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsFreight flightsInternational, to\/from non-UKWithout RFtonne.km",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsRailFreight traintonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tanker200,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tanker120,000–199,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tanker80,000–119,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tanker60,000–79,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tanker10,000–59,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tanker0–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerCrude tankerAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerProducts tanker 60,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerProducts tanker 20,000–59,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerProducts tanker 10,000–19,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerProducts tanker 5000–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerProducts tanker 0–4999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerProducts tanker Averagetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerChemical tanker 20,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerChemical tanker 10,000–19,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerChemical tanker 5000–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerChemical tanker 0–4999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerChemical tanker Averagetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerLNG tanker200,000+ m3tonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerLNG tanker0–199,999 m3tonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerLNG tankerAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerLPG Tanker50,000+ m3tonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerLPG Tanker0–49,999 m3tonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsSea tankerLPG TankerAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrier200,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrier100,000–199,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrier60,000–99,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrier35,000–59,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrier10,000–34,999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrier0–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipBulk carrierAveragetonne.km",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargo10,000+ dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargo5000–9999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargo0–4999 dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargo10,000+ dwt 100+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargo5000–9999 dwt 100+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargo0–4999 dwt 100+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipGeneral cargoAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer ship8000+ TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer ship5000–7999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer ship3000–4999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer ship2000–2999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer ship1000–1999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer ship0–999 TEUtonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipContainer shipAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipVehicle transport4000+ CEUtonne.km",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipVehicle transport0–3999 CEUtonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipVehicle transportAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipRoRo-Ferry2000+ LMtonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipRoRo-Ferry0–1999 LMtonne.km",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipRoRo-FerryAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipLarge RoPax ferryAveragetonne.km",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 3Freighting goodsCargo shipRefrigerated cargo All dwttonne.km",
                 "GHG Conversion Factor 2021": 0.01
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAggregatesRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAggregatesOpen-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAggregatesClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAggregatesCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAggregatesCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAggregatesLandfilltonnes",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAverage constructionRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAverage constructionOpen-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAverage constructionClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAverage constructionCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAverage constructionCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAverage constructionLandfilltonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsbestosRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsbestosOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsbestosClosed-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsbestosCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsbestosCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsbestosLandfilltonnes",
                 "GHG Conversion Factor 2021": 5.92
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsphaltRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsphaltOpen-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsphaltClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsphaltCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsphaltCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionAsphaltLandfilltonnes",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionBricksRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionBricksOpen-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionBricksClosed-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionBricksCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionBricksCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionBricksLandfilltonnes",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionConcreteRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionConcreteOpen-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionConcreteClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionConcreteCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionConcreteCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionConcreteLandfilltonnes",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionInsulationRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionInsulationOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionInsulationClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionInsulationCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionInsulationCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionInsulationLandfilltonnes",
                 "GHG Conversion Factor 2021": 1.24
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMetalsRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMetalsOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMetalsClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMetalsCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMetalsCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMetalsLandfilltonnes",
                 "GHG Conversion Factor 2021": 1.26
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionSoilsRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionSoilsOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionSoilsClosed-looptonnes",
                 "GHG Conversion Factor 2021": 0.99
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionSoilsCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionSoilsCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionSoilsLandfilltonnes",
                 "GHG Conversion Factor 2021": 17.58
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMineral oilRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMineral oilOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMineral oilClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMineral oilCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMineral oilCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionMineral oilLandfilltonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionPlasterboardRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionPlasterboardOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionPlasterboardClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionPlasterboardCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionPlasterboardCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionPlasterboardLandfilltonnes",
                 "GHG Conversion Factor 2021": 71.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionTyresRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionTyresOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionTyresClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionTyresCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionTyresCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionTyresLandfilltonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionWoodRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionWoodOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionWoodClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionWoodCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionWoodCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalConstructionWoodLandfilltonnes",
                 "GHG Conversion Factor 2021": 828.03
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherBooksRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherBooksOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherBooksClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherBooksCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherBooksCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherBooksLandfilltonnes",
                 "GHG Conversion Factor 2021": 1041.8
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherGlassRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherGlassOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherGlassClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherGlassCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherGlassCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherGlassLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherClothingRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherClothingOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherClothingClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherClothingCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherClothingCompostingtonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalOtherClothingLandfilltonnes",
                 "GHG Conversion Factor 2021": 444.94
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseHousehold residual wasteOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseHousehold residual wasteClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseHousehold residual wasteCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseHousehold residual wasteAnaerobic digestiontonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseHousehold residual wasteCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseHousehold residual wasteLandfilltonnes",
                 "GHG Conversion Factor 2021": 446.24
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: food and drink wasteOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: food and drink wasteClosed-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: food and drink wasteCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: food and drink wasteAnaerobic digestiontonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: food and drink wasteCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: food and drink wasteLandfilltonnes",
                 "GHG Conversion Factor 2021": 626.87
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: garden wasteOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: garden wasteClosed-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: garden wasteCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: garden wasteAnaerobic digestiontonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: garden wasteCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: garden wasteLandfilltonnes",
                 "GHG Conversion Factor 2021": 578.96
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: mixed food and garden wasteOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: mixed food and garden wasteClosed-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: mixed food and garden wasteCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: mixed food and garden wasteAnaerobic digestiontonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: mixed food and garden wasteCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseOrganic: mixed food and garden wasteLandfilltonnes",
                 "GHG Conversion Factor 2021": 587.34
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseCommercial and industrial wasteOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseCommercial and industrial wasteClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseCommercial and industrial wasteCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseCommercial and industrial wasteAnaerobic digestiontonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseCommercial and industrial wasteCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalRefuseCommercial and industrial wasteLandfilltonnes",
                 "GHG Conversion Factor 2021": 467.05
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - fridges and freezersRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - fridges and freezersOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - fridges and freezersCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - fridges and freezersLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - largeRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - largeOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - largeCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - largeLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - mixedRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - mixedOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - mixedCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - mixedLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - smallRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - smallOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - smallCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsWEEE - smallLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsBatteriesRe-usetonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsBatteriesOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsBatteriesCombustiontonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalElectrical itemsBatteriesLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: aluminium cans and foil (excl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: aluminium cans and foil (excl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: aluminium cans and foil (excl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: aluminium cans and foil (excl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: mixed cansOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: mixed cansClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: mixed cansCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: mixed cansLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: scrap metalOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: scrap metalClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: scrap metalCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: scrap metalLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: steel cansOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: steel cansClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: steel cansCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalMetalMetal: steel cansLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plasticsOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plasticsClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plasticsCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plasticsLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic filmOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic filmClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic filmCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic filmLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic rigidOpen-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic rigidClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic rigidCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: average plastic rigidLandfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: HDPE (incl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: HDPE (incl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: HDPE (incl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: HDPE (incl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: LDPE and LLDPE (incl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: LDPE and LLDPE (incl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: LDPE and LLDPE (incl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: LDPE and LLDPE (incl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PET (incl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PET (incl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PET (incl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PET (incl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PP (incl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PP (incl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PP (incl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PP (incl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PS (incl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PS (incl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PS (incl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PS (incl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PVC (incl. forming)Open-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PVC (incl. forming)Closed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PVC (incl. forming)Combustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPlasticPlastics: PVC (incl. forming)Landfilltonnes",
                 "GHG Conversion Factor 2021": 8.9
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: boardOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: boardClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: boardCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: boardCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: boardLandfilltonnes",
                 "GHG Conversion Factor 2021": 1041.8
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: mixedOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: mixedClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: mixedCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: mixedCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: mixedLandfilltonnes",
                 "GHG Conversion Factor 2021": 1041.8
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: paperOpen-looptonnes"
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: paperClosed-looptonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: paperCombustiontonnes",
                 "GHG Conversion Factor 2021": 21.29
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: paperCompostingtonnes",
                 "GHG Conversion Factor 2021": 8.95
                },
                {
                 "Lookup VALID": "Scope 3Waste disposalPaperPaper and board: paperLandfilltonnes",
                 "GHG Conversion Factor 2021": 1041.8
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayUKRoom per night",
                 "GHG Conversion Factor 2021": 13.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayUK (London)Room per night",
                 "GHG Conversion Factor 2021": 13.8
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayArgentinaRoom per night",
                 "GHG Conversion Factor 2021": 56
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayAustraliaRoom per night",
                 "GHG Conversion Factor 2021": 42.6
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayAustriaRoom per night",
                 "GHG Conversion Factor 2021": 13.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayBelgiumRoom per night",
                 "GHG Conversion Factor 2021": 10.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayBrazilRoom per night",
                 "GHG Conversion Factor 2021": 12.3
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayCanadaRoom per night",
                 "GHG Conversion Factor 2021": 16.1
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayChileRoom per night",
                 "GHG Conversion Factor 2021": 30.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayChinaRoom per night",
                 "GHG Conversion Factor 2021": 62.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayColombiaRoom per night",
                 "GHG Conversion Factor 2021": 13.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayCosta RicaRoom per night",
                 "GHG Conversion Factor 2021": 7.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayCzech RepublicRoom per night",
                 "GHG Conversion Factor 2021": 36.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayEgyptRoom per night",
                 "GHG Conversion Factor 2021": 56.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayFijiRoom per night",
                 "GHG Conversion Factor 2021": 47.8
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayFranceRoom per night",
                 "GHG Conversion Factor 2021": 6.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayGermanyRoom per night",
                 "GHG Conversion Factor 2021": 17
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayGreeceRoom per night",
                 "GHG Conversion Factor 2021": 43
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayHong Kong, ChinaRoom per night",
                 "GHG Conversion Factor 2021": 65.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayIndiaRoom per night",
                 "GHG Conversion Factor 2021": 75.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayIndonesiaRoom per night",
                 "GHG Conversion Factor 2021": 89.1
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayIrelandRoom per night",
                 "GHG Conversion Factor 2021": 25
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayIsraelRoom per night",
                 "GHG Conversion Factor 2021": 54
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayItalyRoom per night",
                 "GHG Conversion Factor 2021": 20.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayJapanRoom per night",
                 "GHG Conversion Factor 2021": 60.6
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayJordanRoom per night",
                 "GHG Conversion Factor 2021": 62.4
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayKoreaRoom per night",
                 "GHG Conversion Factor 2021": 61.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayMacau, ChinaRoom per night",
                 "GHG Conversion Factor 2021": 75.6
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayMalaysiaRoom per night",
                 "GHG Conversion Factor 2021": 83
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayMexicoRoom per night",
                 "GHG Conversion Factor 2021": 25.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayNetherlandsRoom per night",
                 "GHG Conversion Factor 2021": 20.9
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayNew ZealandRoom per night",
                 "GHG Conversion Factor 2021": 10.4
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayPanamaRoom per night",
                 "GHG Conversion Factor 2021": 22.1
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayPeruRoom per night",
                 "GHG Conversion Factor 2021": 22.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayPhilippinesRoom per night",
                 "GHG Conversion Factor 2021": 44.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayPolandRoom per night",
                 "GHG Conversion Factor 2021": 33.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayPortugalRoom per night",
                 "GHG Conversion Factor 2021": 26
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayQatarRoom per night",
                 "GHG Conversion Factor 2021": 126.8
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayRussian FederationRoom per night",
                 "GHG Conversion Factor 2021": 31.8
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel staySaudi ArabiaRoom per night",
                 "GHG Conversion Factor 2021": 114.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel staySingaporeRoom per night",
                 "GHG Conversion Factor 2021": 37.8
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel staySlovak RepublicRoom per night",
                 "GHG Conversion Factor 2021": 19.1
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel staySouth AfricaRoom per night",
                 "GHG Conversion Factor 2021": 61
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel staySpainRoom per night",
                 "GHG Conversion Factor 2021": 18.7
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel staySwitzerlandRoom per night",
                 "GHG Conversion Factor 2021": 7.4
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayTaiwan, ChinaRoom per night",
                 "GHG Conversion Factor 2021": 77.3
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayThailandRoom per night",
                 "GHG Conversion Factor 2021": 51
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayTurkeyRoom per night",
                 "GHG Conversion Factor 2021": 33.6
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayUnited Arab EmiratesRoom per night",
                 "GHG Conversion Factor 2021": 114.4
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayUnited StatesRoom per night",
                 "GHG Conversion Factor 2021": 19.7
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayVietnamRoom per night",
                 "GHG Conversion Factor 2021": 51.8
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gas (100% mineral blend)kWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gas (100% mineral blend)kWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gas (100% mineral blend)cubic metres",
                 "GHG Conversion Factor 2021": 2.03
                },
                {
                 "Lookup VALID": "Scope 1FuelsGaseous fuelsNatural gas (100% mineral blend)tonnes",
                 "GHG Conversion Factor 2021": 2555.28
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural gas (100% mineral blend)Energy - Gross CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural gas (100% mineral blend)Energy - Net CVkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural gas (100% mineral blend)cubic metres",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 3WTT- fuelsWTT- gaseous fuelsNatural gas (100% mineral blend)Tonnestonnes",
                 "GHG Conversion Factor 2021": 434.43
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayFinlandRoom per night"
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayMaldivesRoom per night",
                 "GHG Conversion Factor 2021": 183.3
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayOmanRoom per night"
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHotel stayRomaniaRoom per night",
                 "GHG Conversion Factor 2021": 25.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayArgentina",
                 "GHG Conversion Factor 2021": 77.08
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayAustralia",
                 "GHG Conversion Factor 2021": 51.47
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayAustria",
                 "GHG Conversion Factor 2021": 18.73
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayBelgium",
                 "GHG Conversion Factor 2021": 16.04
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayBrazil",
                 "GHG Conversion Factor 2021": 16.77
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayCanada",
                 "GHG Conversion Factor 2021": 23
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayChile",
                 "GHG Conversion Factor 2021": 38.5
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayChina",
                 "GHG Conversion Factor 2021": 76.74
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayColombia",
                 "GHG Conversion Factor 2021": 18.69
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayCosta Rica",
                 "GHG Conversion Factor 2021": 11.1
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayCzech Republic",
                 "GHG Conversion Factor 2021": 53.04
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayEgypt",
                 "GHG Conversion Factor 2021": 65.38
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayFiji",
                 "GHG Conversion Factor 2021": 48.99
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayFrance",
                 "GHG Conversion Factor 2021": 8.01
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayGermany",
                 "GHG Conversion Factor 2021": 22.57
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayGreece",
                 "GHG Conversion Factor 2021": 56.63
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayHong Kong, China",
                 "GHG Conversion Factor 2021": 84.43
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayIndia",
                 "GHG Conversion Factor 2021": 93.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayIndonesia",
                 "GHG Conversion Factor 2021": 110.37
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayIreland",
                 "GHG Conversion Factor 2021": 31.78
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayIsrael",
                 "GHG Conversion Factor 2021": 72.6
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayItaly",
                 "GHG Conversion Factor 2021": 26.2
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayJapan",
                 "GHG Conversion Factor 2021": 81.86
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayJordan",
                 "GHG Conversion Factor 2021": 80.48
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayKorea",
                 "GHG Conversion Factor 2021": 85.19
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayMacau, China",
                 "GHG Conversion Factor 2021": 109.01
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayMalaysia",
                 "GHG Conversion Factor 2021": 95.94
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayMaldives",
                 "GHG Conversion Factor 2021": 218.68
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayMexico",
                 "GHG Conversion Factor 2021": 30.52
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayNetherlands",
                 "GHG Conversion Factor 2021": 23.78
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayNew Zealand",
                 "GHG Conversion Factor 2021": 11.57
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayPanama",
                 "GHG Conversion Factor 2021": 31.72
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayPeru",
                 "GHG Conversion Factor 2021": 28.65
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayPhilippines",
                 "GHG Conversion Factor 2021": 66.54
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayPoland",
                 "GHG Conversion Factor 2021": 39.12
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayPortugal",
                 "GHG Conversion Factor 2021": 36.47
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayQatar",
                 "GHG Conversion Factor 2021": 165.18
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayRomania",
                 "GHG Conversion Factor 2021": 34.16
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayRussian Federation",
                 "GHG Conversion Factor 2021": 37.98
                },
                {
                 "Lookup VALID": "Scope 3Hotel staySaudi Arabia",
                 "GHG Conversion Factor 2021": 156.64
                },
                {
                 "Lookup VALID": "Scope 3Hotel staySingapore",
                 "GHG Conversion Factor 2021": 51.33
                },
                {
                 "Lookup VALID": "Scope 3Hotel staySlovak Republic",
                 "GHG Conversion Factor 2021": 21.34
                },
                {
                 "Lookup VALID": "Scope 3Hotel staySouth Africa",
                 "GHG Conversion Factor 2021": 82.36
                },
                {
                 "Lookup VALID": "Scope 3Hotel staySpain",
                 "GHG Conversion Factor 2021": 20.07
                },
                {
                 "Lookup VALID": "Scope 3Hotel staySwitzerland",
                 "GHG Conversion Factor 2021": 10.75
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayTaiwan, China",
                 "GHG Conversion Factor 2021": 117.82
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayThailand",
                 "GHG Conversion Factor 2021": 59.05
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayTurkey",
                 "GHG Conversion Factor 2021": 41.77
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayUnited Arab Emirates",
                 "GHG Conversion Factor 2021": 145.46
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayUnited Kingdom",
                 "GHG Conversion Factor 2021": 18.41
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayUnited States",
                 "GHG Conversion Factor 2021": 23.04
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayVietnam",
                 "GHG Conversion Factor 2021": 60.12
                },
                {
                 "Lookup VALID": "Scope 3Hotel stayOther",
                 "GHG Conversion Factor 2021": 57.81
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChoose a country from the listkWh"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAfghanistankWh",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAlbaniakWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAlgeriakWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAmerican SamoakWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAndorrakWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAngolakWh",
                 "GHG Conversion Factor 2021": 0.75
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAnguillakWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAntigua and BarbudakWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityArgentinakWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 2ElectricityArmeniakWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityArubakWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAustraliakWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAustriakWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAzerbaijankWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBahamaskWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBahrainkWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBangladeshkWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBarbadoskWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBelaruskWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBelgiumkWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBelizekWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBeninkWh",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBermudakWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBhutankWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBolivia (Plurinational State of)kWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBonaire, Sint Eustatius and SabakWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBosnia and HerzegovinakWh",
                 "GHG Conversion Factor 2021": 0.74
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBotswanakWh",
                 "GHG Conversion Factor 2021": 1.07
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBrazilkWh",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBritish Virgin IslandskWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBrunei DarussalamkWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBulgariakWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBurkina FasokWh",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBurundikWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCambodiakWh",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCameroonkWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCanadakWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCanary Islands (Spain)kWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCabo VerdekWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCayman IslandskWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCentral African RepublickWh",
                 "GHG Conversion Factor 2021": 0.08
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChadkWh",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChannel Islands (U.K)kWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChilekWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChinakWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityColombiakWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2ElectricityComoroskWh",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDemocratic Republic of the CongokWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCongokWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCook IslandskWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCosta RicakWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCôte d’IvoirekWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCroatiakWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCubakWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCuraçaokWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCypruskWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCzechiakWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDenmarkkWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDjiboutikWh",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDominicakWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDominican RepublickWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEcuadorkWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEgyptkWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEl SalvadorkWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEquatorial GuineakWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEritreakWh",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEstoniakWh",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEswatinikWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEthiopiakWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFalkland Islands (Malvinas)kWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFaroe IslandskWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFijikWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFinlandkWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFrancekWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFrench GuianakWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFrench PolynesiakWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGabonkWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGambiakWh",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGeorgiakWh",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGermanykWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGhanakWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGibraltarkWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGreecekWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGreenlandkWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGrenadakWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuadeloupekWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuamkWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuatemalakWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuineakWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuinea-BissaukWh",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuyanakWh",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 2ElectricityHaitikWh",
                 "GHG Conversion Factor 2021": 0.76
                },
                {
                 "Lookup VALID": "Scope 2ElectricityHonduraskWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityHungarykWh",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIcelandkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIndiakWh",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIndonesiakWh",
                 "GHG Conversion Factor 2021": 0.67
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIran (Islamic Republic of)kWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIraqkWh",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIrelandkWh",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIsle of MankWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIsraelkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 2ElectricityItalykWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 2ElectricityJamaicakWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityJapankWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityJordankWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKazakhstankWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKenyakWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKiribatikWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDemocratic People's Republic of KoreakWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRepublic of KoreakWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKosovokWh",
                 "GHG Conversion Factor 2021": 0.84
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKuwaitkWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKyrgyzstankWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLao People's Democratic RepublickWh",
                 "GHG Conversion Factor 2021": 0.55
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLatviakWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLebanonkWh",
                 "GHG Conversion Factor 2021": 0.57
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLesothokWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLiberiakWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLibyakWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLiechtensteinkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLithuaniakWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLuxembourgkWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMadagascarkWh",
                 "GHG Conversion Factor 2021": 0.57
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMadeira (Portugal)kWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMalawikWh",
                 "GHG Conversion Factor 2021": 0.24
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMalaysiakWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMaldiveskWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMalikWh",
                 "GHG Conversion Factor 2021": 0.62
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMaltakWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMarshall IslandskWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMartiniquekWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMauritaniakWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMauritiuskWh",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMayottekWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMexicokWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMicronesia (Federated States of)kWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRepublic of MoldovakWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMonacokWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMongoliakWh",
                 "GHG Conversion Factor 2021": 1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMontenegrokWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMontserratkWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMoroccokWh",
                 "GHG Conversion Factor 2021": 0.55
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMozambiquekWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMyanmarkWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNamibiakWh",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNaurukWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNepalkWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNetherlandskWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNew CaledoniakWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNew ZealandkWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNicaraguakWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNigerkWh",
                 "GHG Conversion Factor 2021": 0.72
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNigeriakWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNiuekWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNorth MacedoniakWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNorthern Mariana IslandskWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNorwaykWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2ElectricityOmankWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPakistankWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPalaukWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityState of PalestinekWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPanamakWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPapua New GuineakWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityParaguaykWh",
                 "GHG Conversion Factor 2021": 0
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPerukWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPhilippineskWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPolandkWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPortugalkWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPuerto RicokWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityQatarkWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRéunionkWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRomaniakWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRussian FederationkWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRwandakWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint HelenakWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Kitts and NeviskWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint LuciakWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Martin (French Part)kWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Pierre and MiquelonkWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Vincent and the GrenadineskWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySamoakWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySan MarinokWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySao Tome and PrincipekWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaudi ArabiakWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySenegalkWh",
                 "GHG Conversion Factor 2021": 0.66
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySerbiakWh",
                 "GHG Conversion Factor 2021": 0.68
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySeychelleskWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySierra LeonekWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySingaporekWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySint Maarten (Dutch part)kWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySlovakiakWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySloveniakWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySolomon IslandskWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySomaliakWh",
                 "GHG Conversion Factor 2021": 0.58
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySouth AfricakWh",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySouth SudankWh",
                 "GHG Conversion Factor 2021": 0.7
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySpainkWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySri LankakWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySudankWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySurinamekWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySwedenkWh",
                 "GHG Conversion Factor 2021": 0.03
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySwitzerlandkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySyrian Arab RepublickWh",
                 "GHG Conversion Factor 2021": 0.55
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTaiwan (Chinese Taipei)kWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTajikistankWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited Republic of TanzaniakWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityThailandkWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTimor-LestekWh",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTogokWh",
                 "GHG Conversion Factor 2021": 0.6
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTongakWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTrinidad and TobagokWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTunisiakWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTurkeykWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTurkmenistankWh",
                 "GHG Conversion Factor 2021": 0.68
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTurks and Caicos IslandskWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTuvalukWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUgandakWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUkrainekWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited Arab EmirateskWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited Kingdom of Great Britain and Northern IrelandkWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited States of AmericakWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUruguaykWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUzbekistankWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityVanuatukWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityVenezuela (Bolivarian Republic of)kWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityViet NamkWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited States Virgin IslandskWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityYemenkWh",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZambiakWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZimbabwekWh",
                 "GHG Conversion Factor 2021": 0.88
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZambiakWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZimbabwekWh",
                 "GHG Conversion Factor 2021": 0.88
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChoose a country from the listkWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAfghanistankWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAlbaniakWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAlgeriakWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAmerican SamoakWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAndorrakWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAngolakWh",
                 "GHG Conversion Factor 2021": 0.67
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAnguillakWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAntigua and BarbudakWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityArgentinakWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 2ElectricityArmeniakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityArubakWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAustraliakWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAustriakWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityAzerbaijankWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBahamaskWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBahrainkWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBangladeshkWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBarbadoskWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBelaruskWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBelgiumkWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBelizekWh",
                 "GHG Conversion Factor 2021": 0.16
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBeninkWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBermudakWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBhutankWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBolivia (Plurinational State of)kWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBonaire, Sint Eustatius and SabakWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBosnia and HerzegovinakWh",
                 "GHG Conversion Factor 2021": 0.67
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBotswanakWh",
                 "GHG Conversion Factor 2021": 0.96
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBrazilkWh",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBritish Virgin IslandskWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBrunei DarussalamkWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBulgariakWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBurkina FasokWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityBurundikWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCambodiakWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCameroonkWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCanadakWh",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCanary Islands (Spain)kWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCabo VerdekWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCayman IslandskWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCentral African RepublickWh",
                 "GHG Conversion Factor 2021": 0.07
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChadkWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChannel Islands (U.K)kWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChilekWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2ElectricityChinakWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityColombiakWh",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 2ElectricityComoroskWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDemocratic Republic of the CongokWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCongokWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCook IslandskWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCosta RicakWh",
                 "GHG Conversion Factor 2021": 0.04
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCôte d’IvoirekWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCroatiakWh",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCubakWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCuraçaokWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCypruskWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityCzechiakWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDenmarkkWh",
                 "GHG Conversion Factor 2021": 0.14
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDjiboutikWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDominicakWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDominican RepublickWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEcuadorkWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEgyptkWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEl SalvadorkWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEquatorial GuineakWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEritreakWh",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEstoniakWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEswatinikWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityEthiopiakWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFalkland Islands (Malvinas)kWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFaroe IslandskWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFijikWh",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFinlandkWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFrancekWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFrench GuianakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityFrench PolynesiakWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGabonkWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGambiakWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGeorgiakWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGermanykWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGhanakWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGibraltarkWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGreecekWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGreenlandkWh",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGrenadakWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuadeloupekWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuamkWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuatemalakWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuineakWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuinea-BissaukWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricityGuyanakWh",
                 "GHG Conversion Factor 2021": 0.55
                },
                {
                 "Lookup VALID": "Scope 2ElectricityHaitikWh",
                 "GHG Conversion Factor 2021": 0.69
                },
                {
                 "Lookup VALID": "Scope 2ElectricityHonduraskWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityHungarykWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIcelandkWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIndiakWh",
                 "GHG Conversion Factor 2021": 0.55
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIndonesiakWh",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIran (Islamic Republic of)kWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIraqkWh",
                 "GHG Conversion Factor 2021": 0.71
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIrelandkWh",
                 "GHG Conversion Factor 2021": 0.17
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIsle of MankWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityIsraelkWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2ElectricityItalykWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityJamaicakWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityJapankWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityJordankWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKazakhstankWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKenyakWh",
                 "GHG Conversion Factor 2021": 0.25
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKiribatikWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricityDemocratic People's Republic of KoreakWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRepublic of KoreakWh",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKosovokWh",
                 "GHG Conversion Factor 2021": 0.76
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKuwaitkWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityKyrgyzstankWh",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLao People's Democratic RepublickWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLatviakWh",
                 "GHG Conversion Factor 2021": 0.11
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLebanonkWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLesothokWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLiberiakWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLibyakWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLiechtensteinkWh",
                 "GHG Conversion Factor 2021": 0.05
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLithuaniakWh",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 2ElectricityLuxembourgkWh",
                 "GHG Conversion Factor 2021": 0.09
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMadagascarkWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMadeira (Portugal)kWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMalawikWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMalaysiakWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMaldiveskWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMalikWh",
                 "GHG Conversion Factor 2021": 0.56
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMaltakWh",
                 "GHG Conversion Factor 2021": 0.27
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMarshall IslandskWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMartiniquekWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMauritaniakWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMauritiuskWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMayottekWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMexicokWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMicronesia (Federated States of)kWh",
                 "GHG Conversion Factor 2021": 0.5
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRepublic of MoldovakWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMonacokWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMongoliakWh",
                 "GHG Conversion Factor 2021": 0.9
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMontenegrokWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMontserratkWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMoroccokWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMozambiquekWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityMyanmarkWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNamibiakWh",
                 "GHG Conversion Factor 2021": 0.12
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNaurukWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNepalkWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNetherlandskWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNew CaledoniakWh",
                 "GHG Conversion Factor 2021": 0.4
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNew ZealandkWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNicaraguakWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNigerkWh",
                 "GHG Conversion Factor 2021": 0.65
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNigeriakWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNiuekWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNorth MacedoniakWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNorthern Mariana IslandskWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricityNorwaykWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2ElectricityOmankWh",
                 "GHG Conversion Factor 2021": 0.29
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPakistankWh",
                 "GHG Conversion Factor 2021": 0.35
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPalaukWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityState of PalestinekWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPanamakWh",
                 "GHG Conversion Factor 2021": 0.21
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPapua New GuineakWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityParaguaykWh",
                 "GHG Conversion Factor 2021": "-"
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPerukWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPhilippineskWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPolandkWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPortugalkWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityPuerto RicokWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityQatarkWh",
                 "GHG Conversion Factor 2021": 0.23
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRéunionkWh",
                 "GHG Conversion Factor 2021": 0.38
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRomaniakWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRussian FederationkWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityRwandakWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint HelenakWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Kitts and NeviskWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint LuciakWh",
                 "GHG Conversion Factor 2021": 0.47
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Martin (French Part)kWh",
                 "GHG Conversion Factor 2021": 0.44
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Pierre and MiquelonkWh",
                 "GHG Conversion Factor 2021": 0.37
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaint Vincent and the GrenadineskWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySamoakWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySan MarinokWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySao Tome and PrincipekWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySaudi ArabiakWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySenegalkWh",
                 "GHG Conversion Factor 2021": 0.59
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySerbiakWh",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySeychelleskWh",
                 "GHG Conversion Factor 2021": 0.43
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySierra LeonekWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySingaporekWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySint Maarten (Dutch part)kWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySlovakiakWh",
                 "GHG Conversion Factor 2021": 0.15
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySloveniakWh",
                 "GHG Conversion Factor 2021": 0.26
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySolomon IslandskWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySomaliakWh",
                 "GHG Conversion Factor 2021": 0.52
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySouth AfricakWh",
                 "GHG Conversion Factor 2021": 0.71
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySouth SudankWh",
                 "GHG Conversion Factor 2021": 0.63
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySpainkWh",
                 "GHG Conversion Factor 2021": 0.19
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySri LankakWh",
                 "GHG Conversion Factor 2021": 0.46
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySudankWh",
                 "GHG Conversion Factor 2021": 0.36
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySurinamekWh",
                 "GHG Conversion Factor 2021": 0.51
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySwedenkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySwitzerlandkWh",
                 "GHG Conversion Factor 2021": 0.02
                },
                {
                 "Lookup VALID": "Scope 2ElectricitySyrian Arab RepublickWh",
                 "GHG Conversion Factor 2021": 0.49
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTaiwan (Chinese Taipei)kWh",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTajikistankWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited Republic of TanzaniakWh",
                 "GHG Conversion Factor 2021": 0.3
                },
                {
                 "Lookup VALID": "Scope 2ElectricityThailandkWh",
                 "GHG Conversion Factor 2021": 0.32
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTimor-LestekWh",
                 "GHG Conversion Factor 2021": 0.53
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTogokWh",
                 "GHG Conversion Factor 2021": 0.54
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTongakWh",
                 "GHG Conversion Factor 2021": 0.48
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTrinidad and TobagokWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTunisiakWh",
                 "GHG Conversion Factor 2021": 0.31
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTurkeykWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTurkmenistankWh",
                 "GHG Conversion Factor 2021": 0.61
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTurks and Caicos IslandskWh",
                 "GHG Conversion Factor 2021": 0.41
                },
                {
                 "Lookup VALID": "Scope 2ElectricityTuvalukWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUgandakWh",
                 "GHG Conversion Factor 2021": 0.1
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUkrainekWh",
                 "GHG Conversion Factor 2021": 0.39
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited Arab EmirateskWh",
                 "GHG Conversion Factor 2021": 0.28
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited Kingdom of Great Britain and Northern IrelandkWh",
                 "GHG Conversion Factor 2021": 0.2
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited States of AmericakWh",
                 "GHG Conversion Factor 2021": 0.22
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUruguaykWh",
                 "GHG Conversion Factor 2021": 0.06
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUzbekistankWh",
                 "GHG Conversion Factor 2021": 0.42
                },
                {
                 "Lookup VALID": "Scope 2ElectricityVanuatukWh",
                 "GHG Conversion Factor 2021": 0.45
                },
                {
                 "Lookup VALID": "Scope 2ElectricityVenezuela (Bolivarian Republic of)kWh",
                 "GHG Conversion Factor 2021": 0.33
                },
                {
                 "Lookup VALID": "Scope 2ElectricityViet NamkWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityUnited States Virgin IslandskWh",
                 "GHG Conversion Factor 2021": 0.34
                },
                {
                 "Lookup VALID": "Scope 2ElectricityYemenkWh",
                 "GHG Conversion Factor 2021": 0.55
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZambiakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZimbabwekWh",
                 "GHG Conversion Factor 2021": 0.79
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZambiakWh",
                 "GHG Conversion Factor 2021": 0.18
                },
                {
                 "Lookup VALID": "Scope 2ElectricityZimbabwekWh",
                 "GHG Conversion Factor 2021": 0.79
                }
               ];
            db.collection('Master Data').doc('Factors').set({
             factor: obj
            }).then(() => {
                sap.m.MessageToast.show("Factors Updated Successfully");
            }).catch(error => {
                sap.m.MessageToast.show("Error Creating Factors: " + error.message);
            });
        }

        
       
    });
});
