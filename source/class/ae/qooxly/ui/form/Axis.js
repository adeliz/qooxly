qx.Class.define("ae.qooxly.ui.form.Axis", {
	extend : qx.ui.container.Composite,

	construct : function(axes) {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		this.setWidth(250);

		var container = new qx.ui.container.Composite(
				new qx.ui.layout.VBox()).set({
			padding : 10
		});
		
		var scroll = new qx.ui.container.Scroll().set({
			allowGrowY : true
		});
		
		scroll.add(container);
		
		var form = new qx.ui.form.Form();

		var title = new qx.ui.form.TextField();
		var color = new ae.qooxly.ui.ColorField();
		var overlaying = new qx.ui.form.TextField();
		var side = new qx.ui.form.TextField();
		
		var showline = new qx.ui.form.CheckBox();
		var linewidth = new qx.ui.form.Spinner();
		var linecolor = new ae.qooxly.ui.ColorField();
		
		var showgrid = new qx.ui.form.CheckBox();
		var gridwidth = new qx.ui.form.Spinner();
		var gridcolor = new ae.qooxly.ui.ColorField();
		
		this.ptfcontroller = new qx.data.controller.Form(null, form);
		
		form.addGroupHeader("General");
		form.add(title,this.tr("Title"),null,"title");
		form.add(color,this.tr("Color"),null,"color");
		form.add(side,this.tr("Side"),null,"side");
		form.add(overlaying,this.tr("Overlaying"),null,"overlaying");
		
		form.addGroupHeader("Line");
		form.add(showline,this.tr("Show line"),null,"showline");
		form.add(linewidth,this.tr("Line width"),null,"linewidth");
		form.add(linecolor,this.tr("Line color"),null,"linecolor");
		
		form.addGroupHeader("Grid");
		form.add(showgrid,this.tr("Show grid"),null,"showgrid");
		form.add(gridwidth,this.tr("Grid width"),null,"gridwidth");
		form.add(gridcolor,this.tr("Grid color"),null,"gridcolor");
		
		var renderedForm = new qx.ui.form.renderer.Single(form);
		renderedForm.getLayout().setColumnFlex(0,0);
		renderedForm.getLayout().setColumnFlex(1,1);
		
		container.add(renderedForm,{flex:1});

		this.add(scroll,{flex:1});
		
		//binding
    	this.controller = axes._controller;
    	this.controller.bind("selection[0]", this.ptfcontroller, "model"/*,{
    		converter : function(value){
    			if(value!=null && value.getTextfont()==null){
    				value.setTextfont(new ae.chart.model.Font());
    				return value;
    			}else{
    				return value;
    			}
    		}
    	}*/);
	}
})