sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"com/sap/huCreationinboundHu/utilities/Formatter",
	"sap/ui/core/UIComponent"
	
], function(Controller, MessageBox, MessageToast, Formatter,UIComponent) {
	"use strict";

	return Controller.extend("com.sap.huCreationinboundHu.controller.homeView", {
		formatter: Formatter,
		onInit: function() {

		},

		onApplyFilter: function(e) {
			var inboundDelivery = this.getView().byId("inboundId").getValue();
			var asnNumber = this.getView().byId("asnNumberrId").getValue();
			var materialCode = this.getView().byId("materialCodeId").getValue();
			var batchNumber = this.getView().byId("batchNumberId").getValue();
			var huValue = this.getView().byId("huId").getSelected();

			if (inboundDelivery === "" && asnNumber === "") {

				MessageBox.error("Please enter either inbound delivery# or asn# to proceed");

			}

			var searchArray = [];
			var aFilterData = [];

			// 			var inboundDeliveryFilter = new sap.ui.model.Filter("Shiptoparty", sap.ui.model.FilterOperator.EQ, inboundDelivery);
			// 	var asnNumberFilter = new sap.ui.model.Filter("Soldtoparty", sap.ui.model.FilterOperator.EQ, asnNumber);
			// 	var materialCodeFilter = new sap.ui.model.Filter("Externaldelno", sap.ui.model.FilterOperator.EQ, materialCode);

			// 	var batchNumberFilter = new sap.ui.model.Filter("Imminvoicetype", sap.ui.model.FilterOperator.EQ, batchNumber);
			// 	var huValueFilter = new sap.ui.model.Filter("Salesorg", sap.ui.model.FilterOperator.EQ, huValue);
			// aFilterData.push(inboundDeliveryFilter, asnNumberFilter, materialCodeFilter, batchNumberFilter,huValueFilter);

			var shipToFilter = new sap.ui.model.Filter("Shiptoparty", sap.ui.model.FilterOperator.EQ, "");
			var soldToFilter = new sap.ui.model.Filter("Soldtoparty", sap.ui.model.FilterOperator.EQ, asnNumber);
			var extDelFilter = new sap.ui.model.Filter("Externaldelno", sap.ui.model.FilterOperator.EQ, materialCode);

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

		onCreateHus: function(e) {

			var selectedArray = [];
			var invTableLength = this.getView().byId("idInboundsTable").getSelectedItems();

			if (invTableLength.length > 0) {
				console.log("table length > 0");
				var message1 = "Do you want to proceed with creation of HUs?";

				MessageBox.show(message1, {
					title: "Message",

					actions: [MessageBox.Action.YES, MessageBox.Action.NO],

					onClose: function(sAction) {
						MessageToast.show("Action selected: " + sAction);
						console.log("Inside close for message box");
					}
				});

			} else {

				MessageBox.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("invoiceSelection"));
			}

		},
		onCalculate: function(e) {
			var selectedArray = [];
			var invTableLength = this.getView().byId("idInboundsTable").getSelectedItems();

		/*	if (invTableLength.length > 0) {
				console.log("table length > 0");
				var message1 = "Do you want to proceed with calculation of HUs?";

				MessageBox.show(message1, {
					title: "Message",

					actions: [MessageBox.Action.YES, MessageBox.Action.NO],

					onClose: function(sAction) {
						MessageToast.show("Action selected: " + sAction);
						console.log("Inside close for message box");
					}
				});
			} else {

				MessageBox.show(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("invoiceSelection"));
			} */
			
			var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("huCreationPattern");

		}
		

	});
});