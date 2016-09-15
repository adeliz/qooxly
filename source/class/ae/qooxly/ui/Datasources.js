qx.Class.define("ae.qooxly.ui.Datasources", {
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		this.setWidth(250);

		var splitpane = new qx.ui.splitpane.Pane("vertical").set({margin:5});
        splitpane.getChildControl("splitter").setBackgroundColor("white");
        
        
		this.list = new qx.ui.form.List();
		
		splitpane.add(this.list,0);

		this._controller = new qx.data.controller.List(null, this.list,"id");
		
		/*this._controller.setLabelOptions({
			converter : function(data, model) {
				var traces = qx.core.Init.getApplication().getChartView().getModel().getTraces();
				return model.getName() ? model.getName() : "trace "+traces.indexOf(model);
			}
		});*/
		qx.core.Init.getApplication().getChartView().bind("model.datasources",this._controller,"model");

        var data = new ae.qooxly.ui.form.Datasource(this._controller);

        splitpane.add(data);
        
        this.add(splitpane, {
			flex : 1
		});
        
        this._controller.addListener("changeSelection",function(e){
        	if(e.getData().length<=0){
        		data.setEnabled(false);
        		qx.core.Init.getApplication().projectController.getCommand("removeDatasource").setEnabled(false);
        	}else{
        		data.setEnabled(true);
        		qx.core.Init.getApplication().projectController.getCommand("removeDatasource").setEnabled(true);
        	}
        })
	}
})