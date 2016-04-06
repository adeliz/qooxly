/**
 * Form
 * 
 * @ignore(Plotly.*)
 * 
 */
qx.Class.define("ae.plotly.ui.Form", {
	
	extend : qx.ui.container.Composite,

	/**
	 * Create a new form
	 * @param param  {qx.core.Object} object that describe the parameter. See code of {@link ae.plotly.ui.Settings#loadSettings loadSettings} method
	 * @param chart  {ae.plotly.ui.Chart} The chart widget
	 */
	construct : function(param,chart) {
		this.base(arguments);
		this.setWidth(300);
		this.chart = chart;
		this.param = param;

		this.setLayout(new qx.ui.layout.VBox());

		this.setPadding(20);
		
		//this.tr("ticklen");
		/*if(param.getName()=="ticklen"){
			var label = new qx.ui.basic.Label(this.tr("ticklen"));
		}else{
			var label = new qx.ui.basic.Label(this.tr(String(param.getName())));
		}*/
		var label = new qx.ui.basic.Label(this.tr(param.getName()));
		var input;
		
		//Retrieve current value to fill the form
		var currentValue;
		if(this.param.getMethod()=="restyle"){
			currentValue = chart.getPlotlyDiv().data[this.param.getTrace()];
		}else{
			currentValue = chart.getPlotlyDiv().layout;	
		}
		var ct =  this.param.getPath().split("/");
		try{
			for(var i=1;i<ct.length;i++){
				currentValue = currentValue[ct[i]];
			}
		}catch(e){}
		
		switch(param.getObj().getValType()){
			case "boolean":
				input = new qx.ui.form.CheckBox();
				if(typeof(currentValue) === "boolean"){
					input.setValue(currentValue);
				}
				input.addListener("changeValue",function(e){
					this.updatePlot(e.getData());
				},this);
				break;
			case "flaglist":
			case "string":
				input = new qx.ui.form.TextField(currentValue);
				input.addListener("changeValue",function(e){
					this.updatePlot(e.getData());
				},this);
				break;
			case "integer":
				input = new qx.ui.form.Spinner();
				input.addListener("changeValue",function(e){
					this.updatePlot(e.getData());
				},this);
				break;
			case "number":
				if(currentValue){
					currentValue = String(currentValue);
				}
				input = new qx.ui.form.TextField(currentValue);
				input.addListener("changeValue",function(e){
					this.updatePlot(e.getData());
				},this);
				break;
			case "color":
				input = new ae.plotly.ui.ColorField(currentValue);
				input.addListener("changeValue",function(e){
					this.updatePlot(e.getData());
				},this);
				break;
			case "enumerated":
				input = new qx.ui.form.SelectBox();
				var values = param.getObj().getValues();
				for (var i=0; i<values.length; i++){
					var item = new qx.ui.form.ListItem(String(values.getItem(i)));
			        input.add(item);
			    }
				input.addListener("changeSelection",function(e){
					this.updatePlot(e.getData()[0].getLabel());
				},this);
				break;
			case "info_array":
			case "data_array":
				if(currentValue){
					currentValue = currentValue.toString();
				}else{
					currentValue="";
				}
				input = new qx.ui.form.TextField("["+currentValue+"]");
				input.addListener("changeValue",function(e){
					this.updatePlot(e.getData());
				},this);
				break;
			default:
				input = new qx.ui.form.TextField(currentValue);
				break;
		}
		
		
		
		this.add(label);
		this.add(input);
		
		var clazz = qx.Class.getByName(param.getObj().classname); 
		var props = qx.Class.getProperties(clazz); 
		if(props.indexOf("description")!=-1){
			var desc = new qx.ui.basic.Label(param.getObj().getDescription()).set({
				rich:true
			});
			this.add(desc,{flex:1});
		}
	},
	
	members:{
		/**
		 * Update a graph
		 * @param value  {Object} The new value
		 */
		updatePlot : function(value){
			var path = this.param.getPath().replace("/",'{"');
			var path = path.replace(/\//g,'.');
			
			switch(this.param.getObj().getValType()){
				case "boolean":
					path= path + '":' + value +'}';
					break;
				case "info_array":
					path= path + '":' + value +'}';
					break;
				case "data_array":
					path= path + '":[' + value +']}';
					break;
				//string
				default:
					switch(value){
						case "false":
						case "true":
							path= path + '":' + value +'}';
							break;
						default:
							if(value[0]=="["){
								path= path + '":[' + value +']}';
							}else{
								path= path + '":"' + value +'"}';
							}
							
							break;
					}
			}
			
			switch(this.param.getMethod()){
				case "restyle":
					//Plotly.restyle(this.chart.getPlotlyDiv(),JSON.parse(path),this.param.getTrace());
					this.chart.restyle(JSON.parse(path),this.param.getTrace());
					break;
				case "relayout":
					//Plotly.relayout(this.chart.getPlotlyDiv(),JSON.parse(path));
					console.log(this.chart);
					this.chart.relayout(JSON.parse(path));
					break;
				case "retype":
					//Plotly.restyle(this.chart.getPlotlyDiv(),JSON.parse(path),this.param.getTrace());
					this.chart.restyle(JSON.parse(path),this.param.getTrace());
					this.chart.getSettingsUI().loadSettings();
					break;
			}
		}
	}
});
