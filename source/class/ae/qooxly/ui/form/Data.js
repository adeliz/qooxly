qx.Class.define("ae.qooxly.ui.form.Data", {
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		
		var textarea = new qx.ui.form.TextArea();
		
		var button = new qx.ui.form.Button(this.tr("Update"));
		button.addListener("execute",function(e){
			var selection = qx.core.Init.getApplication()._tracesEditor._controller.getSelection().getItem(0);
			
			var data = textarea.getValue().split("\n");

			var headers = data[0].split(",");
			var val = new Array(headers.length);
			for(var i=0;i<val.length;i++){
				val[i] = [];
			}
			for(var i=1;i<data.length;i++){
				var values = data[i].split(",");
				for(var j=0;j<val.length;j++){
					val[j].push(values[j]);
				}
			}
			for(var i=0;i<val.length;i++){
				selection['set'+headers[i]](val[i]);
			}
		},textarea);
		
		this.add(textarea,{flex:1});
		this.add(button);
		
		//binding
    	this.controller = qx.core.Init.getApplication()._tracesEditor._controller;
    	this.controller.bind("selection[0]", textarea, "value",{
    		converter : function(value){
    			if(value && value.getX()){
    				//console.log(value.getX());
    				var string = "X,Y";
    				if(Array.isArray(value.getText())){
    					string = string+",Text";
    				}
    				for(var i=0;i<value.getX().length;i++){
    					string = string+"\n"+ value.getX()[i]+","+value.getY()[i];
    					if(Array.isArray(value.getText())){
    						string = string+","+value.getText()[i];
    					}
    				}
    				return string;
    			}
    			
    			//return value.getData().getX().toString();
    		}
    	});
    	
    	/*textarea.bind("value", this.controller, "selection[0]",{
    		converter : function(data, model, source, target){
    			console.log(data);
    			console.log(model);
    			console.log(source);
    			console.log(target);
    			
    			//return value.getData().getX().toString();
    		}
    	});*/
	}
})