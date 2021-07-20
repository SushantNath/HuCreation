sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"com/sap/huCreationinboundHu/utilities/Formatter"
], function(Controller, History, UIComponent, Formatter) {

	"use strict";

	return Controller.extend("com.sap.huCreationinboundHu.controller.huCreation", {
		formatter: Formatter,

		onNavBack: function() {

			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("homePattern", true);

		},

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.huCreationinboundHu.view.huCreation
		 */
		getvalue: function() {

			var aFilterData = [];

			var shipToFilter = new sap.ui.model.Filter("Shiptoparty", sap.ui.model.FilterOperator.EQ, "");
			var soldToFilter = new sap.ui.model.Filter("Soldtoparty", sap.ui.model.FilterOperator.EQ, "");
			var extDelFilter = new sap.ui.model.Filter("Externaldelno", sap.ui.model.FilterOperator.EQ, "");

			var immInvFilter = new sap.ui.model.Filter("Imminvoicetype", sap.ui.model.FilterOperator.EQ, "ZF30");
			var salesOrgFilter = new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.EQ, "");
			var podStatusFilter = new sap.ui.model.Filter("Poddelstat", sap.ui.model.FilterOperator.EQ, "A");
			var dateFromGI = "1900-01-01";
			var dateToGI = "9999-12-31";
			var dateFromGIFilter = new sap.ui.model.Filter("Goodsissuedate", sap.ui.model.FilterOperator.GE, Formatter.formatterDateAllOrders(
				dateFromGI));

			var dateToGIFilter = new sap.ui.model.Filter("Goodsissuedate", sap.ui.model.FilterOperator.LE, Formatter.formatterDateAllOrders(
				dateToGI));
			var outboundDelFilterSingle = new sap.ui.model.Filter("DeliveryNo", sap.ui.model.FilterOperator.EQ, "");
			aFilterData.push(outboundDelFilterSingle);

			aFilterData.push(shipToFilter, soldToFilter, extDelFilter, immInvFilter, dateFromGIFilter, dateToGIFilter, salesOrgFilter,
				podStatusFilter);

			var oModel = this.getView().getModel("inboundModel");
			var that = this;
			sap.ui.core.BusyIndicator.hide();
			oModel.read("/DeliverySet", {

				success: function(oData, Response) {

					var inboundTableModel = new sap.ui.model.json.JSONModel(oData);
					that.getView().setModel(inboundTableModel, "inboundTableModel");
					that.getView().getModel("inboundTableModel").setProperty("/inboundTableSet", oData.results);

					sap.ui.core.BusyIndicator.hide();
					console.log("Inside extract button success", oData.results);
				},
				error: function(oData, Response, oError) {
					console.log("Inside extract butoon error");
					sap.ui.core.BusyIndicator.hide();
				},
				filters: aFilterData
			});

		},

		onPrintHus: function(oEvent) {

			var oTarget = this.getView(),
				sTargetId = oEvent.getSource().data("targetId");

			if (sTargetId) {
				oTarget = oTarget.byId(sTargetId);
			}

			if (oTarget) {
				var $domTarget = oTarget.$()[0],
					sTargetContent = $domTarget.innerHTML,
					sOriginalContent = document.body.innerHTML;

				document.body.innerHTML = sTargetContent;
				window.print();
				document.body.innerHTML = sOriginalContent;
			} else {
				jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
			}
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.huCreationinboundHu.view.huCreation
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.huCreationinboundHu.view.huCreation
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.huCreationinboundHu.view.huCreation
		 */
		//	onExit: function() {
		//
		//	}

	});

});