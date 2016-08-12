qx.Class.define("ae.qooxly.ui.Traces", {
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

		this._controller = new qx.data.controller.List(null, this.list,"name");
		
		this._controller.setLabelOptions({
			converter : function(data, model) {
				var traces = qx.core.Init.getApplication().getChartView().getModel().getTraces();
				return model.getName() ? model.getName() : "trace "+traces.indexOf(model);
			}
		});
		qx.core.Init.getApplication().getChartView().bind("model.traces",this._controller,"model");

		var tabView = new qx.ui.tabview.TabView();
        var page1 = new qx.ui.tabview.Page("Data");
        page1.setLayout(new qx.ui.layout.VBox());
        var data = new ae.qooxly.ui.form.Data(this._controller);
        page1.add(data,{flex:1});
        tabView.add(page1);
        
        var page2 = new qx.ui.tabview.Page("Properties");
        page2.setLayout(new qx.ui.layout.VBox());
        var scatter = new ae.qooxly.ui.form.Scatter(this._controller);
        page2.add(scatter,{flex:1});
        tabView.add(page2);
        
        splitpane.add(tabView,1);
        
        this.add(splitpane, {
			flex : 1
		});
        
        this._controller.addListener("changeSelection",function(e){
        	if(e.getData().length<=0){
        		scatter.setEnabled(false);
        		data.setEnabled(false);
        		qx.core.Init.getApplication().projectController.getCommand("removeTrace").setEnabled(false);
        	}else{
        		scatter.setEnabled(true);
        		data.setEnabled(true);
        		qx.core.Init.getApplication().projectController.getCommand("removeTrace").setEnabled(true);
        	}
        });
	}
})