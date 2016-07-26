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

		var traces = qx.core.Init.getApplication().getChartModel().getTraces();
		this._controller = new qx.data.controller.List(traces, this.list,"name");
		this._controller.setLabelOptions({
			converter : function(data, model) {
				return model.getName() ? model.getName() : "trace "+traces.indexOf(model);
			}
		});
		
		//Listener
		/*this.list.addListener("changeSelection",function(e){

            if(this.list.getSelection().length!=0){
            	
            }
        },this);*/

	}
})