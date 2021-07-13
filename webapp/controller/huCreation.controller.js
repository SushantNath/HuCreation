sap.ui.define([
	"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History",
			"sap/ui/core/UIComponent"
], function(Controller,History,UIComponent) {
	"use strict";

	return Controller.extend("com.sap.huCreationinboundHu.controller.huCreation", {
		
			onNavBack: function () {
				
			
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("homePattern", true);
		
				
 console.log("Inside navigate");
		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.huCreationinboundHu.view.huCreation
		 */
		//	onInit: function() {
		//
		//	},

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