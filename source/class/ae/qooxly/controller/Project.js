qx.Class.define("ae.qooxly.controller.Project",{

    extend : qx.core.Object,
    include : [qx.locale.MTranslation],

    construct: function(){
        this._initializeCommands();

    },

    members:{

        __commands : null,


        /**
         * Initialize commands (shortcuts, ...)
         */
        _initializeCommands : function()
        {
            var commands = {};
            
            commands.newplot = new qx.ui.command.Command("Control+N");
            commands.newplot.addListener("execute", function(){

            	var chart = qx.core.Init.getApplication().getChartView();
            	var model = new ae.chart.model.Chart();
            	var layout = new ae.chart.model.layout.Layout();
            	layout.getXaxes().push(new ae.chart.model.axis.Axis());
            	layout.getYaxes().push(new ae.chart.model.axis.Axis());
            	
            	model.setLayout(layout);
            	
            	var scatter = new ae.chart.model.trace.Scatter();
            	model.addTrace(scatter);
            	//console.log(model.toJson());
            	chart.setModel(model);
            	//layout.setAutosize(true);
            	//model.setLayout(new ae.chart.model.layout.Layout());
            	//model.removeAllTraces();
            }, this);
            
            commands.open = new qx.ui.command.Command("Control+O");
            commands.open.addListener("execute", function(){
            	this.openPlot();
            }, this);
            
            commands.openurl = new qx.ui.command.Command();
            commands.openurl.addListener("execute", function(){
            	this.openPlotFromUrl();
            }, this);
            
            commands.saveas = new qx.ui.command.Command("Control+S").set({
				icon : "ae/qooxly/icons/saveas.png",
				enabled:true
			});
            commands.saveas.addListener("execute", function(){
            	this.savePlotAs();
            }, this);
            
            commands.addTrace = new qx.ui.command.Command();
            commands.addTrace.addListener("execute", function(e){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	var trace = new ae.chart.model.trace.Scatter()
            	switch (e.getData().getLabel().__messageId){
            		case "Scatter":
            			trace.setMode("markers");
            			break;
            		case "Line":
            			trace.setMode("lines");
            			break;
            		case "Area":
            			trace.setMode("lines");
            			trace.setFill("tozeroy");
            			break;
            		case "Bar":
            			trace = new ae.chart.model.trace.Bar().set({
            				x:[0,1],
            				y:[2,2]
            			})
            			break;
            	}
            	model.addTrace(trace);
            }, this);
            
            commands.removeTrace = new qx.ui.command.Command();
            commands.removeTrace.addListener("execute", function(){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	var trace = qx.core.Init.getApplication()._tracesEditor._controller.getSelection().getItem(0);
            	if(trace!=null){
            		model.removeTrace(trace);
            	}
            	
            }, this);
            
            commands.addDatasource = new qx.ui.command.Command();
            commands.addDatasource.addListener("execute", function(){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	var ds = new ae.chart.model.Datasource();
            	ds.setId("Datasource");
            	model.getDatasources().push(ds);
            }, this);
            
            commands.removeDatasource = new qx.ui.command.Command();
            commands.removeDatasource.addListener("execute", function(){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	var ds = qx.core.Init.getApplication()._datasourcesEditor._controller.getSelection().getItem(0);
            	if(ds!=null){
            		model.getDatasources().remove(ds);
            	}
            	
            }, this);
            
            commands.addYAxis = new qx.ui.command.Command();
            commands.addYAxis.addListener("execute", function(){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	if(model.getLayout().getYaxes().length==0){
            		model.getLayout().getYaxes().push(new ae.chart.model.axis.Axis());
            	}else{
            		model.getLayout().getYaxes().push(new ae.chart.model.axis.Axis().set({overlaying:'y'}));
            	}
            	
            }, this);
            
            commands.addXAxis = new qx.ui.command.Command();
            commands.addXAxis.addListener("execute", function(){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	if(model.getLayout().getXaxes().length==0){
            		model.getLayout().getXaxes().push(new ae.chart.model.axis.Axis());
            	}else{
            		model.getLayout().getXaxes().push(new ae.chart.model.axis.Axis().set({overlaying:'x'}));
            	}
            }, this);
            
            commands.removeAxis = new qx.ui.command.Command().set({enabled:false});
            commands.removeAxis.addListener("execute", function(){
            	var model = qx.core.Init.getApplication().getChartView().getModel();
            	var axes = qx.core.Init.getApplication()._axesEditor._controller.getModel();
            	var axis = qx.core.Init.getApplication()._axesEditor._controller.getSelection().getItem(0);
            	var letter = qx.core.Init.getApplication()._axesEditor.radioButtonGroupHBox.getSelection()[0].getLabel()[0];

            	if(axis!=null && axes.length>0){
            		if(letter=="X"){
            			model.getLayout().getXaxes().remove(axis);
            			var axes = model.getLayout().getXaxes();
            			model.getLayout().setXaxes(axes);
            		}
            		if(letter=="Y"){
            			model.getLayout().getYaxes().remove(axis);
            			var axes = model.getLayout().getYaxes();
            			model.getLayout().setYaxes(axes);
            		}
            		
            	}
            	/*var axis = qx.core.Init.getApplication()._stack.__treeView.treeController.getSelection().getItem(0);
            	if(axis!=null){
            		if(axis.getName().substring(0,5)=="xaxis" || axis.getName().substring(0,5)=="yaxis" ){
                    	var obj = {};
                    	obj[axis.getName()]=null;
                    	
                    	qx.core.Init.getApplication().getChartView().relayout(obj);
                    	qx.core.Init.getApplication().getChartView().fireDataEvent("changeSchema");
            		}
            	}*/
            	
            }, this);
            
            commands.addNote = new qx.ui.command.Command();
            commands.addNote.addListener("execute", function(){
            	var qxchart = qx.core.Init.getApplication().getChartView();
            	var newIndex = (qxchart.getLayout().annotations || []).length;
            	var newAnnotation = {x:0,y:0,text:"new note"};
            	qxchart.relayout('annotations[' + newIndex + ']', newAnnotation);
            	qx.core.Init.getApplication().getChartView().fireDataEvent("changeSchema");
            }, this);
            
            commands.removeNote = new qx.ui.command.Command();
            commands.removeNote.addListener("execute", function(){
            	var annotation = qx.core.Init.getApplication()._stack.__treeView.treeController.getSelection().getItem(0);
            	if(annotation!=null){
            		if(annotation.getName().substring(0,12)=="annotations["){                    	
                    	qx.core.Init.getApplication().getChartView().relayout(annotation.getName(),'remove');
                    	qx.core.Init.getApplication().getChartView().fireDataEvent("changeSchema");
            		}
            	}
            	
            }, this);
            
            commands.help = new qx.ui.command.Command("F1");
            commands.help.setEnabled(false);
            
            commands.help.addListener("execute", function(){window.open("https://github.com/adeliz/qooxly/issues");}, this);

            commands.bug = new qx.ui.command.Command();
            commands.bug.addListener("execute", function(){window.open("https://github.com/adeliz/qooxly/issues");}, this);

            commands.about = new qx.ui.command.Command();
            commands.about.addListener("execute", this.about, this);

            this.__commands = commands;
        },

        /**
         * Get the command with the given command id
         *
         * @param commandId {String} the command's command id
         * @return {qx.ui.core.Command} The command
         */
        getCommand : function(commandId) {
            return this.__commands[commandId];
        },

        openPlot : function(){
        	var win = this.win = new qx.ui.window.Window(this
					.tr("Open...")).set({
				width : 300,
				//height:400,
				showMaximize : false,
				showMinimize : false,
				showClose : true,
				contentPadding : 0
			});
			this.win.setLayout(new qx.ui.layout.VBox());

			win.addListener("resize", function() {
				this.center();
			}, win);

			var layout = new qx.ui.layout.Grid(10, 20);
			layout.setSpacing(5);

			var inputWidget = new ae.qooxly.ui.UploadWidget().set({
				margin : 5
			});

			var composite = new qx.ui.container.Composite()
					.set({
						margin : 5
					});
			composite.setLayout(new qx.ui.layout.HBox().set({
				spacing : 4,
				alignX : "right"
			}));
			var cancelButton = new qx.ui.form.Button("Cancel");
			cancelButton.addListener("click", function(e) {
				this.close();
			}, win);
			var addButton = this.addButton = new qx.ui.form.Button(this.tr("Open"));
			this.addButton.addListener("click", function(e) {
				//HTML5 Version - Doesn't work with ie9
            	var charge = new FileReader();

                charge.readAsText(inputWidget.getFiles()[0]);

                var controller = this;
                charge.onloadend = function (e) {

                    var jsmodel = qx.lang.Json.parse(e.target.result);
                    controller.loadFromJson(jsmodel);
                    win.close();
                };
			},this);
			
			composite.add(addButton);
			this.win.add(inputWidget);


			
			composite.add(cancelButton);

			
			this.win.add(composite);
			this.win.show();
        },
        
        openPlotFromUrl : function(){
        	//http://www.topofusion.com/gpx.php
            var win = this.win = new qx.ui.window.Window("Open from URL...");
            win.setLayout(new qx.ui.layout.VBox());
            //win.setShowStatusbar(true);
            //win.setStatus("Status bar");
            win.setShowMinimize(false);
            win.setShowMaximize(false);
            win.setModal(true);
            win.setMinWidth(400);
            win.setMinHeight(100);
            win.addListener("resize", function () {
                this.center();
            }, win);

            this.urlWidget = new qx.ui.form.TextField().set({
                placeholder:"http://www.example.com/myfile.json"
            });
            win.add(this.urlWidget);
            var composite = new qx.ui.container.Composite().set({
                marginTop: 8
            });
            composite.setLayout(new qx.ui.layout.HBox().set({
                spacing: 4,
                alignX: "right"
            }));
            var cancelButton = new qx.ui.form.Button("Cancel");
            cancelButton.addListener("click", function (e) {
                this.close();
            }, win);
            var addButton = new qx.ui.form.Button("Open");
            addButton.addListener("click", function (e) {

                this.win.close();

                this.loadFromUrl(this.urlWidget.getValue());
                //qx.core.Init.getApplication().mainController.loadFromExternalUrl(this.urlWidget.getValue());


            }, this);
            composite.add(addButton);
            composite.add(cancelButton);
            win.add(composite);
            qx.core.Init.getApplication().getRoot().add(win);
            qx.core.Init.getApplication().getRoot().setBlockerColor("#aaa");
            qx.core.Init.getApplication().getRoot().setBlockerOpacity(0.5);
            win.open();
        },
        
        loadFromJson : function(obj){
        	
        	var model = new ae.chart.model.Chart();
        	qx.core.Init.getApplication().getChartView().setModel(model.fromJson(obj));
        	
        	/*var chart = qx.core.Init.getApplication().getChartView();
        	var model = new ae.chart.model.Chart();
        	var layout = new ae.chart.model.layout.Layout().set({
        		title:"Blabla"
        	});
        	
        	model.setLayout(layout);
        	
        	var scatter = new ae.chart.model.trace.Scatter();
        	model.addTrace(scatter);
        	//console.log(model.toJson());
        	chart.setModel(model);*/
        },
        
        loadFromUrl : function(url){
        	var req = new qx.io.request.Xhr(url);
            req.addListener("success", function (e) {
            	var obj = e.getTarget().getResponse();
            	if(typeof(obj) === 'string' || obj instanceof String){
            		obj = JSON.parse(e.getTarget().getResponse());
            	} 
            	
            	this.loadFromJson(obj);
                
            },this);
            req.send();
        },
        
        savePlotAs : function(){
        	
        	//@todo REMOVE
        	/*var model = qx.core.Init.getApplication().getChartModel();
        	console.log(model.toJson());
        	return;*/
        	
        	var win = this.win = new qx.ui.window.Window(this
					.tr("Save chart as...")).set({
				width : 300,
				//height:80,
				showMaximize : false,
				showMinimize : false,
				showClose : true,
				modal : true,
				contentPadding : 10,
				margin : 15
			});
			this.win.setLayout(new qx.ui.layout.HBox());

			win.addListener("resize", function() {
				this.center();
			}, win);

			var textfield = new qx.ui.form.TextField().set({
				placeholder : "File name"
			});
			
			var selectBox = new qx.ui.form.SelectBox().set({
				marginLeft : 5,
				marginRight : 5,
				maxWidth:70
			});
			selectBox.add(new qx.ui.form.ListItem("JSON"));
			selectBox.add(new qx.ui.form.ListItem("SVG"));
			selectBox.add(new qx.ui.form.ListItem("PNG"));
			
			
			var button = new qx.ui.form.Button(this.tr("save"))
					
			this.win.add(textfield, {
				flex : 1
			});
			
			this.win.add(selectBox);
			this.win.add(button);
			this.win.show();

			button.addListener("execute", function() {
				var model = qx.core.Init.getApplication()
						.getChartView();

				var format = selectBox.getSelection()[0].getLabel().toLowerCase();
				//console.log(qx.lang.Json.stringify(json));
				model.saveAs(format,textfield.getValue());
				win.close();
			}, this);
        },
        
        about : function(){
            var win = this.win = new qx.ui.window.Window(this.tr("About")).set({
                width:300,
                height:180,
                showMaximize : false,
                showMinimize : false,
                showClose : true,
                modal : true,
                contentPadding: 10,
                margin : 15
            });
            this.win.setLayout(new qx.ui.layout.VBox());

            win.addListener("resize", function(){
                this.center();
            }, win);

            /*var layout = new qx.ui.layout.VBox();
            layout.setSpacing(5);
            var container  = new qx.ui.container.Composite(layout).set({
                margin:5
            }); */
            var html = new qx.ui.embed.Html("<b>Qooxly</b><br>Chart editor<br>Version "+qx.core.Environment.version+"<br><a target='_blank' href='https://github.com/adeliz/qooxly'>https://github.com/adeliz/qooxly</a>");
            //container.add(html);
            this.win.add(html,{flex:1});
            this.win.show();
        }
    }
});

