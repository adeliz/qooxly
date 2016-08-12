qx.Class.define("ae.qooxly.ui.form.Datasource", {
	extend : qx.ui.container.Composite,

	construct : function(controller) {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox();
		this.setLayout(layout);
		
		var radioButtonGroupHBox = this.radioButtonGroupHBox = new qx.ui.form.RadioButtonGroup().set({
			//maxWidth:150,
			//alignX:"center"
		});
	    radioButtonGroupHBox.setLayout(new qx.ui.layout.HBox(5));
	    radioButtonGroupHBox.setDecorator(null);
	    var yradio = new qx.ui.form.RadioButton("Table");
	    radioButtonGroupHBox.add(new qx.ui.form.RadioButton("Request"));
	    radioButtonGroupHBox.add(yradio);
	    radioButtonGroupHBox.setSelection([yradio]);
	    
	    this.add(radioButtonGroupHBox);
	    
		var container = new qx.ui.container.Composite(
				new qx.ui.layout.VBox()).set({
			padding : 10
		});
		
		var scroll = new qx.ui.container.Scroll().set({
			allowGrowY : true
		});
		
		scroll.add(container);
		
		var form = new qx.ui.form.Form();

		var id = new qx.ui.form.TextField().set({visibility : "excluded"});
		var url = new qx.ui.form.TextField().set({
			visibility : "excluded",
			placeholder:"http://www.example.com?"
		});
		var method = new qx.ui.form.TextField("GET").set({
			visibility : "excluded",
			enabled:false
		});
		var parameters = new qx.ui.form.TextArea().set({
			visibility : "excluded",
			placeholder:'{\n"s":"YHOO",\n"a":"3",\n"b":"12",\n"c":"2015",\n"d":"1",\n"e":"28",\n"f":"2016",\n"g":"w"\n}'
		});
		
		var data = new qx.ui.form.TextArea().set({
			placeholder:"X,Y,Text\n0,2,valA\n1,1,valB\n1,3,valC"
		});
		
		this.ptfcontroller = new qx.data.controller.Form(null, form);
		
		form.add(id, this.tr("Id"),null,"id");
		form.add(url, this.tr("Url"),null,"url");
		form.add(method, this.tr("Method"),null,"method");
		form.add(parameters, this.tr("Parameters"),null,"parameters");
		this.ptfcontroller.addBindingOptions("parameters", {
			converter : function(value) {
				return (value) ? JSON.stringify(value) : null;
			}
		},
		{
			converter : function(value) {
				return (value || value!="") ? JSON.parse(value) : null;
			}
		});
		form.add(data, this.tr(""),null,"data");
		
		var renderedForm = new qx.ui.form.renderer.Single(form);
		renderedForm.getLayout().setColumnFlex(0,0);
		renderedForm.getLayout().setColumnFlex(1,1);
		renderedForm.getLayout().setRowFlex(3,0);
		renderedForm.getLayout().setRowFlex(4,1);
		
		
		container.add(renderedForm,{flex:1});

		this.add(scroll,{flex:1});
		
		controller.bind("selection[0]", this.ptfcontroller, "model");
		
		radioButtonGroupHBox.addListener('changeSelection',function(e){
	    	if(e.getData()[0].getLabel()=="Table"){
	    		data.setVisibility("visible");
	    		id.setVisibility("excluded");
	    		url.setVisibility("excluded");
	    		method.setVisibility("excluded");
	    		parameters.setVisibility("excluded");
	    		renderedForm.getLayout().setRowFlex(3,0);
	    		renderedForm.getLayout().setRowFlex(4,1);
	    	}else{
	    		id.setVisibility("visible");
	    		url.setVisibility("visible");
	    		method.setVisibility("visible");
	    		parameters.setVisibility("visible");
	    		renderedForm.getLayout().setRowFlex(3,1);
	    		renderedForm.getLayout().setRowFlex(4,0);
	    		data.setVisibility("excluded");
	    	}
	    },this);
	}
})