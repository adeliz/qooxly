qx.Class.define("ae.qooxly.ui.form.Layout", {
	extend : qx.ui.container.Composite,

	construct : function() {
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
		
		var papercolor = new ae.qooxly.ui.ColorField();
		var plotcolor = new ae.qooxly.ui.ColorField();
		
		var showlegend = new qx.ui.form.CheckBox();
		
		var autosize = new qx.ui.form.CheckBox();
		
		var height = new qx.ui.form.Spinner(0,1,5000);
		var width = new qx.ui.form.Spinner(0,1,5000);		
		
		var dragmode = new qx.ui.form.SelectBox();
		var dm = [
          {label: this.tr("Zoom"), data: "zoom"},
          {label: this.tr("Pan"), data: "pan"}/*,
          {label: this.tr("Select"), data: "select"},
          {label: this.tr("Lasso"), data: "lasso"},
          {label: this.tr("Orbit"), data: "orbit"},
          {label: this.tr("Turntable"), data: "turntable"}*/
        ];
        var dmmodel = qx.data.marshal.Json.createModel(dm);
        var dmController = new qx.data.controller.List(null, dragmode);
        dmController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
        dmController.setModel(dmmodel);		      

	    var hovermode = new qx.ui.form.SelectBox();
		var hm = [
          {label: this.tr("X"), data: "x"},
          {label: this.tr("Y"), data: "y"},
          {label: this.tr("Closest"), data: "closest"},
          {label: this.tr("None"), data: false}
        ];
        var hmmodel = qx.data.marshal.Json.createModel(hm);
        var hmController = new qx.data.controller.List(null, hovermode);
        hmController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
	    hmController.setModel(hmmodel);	
		
		var color = new ae.qooxly.ui.ColorField();
		var family = new qx.ui.form.TextField();
		var size = new qx.ui.form.Spinner();
		
		var titlecolor = new ae.qooxly.ui.ColorField();
		var titlefamily = new qx.ui.form.TextField();
		var titlesize = new qx.ui.form.Spinner();
		
		this.ptfcontroller = new qx.data.controller.Form(null, form);
		
		form.addGroupHeader("General");
		form.add(title, this.tr("Title"),null,"title");
		form.add(papercolor, this.tr("Paper color"),null,"paper_bgcolor");
		form.add(plotcolor, this.tr("Plot color"),null,"plot_bgcolor");
		form.add(showlegend, this.tr("Show legend"),null,"showlegend");
		form.add(autosize, this.tr("Autosize"),null,"autosize");
		form.add(width, this.tr("Width"),null,"width");
		form.add(height, this.tr("Height"),null,"height");		
		form.add(dragmode, this.tr("Drag mode"),null,"dragmode");
		form.add(hovermode, this.tr("Hover mode"),null,"hovermode");
		
		form.addGroupHeader("Global font");
		form.add(family,this.tr("Font family"),null,"font.family");
		form.add(size,this.tr("Font size"),null,"font.size");
		form.add(color,this.tr("Font color"),null,"font.color");
		
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
		var controller = new qx.data.controller.Object(qx.core.Init.getApplication().getChartModel());
    	controller.bind("model.layout", this.ptfcontroller, "model",{
    		converter : function(value){
    			if(value.getTitlefont()==null && value.getFont()==null){
    				value.setTitlefont(new ae.chart.model.Font());
    				value.setFont(new ae.chart.model.Font());
    				return value;
    			}
    			if(value.getFont()==null){
    				value.setFont(new ae.chart.model.Font());
    				return value;
    			}
    			if(value.getTitlefont()==null){
    				value.setTitlefont(new ae.chart.model.Font());
    				return value;
    			}
    		}
    	});
	}
})