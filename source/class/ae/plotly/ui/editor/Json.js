qx.Class.define("ae.plotly.ui.editor.Json", {
	
	extend : qx.ui.container.Composite,

	/**
	 * Create a user interface for the json editor
	 * @param chart {ae.plotly.ui.Chart} Chart widget
	 */
	construct : function(chart) {
		this.base(arguments);
		
		var lyt = new qx.ui.layout.VBox();
		this.setLayout(lyt);
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
        	var qxchart = qx.core.Init.getApplication().getChartView();
        	var json = JSON.stringify({"data":qxchart.getData(),"layout":qxchart.getLayout()}, null, '\t');
            	editor.getSession().setValue(json);

        	
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
        this.add(composite);
        chart.addListener("changeData",function(e){
        	var qxchart = qx.core.Init.getApplication().getChartView();
        	var json = JSON.stringify({"data":qxchart.getData(),"layout":qxchart.getLayout()}, null, '\t');
        	if(this._ace){
        		this._ace.getSession().setValue(json);
        	}
        	
        },this);
        chart.addListener("changeLayout",function(e){
        	var qxchart = qx.core.Init.getApplication().getChartView();
        	var json = JSON.stringify({"data":qxchart.getData(),"layout":qxchart.getLayout()}, null, '\t');
        	if(this._ace){
        		this._ace.getSession().setValue(json);
        	}
        },this);
	}
});