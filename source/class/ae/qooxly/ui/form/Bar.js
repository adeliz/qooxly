qx.Class.define("ae.qooxly.ui.form.Bar", {
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
		
		var showlegendCheckBox = new qx.ui.form.CheckBox();
		var visibleCheckBox = new qx.ui.form.CheckBox();
	    
		var nameTf = new qx.ui.form.TextField();
		
		var sOpacity = this.sOpacity = new qx.ui.form.Slider().set({
			minimum: 0,
			maximum: 100,
			singleStep: 1
			//value: 0,
			//maxHeight:20
        });
	    
		var xaxis = new qx.ui.form.TextField();
		var yaxis = new qx.ui.form.TextField();
	    
	    var markercolor = new ae.qooxly.ui.ColorField();
		
	    var dsid = new qx.ui.form.TextField();
	    var formatter = new qx.ui.form.TextField().set({enabled:false});
	    var x = new qx.ui.form.Spinner();
	    var y = new qx.ui.form.Spinner();
	    var text = new qx.ui.form.Spinner();
		var parameters = new qx.ui.form.TextArea().set({
			placeholder:'{\n"x":"0",\n"y":"1"\n}'
		});
		
		this.ptfcontroller = new qx.data.controller.Form(null, form);
		
		form.addGroupHeader("General");
		form.add(nameTf, this.tr("Name"),null,"name");
		this.ptfcontroller.addBindingOptions("name", {
			converter : function(value) {
				return (value) ? value : "";
			}
		},
		{
			converter : function(value) {
				if (value!="") {return value};
			}
		});
		
		form.add(markercolor,this.tr("Color"),null,"marker.color");
		
		form.add(sOpacity, this.tr("Opacity"),null,"opacity");
		this.ptfcontroller.addBindingOptions("opacity", {
			converter : function(value) {
				return value*100;
			}
		},
		{
			converter : function(value) {
				return value/100;
			}
		});
		
		form.add(showlegendCheckBox,this.tr("Show legend"),null,"showlegend");
		form.add(visibleCheckBox,this.tr("Visible"),null,"visible");
		form.add(xaxis,this.tr("X axis"),null,"xaxis");
		form.add(yaxis,this.tr("Y axis"),null,"yaxis");
		
		

		
		
		form.addGroupHeader("Source");
		form.add(dsid,this.tr("Datasource"),null,"source.id");
		form.add(formatter,this.tr("Formatter"),null,"source.formatter");
		form.add(x,this.tr("X"),null,"source.parameters.x");
		form.add(y,this.tr("Y"),null,"source.parameters.y");
		form.add(text,this.tr("Text"),null,"source.parameters.text");

		
		var renderedForm = new qx.ui.form.renderer.Single(form);
		renderedForm.getLayout().setColumnFlex(0,0);
		renderedForm.getLayout().setColumnFlex(1,1);
		
		
		
		container.add(renderedForm,{flex:1});

		
		this.add(scroll,{flex:1});

	}
})