qx.Class.define("ae.qooxly.ui.Axes", {
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		//layout.setSeparator("separator-vertical");
		this.setDecorator(null);
		this.setWidth(250);

		var radioButtonGroupHBox = this.radioButtonGroupHBox = new qx.ui.form.RadioButtonGroup();
	    radioButtonGroupHBox.setLayout(new qx.ui.layout.HBox(5));
	    radioButtonGroupHBox.setDecorator(null);
	    var yradio = new qx.ui.form.RadioButton("Y axes");
	    radioButtonGroupHBox.add(new qx.ui.form.RadioButton("X axes"));
	    radioButtonGroupHBox.add(yradio);
	    radioButtonGroupHBox.setSelection([yradio]);
	    
		this.list = new qx.ui.form.List();

		var yaxes = qx.core.Init.getApplication().getChartModel().getLayout().getYaxes();
		if(yaxes.length==0){yaxes.push(new ae.chart.model.axis.Axis());}
		var xaxes = qx.core.Init.getApplication().getChartModel().getLayout().getXaxes();
		if(xaxes.length==0){xaxes.push(new ae.chart.model.axis.Axis());}
		this._controller = new qx.data.controller.List(yaxes, this.list,"title");
		this._controller.setLabelOptions({
			converter : function(data, model) {
				return "y"+(yaxes.indexOf(model)+1);
			}
		});
		
		radioButtonGroupHBox.addListener('changeSelection',function(e){
	    	if(e.getData()[0].getLabel()=="X axes"){
	    		this._controller.setModel(xaxes);
	    		this._controller.setLabelOptions({
	    			converter : function(data, model) {
	    				return "x"+(xaxes.indexOf(model)+1);
	    			}
	    		});
	    	}else{
	    		this._controller.setModel(yaxes);
	    		this._controller.setLabelOptions({
	    			converter : function(data, model) {
	    				return "y"+(yaxes.indexOf(model)+1);
	    			}
	    		});
	    	}
	    },this);
		
		var splitpane = new qx.ui.splitpane.Pane("vertical").set({margin:5});
        splitpane.getChildControl("splitter").setBackgroundColor("white");
        
        var container = new qx.ui.container.Composite(new qx.ui.layout.VBox);
        
        container.add(radioButtonGroupHBox, {flex : 1});
        container.add(this.list, {flex : 1});
        
        splitpane.add(container,0);
        var axis = new ae.qooxly.ui.form.Axis(this);
        splitpane.add(axis,1);
        
        this.add(splitpane,{flex:1});
        
        this._controller.addListener("changeSelection",function(e){
        	if(e.getData().length<=0){
        		axis.setEnabled(false);
        		qx.core.Init.getApplication().projectController.getCommand("removeAxis").setEnabled(false);
        	}else{
        		axis.setEnabled(true);
        		if(this._controller.getModel().length>1){
        			qx.core.Init.getApplication().projectController.getCommand("removeAxis").setEnabled(true);
        		}else{
        			qx.core.Init.getApplication().projectController.getCommand("removeAxis").setEnabled(false);
        		}
        		
        	}
        },this)
	}
})