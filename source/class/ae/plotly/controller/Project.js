qx.Class.define("ae.plotly.controller.Project",{

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
            
            commands.exportdata = new qx.ui.command.Command();
            commands.exportdata.addListener("execute", function(){
                //this.shareLink();
            }, this);
            
            commands.option = new qx.ui.command.Command();
            commands.option.addListener("execute", function(e){
            	if(!e.getData().getValue()){
            		//activate
            		qx.core.Init.getApplication().getChartView().getSettingsUI().show();
                }else{
                	//deactivate
                	qx.core.Init.getApplication().getChartView().getSettingsUI().exclude();
                }
                //this.configure();
            }, this);

            commands.help = new qx.ui.command.Command("F1");
            commands.help.setEnabled(false);
            
            commands.help.addListener("execute", function(){window.open("https://github.com/adeliz/qxplotly/issues");}, this);

            commands.bug = new qx.ui.command.Command();
            commands.bug.addListener("execute", function(){window.open("https://github.com/adeliz/qxplotly/issues");}, this);

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

        configure : function(){
            var win = this.win = new qx.ui.window.Window("Settings").set({
            	margin:0,
            	padding:0
            });
            win.setLayout(new qx.ui.layout.VBox());
            //win.setShowStatusbar(true);
            //win.setStatus("Status bar");
            win.setShowMinimize(false);
            win.setShowMaximize(false);
            //win.setModal(true);
            win.setMinWidth(400);
            win.setMinHeight(600);
            

            win.moveTo(10,120);
            //win.center()
            /*win.addListener("resize", function () {
                this.center();
            }, win);*/

            var toolbar  = qx.core.Init.getApplication().getToolBar();
            
            var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
    			//paddingTop:10,
    			decorator:"main"
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
						"qxPlotly.restyle(data);");

            	
    		},this);

    		pane.addListener("appear",function(){
        		this._ace.resize();
    		},this);
 

            //win.add(pane,{flex:1});
            win.add(qx.core.Init.getApplication().getChartView().qxchart.getSettingsUI(),{flex:1});
            var composite = new qx.ui.container.Composite().set({
                marginTop: 8
            });
            composite.setLayout(new qx.ui.layout.HBox().set({
                spacing: 4,
                alignX: "right"
            }));
            var cancelButton = new qx.ui.form.Button("Apply");
            cancelButton.addListener("click", function (e) {
            	eval(this._ace.getSession().getValue().replace("qxPlotly","qx.core.Init.getApplication().getChartView()"));
            }, this);

            composite.add(cancelButton);
            win.add(composite);
            qx.core.Init.getApplication().getRoot().add(win);
            qx.core.Init.getApplication().getRoot().setBlockerColor("#aaa");
            qx.core.Init.getApplication().getRoot().setBlockerOpacity(0.5);
            win.open();
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
            var html = new qx.ui.embed.Html("<b>Plotly Editor</b><br>Charting Application<br>Version "+qx.core.Environment.version+"<br><a target='_blank' href='https://github.com/adeliz/qxplotly'>https://github.com/adeliz/qxplotly</a>");
            //container.add(html);
            this.win.add(html,{flex:1});
            this.win.show();
        }
    }
});
