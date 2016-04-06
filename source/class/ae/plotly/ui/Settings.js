/**
 * Chart settings
 * 
 */
qx.Class.define("ae.plotly.ui.Settings", {
	
	extend : qx.ui.container.Stack,

	/**
	 * Create a user interface for the chart's settings
	 * @param chart {ae.plotly.ui.Chart} Chart widget
	 */
	construct : function(chart) {
		this.base(arguments);
		this.setWidth(300);
		this.setDecorator("main");

		this.chart=chart;
			
		var filterProp = this.filterProp = new qx.ui.form.TextField().set({
			placeholder:"Filter...",
			margin:5
			//enabled:false
			//visibility:"excluded"
		});
		filterProp.addListener("changeValue", function(ev) {
			this.filter(this.filterProp.getValue());
		}, this);
		
		
		
		//var tree = this.tree =  new qx.ui.tree.VirtualTree(null, "name", "kids");
		var tree = this.tree = new qx.ui.tree.Tree().set({
			decorator:null
		});
		
		
		var treeController = this.treeController = new qx.data.controller.Tree(null, tree, "kids", "name");
		treeController.addListener("changeSelection",function(e){
		//tree.getSelection().addListener("change", function(e) {
			var selected = e.getData().getItem(0);
			//var selected = tree.getSelection().getItem(0);
			if(selected){
				var clazz = qx.Class.getByName(selected.classname); 
				var props = qx.Class.getProperties(clazz); 
				if(props.indexOf("obj")!=-1){
					this.form.removeAll();
					this.form.add(new ae.plotly.ui.Form(selected,chart),{flex:1});
				}
			}
		},this);
		
		
		
		var form = this.form = new qx.ui.container.Composite();
		form.setLayout(new qx.ui.layout.VBox());
		
		
		var comp = this.__treeView = new qx.ui.container.Composite();
		var layout = new qx.ui.layout.VBox();
		comp.setLayout(layout);
		layout.setSeparator("separator-vertical");
		comp.add(filterProp);
		comp.add(tree,{flex:1});
		comp.add(form,{flex:1});
		
		//JSON EDITOR------------------------------
		var jsoneditor = new qx.ui.container.Composite();
		var lyt = new qx.ui.layout.VBox();
		jsoneditor.setLayout(lyt);
		lyt.setSeparator("separator-vertical");
		var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
		});

		pane.addListenerOnce("appear",function(){
    		var editor = this._ace = window.ace.edit(pane.getContentElement().getDomElement());
        	editor.getSession().setMode("ace/mode/javascript");
        	var ed = this._editor;
        		/*editor.on('change',function(){
            		ed.getModel().getNotification().setScript(editor.getSession().getValue());
            	});*/
            	editor.getSession().setValue("var data = {\n"+
					"    marker:{\n"+
					"        size: 4\n"+
					"    }\n"+
					"\n}"+
					"\n"+
					"Qooxly.restyle(data);");

        	
		},this);

		pane.addListener("appear",function(){
    		this._ace.resize();
		},this);


		jsoneditor.add(pane,{flex:1});
        var composite = new qx.ui.container.Composite().set({
            margin: 4
        });
        composite.setLayout(new qx.ui.layout.HBox().set({
            spacing: 4,
            alignX: "right"
        }));
        var plotButton = new qx.ui.form.Button("Plot");
        plotButton.addListener("click", function (e) {
        	var json = JSON.parse(this._ace.getSession().getValue());
        	qx.core.Init.getApplication().getChartView().plot(json.data,json.layout);
        }, this);
        
        var loadButton = new qx.ui.form.Button("Get JSON");
        loadButton.addListener("click", function (e) {
        	var qxchart = qx.core.Init.getApplication().getChartView();
        	var json = JSON.stringify({"data":qxchart.getData(),"layout":qxchart.getLayout()}, null, '\t');
        	this._ace.getSession().setValue(json);
        }, this);

        composite.add(loadButton);
        composite.add(plotButton);
        jsoneditor.add(composite);
        //END JSON EDITOR------------------------------
        
        //CODE EDITOR------------------------------
        var codeeditor = new qx.ui.container.Composite();
		var lyt2 = new qx.ui.layout.VBox();
		codeeditor.setLayout(lyt2);
		lyt2.setSeparator("separator-vertical");
		var pane2 = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
		});

		pane2.addListenerOnce("appear",function(){
    		var editor2 = this._ace2 = window.ace.edit(pane2.getContentElement().getDomElement());
        	editor2.getSession().setMode("ace/mode/javascript");
        	//var ed = this._editor;
        		/*editor.on('change',function(){
            		ed.getModel().getNotification().setScript(editor.getSession().getValue());
            	});*/
            	editor2.getSession().setValue("var data = {\n"+
					"    marker:{\n"+
					"        size: 4\n"+
					"    }\n"+
					"\n}"+
					"\n"+
					"Qooxly.restyle(data);");

        	
		},this);

		pane2.addListener("appear",function(){
    		this._ace2.resize();
		},this);


		codeeditor.add(pane2,{flex:1});
        var composite2 = new qx.ui.container.Composite().set({
            margin: 4
        });
        composite2.setLayout(new qx.ui.layout.HBox().set({
            spacing: 4,
            alignX: "right"
        }));
        var runButton = new qx.ui.form.Button("Run");
        runButton.addListener("click", function (e) {
        	eval(this._ace2.getSession().getValue());
        }, this);

        composite2.add(runButton);
        codeeditor.add(composite2);
        //END CODE EDITOR------------------------------
		this.__treeView = comp;
		this.__jsonView = jsoneditor;
		this.__consoleView = codeeditor;
		//this.loadSettings();


	    //stack.setDecorator("main");
		this.add(this.__treeView );
		this.add(this.__jsonView);
		this.add(this.__consoleView);
		this.resetSelection();
		this.exclude();
		//this.setDynamic(true);

	    //this.setBackgroundColor("blue");
	    //this.add(stack, {flex:1})
	},
	
	members:{
		/*setModel : function(chart){
			var model = qx.data.marshal.Json.createModel({
				data:chart.getPlotlyDiv().data,
				layout:chart.getPlotlyDiv().layout
			});

		},*/
		
		/**
		 * Filter the settings tree
		 * @param term {String} String used for filtering
		 */
		filter : function(term){
			var searchRegExp = new RegExp("^.*" + term + ".*", "ig");
			
			var matches = new qx.data.Array();
			
			//Check all the nodes that include the search term and exclude others
			var items = this.tree.getRoot().getItems(true, true);
			for (var i = 0; i < items.length; i++) {
		        var folder = items[i];
		        var parent = folder.getParent();
		        
		        if ( folder.getLabel().search(term) != -1)
	            {
	              matches.push(folder);
	              folder.show();
	            }
	            else {
	              folder.exclude();
	            }
			}
			
			//Check for all node with children if their child contain a node with the search term, and make them visible and open them. 
			for (var i = 0; i < items.length; i++) {
		        var folder = items[i];
		        if(folder.hasChildren()){
		        	var subitems = folder.getItems(true, true);
		        	for (var j = 0; j < subitems.length; j++) {
				        var subfolder = subitems[j];
				        if (matches.contains(subfolder))
			            {
			              folder.show();
			              folder.setOpen(true);
			            }
		        	}
		        };
			}
			
			//In all matching nodes, make visible all their child. 
			for (var i = 0; i < matches.length; i++) {
	        	var subitems = matches.getItem(i).getItems(true, true);
	        	for (var j = 0; j < subitems.length; j++) {
	        		subitems[j].show();
	        	}
			}
			
			// special case for the empty string
			if (term.length == 0) {
				for (var i = 0; i < items.length; i++) {
					var folder = items[i];
					folder.setOpen(false);
					folder.show();
				}
			}
		},
		
		/**
		 * Load settings
		 */
		loadSettings : function(){

			var req = new qx.io.request.Xhr("resource/ae/plotly/plotly.json","GET");
			req.addListener("success", function(e) {

				var schema = JSON.parse(e.getTarget().getResponse()).schema;
				//console.log(schema);
				
				var types = [];
				for (var key in schema.traces) {
					types.push(key);
				}
				var layout={"name":"Layout","kids":[]};
				this.walk(schema.layout.layoutAttributes,layout,["xaxis","yaxis","radialaxis","annotations","shapes"],"relayout",null);
				
				var data={"name":"Traces","kids":[]};
				var traces = this.chart.getPlotlyDiv().data;
				for(var i=0;i<traces.length;i++){
					var trace = {"name":"trace "+i,"kids":[]};
					if(!traces[i].type){
						traces[i].type="scatter";
					}
					this.walk(schema.traces[traces[i].type].attributes,trace,[],"restyle",i);
					trace.kids.push({"name":"type","obj":{
			            "values": types,
			                     "valType": "enumerated",
			                     "role": "info"
			                   },"path":"/type","method":"retype","trace":i});
					data.kids.push(trace);
				}
				
				var axes={"name":"Axes","kids":[]};
				var ptaxes = this.chart.getPlotlyDiv().layout;
				var xaxis=0,yaxis=0;
				for (var key in ptaxes) {
					if(key=="xaxis" || key=="xaxis1"){
						xaxis=1;
					}
					if(key=="yaxis" || key=="yaxis1"){
						yaxis=1;
					}
					if(key.substring(0,5)=="xaxis" || key.substring(0,5)=="yaxis" ){ //later || key.substring(0,10)=="radialaxis"
						var axe = {};
						var axetype = key.substring(0,5);
						axe[key]=schema.layout.layoutAttributes[axetype];
	
						this.walk(axe,axes,[],"relayout",null);
						//axes.kids.push(aaxe);
					}
				}
				//Add basic xAxis and yAxis if needed
				if(xaxis==0){
					var axe = {};
					axe["xaxis"]=schema.layout.layoutAttributes["xaxis"];
					this.walk(axe,axes,[],"relayout",null);
				}
				if(yaxis==0){
					var axe = {};
					axe["yaxis"]=schema.layout.layoutAttributes["yaxis"];
					this.walk(axe,axes,[],"relayout",null);
				}
	
				
				var notes={"name":"Notes","kids":[]};
				var ptnotes = this.chart.getPlotlyDiv().layout.annotations;
				if(ptnotes!=null){
					for(var i=0;i<ptnotes.length;i++){
						var note = {};
						note["annotations["+i+"]"]=schema.layout.layoutAttributes.annotations.items.annotation;
						this.walk(note,notes,[],"relayout",null);
					}
				}
				
				//Relayout shapes doesn't work yet? - Should use redraw()!
				/*var shapes={"name":"Shapes","kids":[]};
				var ptshapes = this.chart.getPlotlyDiv().layout.shapes;
				if(ptshapes!=null){
					for(var i=0;i<ptshapes.length;i++){
						var shape = {};
						shape["shapes["+i+"]"]=schema.layout.layoutAttributes.shapes.items.shape;
						this.walk(shape,shapes,[],"relayout",null);
					}
				}*/
				
				var myschema =
				{
					"name":"Chart",
					"kids":[
					        data,
					        layout,
					        axes,	
					        notes/*,
					        shapes,
					        legend*/
					]
				};
				
				var model = qx.data.marshal.Json.createModel(myschema);
				
				//@todo : It takes too long!! Use virtualTree instead?
				//var dt1  = new Date().getTime();
				this.treeController.setModel(model);
				//this.tree.setModel(model);
				//var dt2  = new Date().getTime();
				//console.log((dt2-dt1)/1000);
				
				this.tree.getRoot().setOpen(true);
				//this.tree.setHideRoot(true);
			},this);
			req.send();
		},
		
		/**
		 * Walk through the Json schema of Plotly.js (https://api.plot.ly/v2/plot-schema?sha1=%27%27)
		 * @param obj {Object} Json schema
		 * @param parent {Object} output
		 * @param exclude {Array} Array of string to exclude
		 * @param method {String} Plotly method : "restyle", "relayout" and "retype". Retype is used to change the chart's type (bar, scatter, pie,...) 
		 * @param trace {Integer} Index of the trace
		 */
		walk : function(obj,parent,exclude,method,trace){
			if(obj!=null){

				if (obj.constructor == Array || obj.constructor == Object) {
					
					for (var key in obj) {
						
						if(exclude.indexOf(key)==-1){
							if (obj.hasOwnProperty(key)) {
								var val = obj[key];
								var p=parent;
								
								if(val!=null){
									
									var path ="";
									if(parent!=null){
										if(parent.path!=null){
											path=parent.path+"/"+key;
										}else{
											path="/"+key;
										}
									}

									if(val.role=="object"){
										var pt = parent.kids.push({"name":key,"path":path,"kids":[]});
										p = parent.kids[pt-1];

									}else{
										if(val.role!=null){
											parent.kids.push({"name":key,"obj":val,"path":path,"method":method,"trace":trace});
										}
									}
								}

								this.walk(val,p,exclude,method,trace);
							}
						}
					 }
				}else{
					
				}
			}
		}
	}
});
