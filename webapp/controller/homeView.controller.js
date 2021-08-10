sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"com/sap/huCreationinboundHu/utilities/Formatter",
	"sap/ui/core/UIComponent",
		"sap/ui/model/Filter",
	'sap/ui/model/Sorter'
	
], function(Controller, MessageBox, MessageToast, Formatter,UIComponent,Filter, Sorter) {
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
			
			if (huValue === true) {
				
				huValue = "X";
			}
			else{
				
				huValue = "";	
			}

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

			var deliveryFilter = new sap.ui.model.Filter("Vbeln", sap.ui.model.FilterOperator.EQ, inboundDelivery);
			var asnFilter = new sap.ui.model.Filter("Asn", sap.ui.model.FilterOperator.EQ, asnNumber);
			var materialFilter = new sap.ui.model.Filter("Charg", sap.ui.model.FilterOperator.EQ, materialCode);

			var batchFilter = new sap.ui.model.Filter("Matnr", sap.ui.model.FilterOperator.EQ, batchNumber);
			var huValueFilter = new sap.ui.model.Filter("HuFlag", sap.ui.model.FilterOperator.EQ, huValue);
		//	console.log("Hu value filter is",huValueFilter);
			// var podStatusFilter = new sap.ui.model.Filter("Poddelstat", sap.ui.model.FilterOperator.EQ, "A");
			// var dateFromGI = "1900-01-01";
			// var dateToGI = "9999-12-31";
			// var dateFromGIFilter = new sap.ui.model.Filter("Goodsissuedate", sap.ui.model.FilterOperator.GE, Formatter.formatterDateAllOrders(
			// 	dateFromGI));

			// var dateToGIFilter = new sap.ui.model.Filter("Goodsissuedate", sap.ui.model.FilterOperator.LE, Formatter.formatterDateAllOrders(
			// 	dateToGI));
			// var outboundDelFilterSingle = new sap.ui.model.Filter("DeliveryNo", sap.ui.model.FilterOperator.EQ, "");
		//	aFilterData.push(outboundDelFilterSingle);

			aFilterData.push(deliveryFilter, asnFilter, materialFilter, batchFilter,huValueFilter);

			var oModel = this.getView().getModel("inboundModel");
			var that = this;
			sap.ui.core.BusyIndicator.hide();
			oModel.read("/DEL_GETSet", {

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
		
			/* Logic to fetch filter options for Ship To */

		handleValueShipTo: function (oEvent) {

			this.loadShipTo();
			var oView = this.getView();
			var that = this;

			// create value help dialog
			if (!this._valueHelpDialogShipTo) {
				this._valueHelpDialogShipTo = sap.ui.xmlfragment(
					this.getView().getId(), "com.sap.huCreationinboundHu.fragments.shipTo",
					this
				);

				this.getView().addDependent(this._valueHelpDialogShipTo);
			}

			// open value help dialog filtered by the input value
			this._valueHelpDialogShipTo.open();

		},

		loadShipTo: function () {
			var oModel = this.getView().getModel("inboundModel");
			var that = this;
			var oView = this.getView();
			sap.ui.core.BusyIndicator.show();
			oModel.read("/DebiaSet", {

				success: function (oData, Response) {


					var shipToModel = new sap.ui.model.json.JSONModel();
					oView.setModel(shipToModel, "shipToModel");
					oView.getModel("shipToModel").setProperty("/ShipToPartySet", oData.results);
					sap.ui.core.BusyIndicator.hide();
					console.log("Inside Success function revenue invoice", oData.results);
				},

				error: function (oData, Response, oError) {
					console.log("Inside Error function");
				}

			});

			console.log("Inside Filter options");

		},

		//Code to hadle serach inside revenue invoice value help
		handleSearchShipTo: function (oEvent) {
			var sValue = oEvent.getParameter("value");
            
			var filter1 = new Filter("Land1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter2 = new sap.ui.model.Filter("Mcod1", sap.ui.model.FilterOperator.Contains, sValue);
			var filter3 = new Filter("Kunnr", sap.ui.model.FilterOperator.Contains, sValue);

			var oFilter = new Filter([filter1, filter2,filter3]);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(oFilter, sap.ui.model.FilterType.Application);
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