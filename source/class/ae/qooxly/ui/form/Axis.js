qx.Class.define("ae.qooxly.ui.form.Axis", {
	extend : qx.ui.container.Composite,

	construct : function(axes) {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		this.setWidth(250);
		this.setEnabled(false);

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
		
		var side = new qx.ui.form.SelectBox();
		var sm = [
          {label: this.tr("Left"), data: "left"},
          {label: this.tr("Right"), data: "right"},
          {label: this.tr("Top"), data: "top"},
          {label: this.tr("Bottom"), data: "bottom"}
        ];
        var dsmodel = qx.data.marshal.Json.createModel(sm);
        var dsController = new qx.data.controller.List(null, side);
        dsController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
        dsController.setModel(dsmodel);
        
		var showline = new qx.ui.form.CheckBox();
		var linewidth = new qx.ui.form.Spinner();
		var linecolor = new ae.qooxly.ui.ColorField();
		
		var showzeroline = new qx.ui.form.CheckBox();
		var zerolinewidth = new qx.ui.form.Spinner();
		var zerolinecolor = new ae.qooxly.ui.ColorField();
		
		var showgrid = new qx.ui.form.CheckBox();
		var gridwidth = new qx.ui.form.Spinner();
		var gridcolor = new ae.qooxly.ui.ColorField();
		
		var showticklabel = new qx.ui.form.CheckBox();
		var dtick = new qx.ui.form.Spinner();
		var nticks = new qx.ui.form.Spinner();
		var tick0 = new qx.ui.form.Spinner();
		var tickangle = new qx.ui.form.Spinner(-90,0,90);
		var tickcolor = new ae.qooxly.ui.ColorField();
		var ticklen = new qx.ui.form.Spinner();
		var tickformat = new qx.ui.form.TextField();
		var tickccolor = new ae.qooxly.ui.ColorField();
		var tickfamily = new qx.ui.form.TextField();
		var ticksize = new qx.ui.form.Spinner();
		var tickwidth = new qx.ui.form.Spinner();
		var tick = new qx.ui.form.SelectBox();
		var tm = [
          {label: this.tr("None"), data: ""},
          {label: this.tr("Inside"), data: "inside"},
          {label: this.tr("Outside"), data: "outside"}
        ];
        var tmodel = qx.data.marshal.Json.createModel(tm);
        var tController = new qx.data.controller.List(null, tick);
        tController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
        tController.setModel(tmodel);	
        
        var titlecolor = new ae.qooxly.ui.ColorField();
		var titlefamily = new qx.ui.form.TextField();
		var titlesize = new qx.ui.form.Spinner();
		
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
		
		form.addGroupHeader("Zero Line");
		form.add(showzeroline,this.tr("Show zero line"),null,"zeroline");
		form.add(zerolinewidth,this.tr("Zero line width"),null,"zerolinewidth");
		form.add(zerolinecolor,this.tr("Zero line color"),null,"zerolinecolor");
		
		form.addGroupHeader("Grid");
		form.add(showgrid,this.tr("Show grid"),null,"showgrid");
		form.add(gridwidth,this.tr("Grid width"),null,"gridwidth");
		form.add(gridcolor,this.tr("Grid color"),null,"gridcolor");
		
		form.addGroupHeader("Ticks");
		form.add(tick,this.tr("Tick"),null,"ticks");
		//form.add(nticks,this.tr("Max"),null,"nticks");
		form.add(tick0,this.tr("Initial tick"),null,"tick0");
		form.add(dtick,this.tr("Step"),null,"dtick");
		form.add(tickangle,this.tr("Angle"),null,"tickangle");
		form.add(tickcolor,this.tr("Color"),null,"tickcolor");
		form.add(ticklen,this.tr("Length"),null,"ticklen");
		form.add(tickwidth,this.tr("Width"),null,"tickwidth");
		
		form.addGroupHeader("Labels");
		form.add(showticklabel,this.tr("Labels"),null,"showticklabels");
		form.add(tickformat,this.tr("Format"),null,"tickformat");
		form.add(tickccolor,this.tr("Color"),null,"tickfont.color");
		form.add(tickfamily,this.tr("Family"),null,"tickfont.family");
		form.add(ticksize,this.tr("Size"),null,"tickfont.size");
		
		form.addGroupHeader("Title font");
		form.add(titlefamily,this.tr("Font family"),null,"titlefont.family");
		form.add(titlesize,this.tr("Font size"),null,"titlefont.size");
		form.add(titlecolor,this.tr("Font color"),null,"titlefont.color");
		
		
		var renderedForm = new qx.ui.form.renderer.Single(form);
		renderedForm.getLayout().setColumnFlex(0,0);
		renderedForm.getLayout().setColumnFlex(1,1);
		
		container.add(renderedForm,{flex:1});

		this.add(scroll,{flex:1});
		
		//binding
    	this.controller = axes._controller;
    	this.controller.bind("selection[0]", this.ptfcontroller, "model",{
    		converter : function(value){
    			if(value){
        			if(value.getTickfont()==null){
        				value.setTickfont(new ae.chart.model.Font());
        			}
        			if(value.getTitlefont()==null){
        				value.setTitlefont(new ae.chart.model.Font());
        			}
    			}
    			
    			return value;
    		}
    	});
	}
})