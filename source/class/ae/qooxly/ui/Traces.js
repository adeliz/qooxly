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
        this.properties = new qx.ui.container.Stack();
        page2.add(this.properties,{flex:1});
        tabView.add(page2);
        
        this.scatter = new ae.qooxly.ui.form.Scatter();
        this.properties.add(this.scatter);
        this.bar = new ae.qooxly.ui.form.Bar();
        this.properties.add(this.bar);
        
        splitpane.add(tabView,1);
        
        this.add(splitpane, {
			flex : 1
		});

        this._controller.addListener("changeSelection",function(e){
        	if(e.getData().length<=0){
        		this.properties.setEnabled(false);
        		data.setEnabled(false);
        		qx.core.Init.getApplication().projectController.getCommand("removeTrace").setEnabled(false);
        	}else{
        		var selection = e.getData().getItem(0);
        		switch(selection.getType()){
	        		case "scatter":
	        			this.properties.setSelection([this.scatter]);
	        			if(selection!=null){
	        				if(selection.getTextfont()==null){
	        					selection.setTextfont(new ae.chart.model.Font());
	            			}
	        				if(selection.getMarker()==null){
	        					selection.setMarker(new ae.chart.model.trace.auxiliary.Marker());
	            			}
	        				if(selection.getLine()==null){
	        					selection.setLine(new ae.chart.model.trace.auxiliary.Line());
	            			}
	        				if(selection.getSource()==null){
	        					var src = new ae.chart.model.trace.auxiliary.Source();
	        					var model = qx.data.marshal.Json.createModel({x:0,y:1,text:null},true);
	        					src.setParameters(model);
	        					src.setFormatter("CSV");
	        					selection.setSource(src);
	            			}
	        			}
	        			this.scatter.ptfcontroller.setModel(selection);
	        			break;
	        		case "bar":
	        			this.properties.setSelection([this.bar]);
	        			if(selection!=null){
	        				if(selection.getTextfont()==null){
	        					selection.setTextfont(new ae.chart.model.Font());
	            			}
	        				if(selection.getMarker()==null){
	        					selection.setMarker(new ae.chart.model.trace.auxiliary.Marker());
	            			}
	        				if(selection.getSource()==null){
	        					var src = new ae.chart.model.trace.auxiliary.Source();
	        					var model = qx.data.marshal.Json.createModel({x:0,y:1,text:null},true);
	        					src.setParameters(model);
	        					src.setFormatter("CSV");
	        					selection.setSource(src);
	            			}
	        			}
	        			this.bar.ptfcontroller.setModel(selection);
	        			break;
        		}
        		this.properties.setEnabled(true);
        		data.setEnabled(true);
        		qx.core.Init.getApplication().projectController.getCommand("removeTrace").setEnabled(true);
        	}
        },this);
	}
})