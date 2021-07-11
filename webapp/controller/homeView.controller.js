sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function(Controller,MessageBox) {
	"use strict";

	return Controller.extend("com.sap.huCreationinboundHu.controller.homeView", {
	onInit: function () {
		
	},

	onApplyFilter: function (e) {
		        var inboundDelivery = this.getView().byId("inboundId").getValue();
				var asnNumber = this.getView().byId("asnNumberrId").getValue();
				var materialCode = this.getView().byId("materialCodeId").getValue();
				var batchnumber = this.getView().byId("batchNumberId").getValue();
				var huValue = this.getView().byId("huId").getSelected();
				
				if (inboundDelivery=== "" && asnNumber===""){
					
					MessageBox.error("Please enter either inbound delivery# or asn# to proceed");
					
				}
		
	}


	});
});