qx.Class.define("ae.qooxly.ui.form.Datasource", {
	extend : qx.ui.container.Composite,

	construct : function(controller) {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox();
		this.setLayout(layout);
		
		var radioButtonGroupHBox = this.radioButtonGroupHBox = new qx.ui.form.RadioButtonGroup().set({
			//maxWidth:150,
			allowGrowX:false,
			alignX:"center"
		});
	    radioButtonGroupHBox.setLayout(new qx.ui.layout.HBox(5));
	    radioButtonGroupHBox.setDecorator(null);
	    var yradio = new qx.ui.form.RadioButton("CSV");
	    this.csvRButton = new qx.ui.form.RadioButton("Request");
	    radioButtonGroupHBox.add(this.csvRButton);
	    radioButtonGroupHBox.add(yradio);
	    radioButtonGroupHBox.setSelection([yradio]);
	    
	    this.add(radioButtonGroupHBox);
	    this.add(new qx.ui.basic.Label("Request is used only if CSV is empty").set({
			rich: true,
			alignX:"center"
		}));
	    
		var container = new qx.ui.container.Composite(
				new qx.ui.layout.VBox());
		
		var scroll = new qx.ui.container.Scroll().set({
			allowGrowY : true
		});
		
		scroll.add(container);
		
		var form = new qx.ui.form.Form();

		var id = new qx.ui.form.TextField();
		var url = new qx.ui.form.TextField().set({
			placeholder:"http://www.example.com?"
		});

		var method = new qx.ui.form.SelectBox();
		var methods = [
          {label: this.tr("GET"), data: "GET"},
          {label: this.tr("POST"), data: "POST"}
        ];
        var mmodel = qx.data.marshal.Json.createModel(methods);
        var mController = new qx.data.controller.List(null, method);
        mController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
        mController.setModel(mmodel);	
	    
		var parameters = new qx.ui.form.TextArea().set({
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
		//form.add(data, this.tr(""),null,"data");
		
		var renderedForm = new qx.ui.form.renderer.Single(form).set({
			margin : 10
		});
		renderedForm.getLayout().setColumnFlex(0,0);
		renderedForm.getLayout().setColumnFlex(1,1);
		renderedForm.getLayout().setRowFlex(3,1);
		
		
		container.add(renderedForm,{flex:1});
		
		var form2 = new qx.ui.form.Form();
		this.ptfcontroller2 = new qx.data.controller.Form(null, form2);
		form2.add(data, this.tr(""),null,"data");
		var renderedForm2 = new qx.ui.form.renderer.Single(form2).set({
			marginTop : 10
		});
		renderedForm2.getLayout().setColumnMaxWidth(0,0);
		renderedForm2.getLayout().setSpacing(0);
		renderedForm2.getLayout().setColumnFlex(1,1);
		renderedForm2.getLayout().setRowFlex(0,1);
		
		container.add(renderedForm2,{flex:1});

		renderedForm2.setVisibility("visible");
		renderedForm.setVisibility("excluded");
		
		this.add(scroll,{flex:1});
		
		controller.bind("selection[0]", this.ptfcontroller, "model");
		controller.bind("selection[0]", this.ptfcontroller2, "model");
		
		radioButtonGroupHBox.addListener('changeSelection',function(e){
	    	if(e.getData()[0].getLabel()=="CSV"){
	    		renderedForm2.setVisibility("visible");
	    		renderedForm.setVisibility("excluded");
	    	}else{
	    		renderedForm.setVisibility("visible");
	    		renderedForm2.setVisibility("excluded");
	    	}
	    },this);
	}
})