jQuery.sap.declare("inbound.Component");
sap.ui.getCore().loadLibrary("sap.ui.generic.app");
jQuery.sap.require("sap.ui.generic.app.AppComponent");

sap.ui.generic.app.AppComponent.extend("inbound.Component", {
	metadata: {
		"manifest": "json"
	}
});