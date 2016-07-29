qx.Class.define("ae.qooxly.ui.Traces", {
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		this.setDecorator("main");
		this.setWidth(250);

		this.list = new qx.ui.form.List().set({
			decorator : null
		});
		this.add(this.list, {
			flex : 1
		});


		this._controller = new qx.data.controller.List(null, this.list,"name");
		
		this._controller.setLabelOptions({
			converter : function(data, model) {
				var traces = qx.core.Init.getApplication().getChartView().getModel().getTraces();
				return model.getName() ? model.getName() : "trace "+traces.indexOf(model);
			}
		});
		qx.core.Init.getApplication().getChartView().bind("model.traces",this._controller,"model");

		//Listener
		/*this.list.addListener("changeSelection",function(e){

            if(this.list.getSelection().length!=0){
            	
            }
        },this);*/

	}
})