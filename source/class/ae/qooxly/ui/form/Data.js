qx.Class.define("ae.qooxly.ui.form.Data", {
	extend : qx.ui.container.Composite,

	construct : function(controller) {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		
		var textarea = new qx.ui.form.TextArea().set({
			placeholder:"X,Y,Text\n0,2,valA\n1,1,valB\n1,3,valC"
		});
		
		var button = new qx.ui.form.Button(this.tr("Update")).set({
			marginTop:5
		});
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
    	this.controller = controller;
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
    		}
    	});
	}
})