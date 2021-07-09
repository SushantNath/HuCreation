sap.ui.controller("inbound.ext.controller.ListReportExt", {

	onClickActionCarrierCollection1: function(oEvent) {
		
	var selectedRows=this._table.getSelectedContexts();
	console.log("Selected rows are", selectedRows);
		
	},
	
	onBeforeRebindTableExtension: function (oEvent) {
            this._table = oEvent.getSource().getTable();
        }
});