qx.Class.define("ae.qooxly.ui.Axes", {
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		//layout.setSeparator("separator-vertical");
		this.setDecorator(null);
		this.setWidth(250);

		var radioButtonGroupHBox = new qx.ui.form.RadioButtonGroup();
	    radioButtonGroupHBox.setLayout(new qx.ui.layout.HBox(5));
	    radioButtonGroupHBox.setDecorator(null);
	    radioButtonGroupHBox.add(new qx.ui.form.RadioButton("X axes"));
	    radioButtonGroupHBox.add(new qx.ui.form.RadioButton("Y axes"));
	    
	    
	    
		this.list = new qx.ui.form.List().set({
			decorator : "main"
		});

		var axes = qx.core.Init.getApplication().getChartModel().getLayout().getYaxes();
		this._controller = new qx.data.controller.List(axes, this.list);
		this._controller.setLabelOptions({
			converter : function(data, model) {
				return "y"+axes.indexOf(model);
			}
		});
		
		var splitpane = new qx.ui.splitpane.Pane("vertical").set({margin:5});
        splitpane.getChildControl("splitter").setBackgroundColor("white");
        
        var container = new qx.ui.container.Composite(new qx.ui.layout.VBox);
        
        container.add(radioButtonGroupHBox, {flex : 1});
        container.add(this.list, {flex : 1});
        
        splitpane.add(container,0);
        splitpane.add(new ae.qooxly.ui.form.Axis(this),1);
        
        this.add(splitpane,{flex:1});
	}
})