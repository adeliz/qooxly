qx.Class.define("ae.qooxly.ui.editor.Code", {
	
	extend : qx.ui.container.Composite,

	/**
	 * Create a user interface for the code editor
	 * @param chart {ae.qooxly.ui.Chart} Chart widget
	 */
	construct : function(chart) {
		this.base(arguments);

		var layout = new qx.ui.layout.VBox();
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		var pane = new qx.ui.container.Composite(new qx.ui.layout.VBox());

		pane.addListenerOnce("appear",function(){
    		var editor = this._ace = window.ace.edit(pane.getContentElement().getDomElement());
        	editor.getSession().setMode("ace/mode/javascript");
        	//var ed = this._editor;
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


		this.add(pane,{flex:1});
        var composite = new qx.ui.container.Composite().set({
            margin: 4
        });
        composite.setLayout(new qx.ui.layout.HBox().set({
            spacing: 4,
            alignX: "right"
        }));
        var runButton = new qx.ui.form.Button("Run");
        runButton.addListener("click", function (e) {
        	eval(this._ace.getSession().getValue());
        }, this);

        composite.add(runButton);
        this.add(composite);
	}
});