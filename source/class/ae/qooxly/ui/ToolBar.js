qx.Class.define("ae.qooxly.ui.ToolBar",{
    extend : qx.ui.toolbar.ToolBar,

    construct : function(){
        this.base(arguments);

        this.setDecorator("main");       

        var projectController = qx.core.Init.getApplication().projectController;
        
        //Project part
        var newProjectButton = new qx.ui.toolbar.Button(this.tr("New chart"),"ae/qooxly/icons/new.png").set({
            show:"icon",
            toolTipText:"New project",
            enabled:true
        });
        newProjectButton.setCommand(projectController.getCommand("newplot"));
        var openProjectButton = new qx.ui.toolbar.Button(this.tr("Open project"),"ae/qooxly/icons/folder.png").set({
            show:"icon",
            toolTipText:"Open project"
        });
        openProjectButton.setCommand(projectController.getCommand("open"));
        var saveProjectButton = new qx.ui.toolbar.Button();
        saveProjectButton.setCommand(projectController.getCommand("saveas"));
        
        var projectpart = new qx.ui.toolbar.Part();
        this.add(projectpart);
        projectpart.add(newProjectButton);
        projectpart.add(openProjectButton);
        projectpart.add(saveProjectButton);
        
        //drag mode part
        var dragmodePart = new qx.ui.toolbar.Part().set({enabled:true});
        this.add(dragmodePart);
        
        var panButton = new qx.ui.toolbar.RadioButton(this.tr("Pan"),"ae/qooxly/icons/move.png").set({
        	model:qx.data.marshal.Json.createModel("pan"),
        	show:"icon",
            toolTipText:this.tr("Pan")
        });
        /*panButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"pan"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });*/

        var zoomButton = new qx.ui.toolbar.RadioButton(this.tr("Zoom"),"ae/qooxly/icons/zoom.png").set({
        	model:qx.data.marshal.Json.createModel("zoom"),
            show:"icon",
            toolTipText:this.tr("Zoom")
        });
        /*zoomButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"zoom"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });*/
        
        var selectBoxButton = new qx.ui.toolbar.RadioButton(this.tr("Box select"),"ae/qooxly/icons/select.png").set({
            show:"icon",
            toolTipText:this.tr("Box select")
        });
        selectBoxButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"select"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var lassoBoxButton = new qx.ui.toolbar.RadioButton(this.tr("Lasso select"),"ae/qooxly/icons/lasso.png").set({
            show:"icon",
            toolTipText:this.tr("Lasso select")
        });
        lassoBoxButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"lasso"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var radioGroup1 = new qx.ui.form.RadioGroup(panButton,zoomButton,selectBoxButton,lassoBoxButton);
        //radioGroup1.setAllowEmptySelection(true);
        //panButton.setValue(false);
        radioGroup1.setSelection([zoomButton]);
        qx.core.Init.getApplication().getChartView().bind("model.layout.dragmode", radioGroup1, "modelSelection[0]");
        radioGroup1.bind("modelSelection[0]", qx.core.Init.getApplication().getChartView(),"model.layout.dragmode" );
        
        
        dragmodePart.add(panButton);
        dragmodePart.add(zoomButton);
        /*dragmodePart.addSeparator();
        dragmodePart.add(selectBoxButton);
        dragmodePart.add(lassoBoxButton);*/
        
        //Hover mode part
        var hovermodePart = new qx.ui.toolbar.Part().set({enabled:false});
        this.add(hovermodePart);
        
        var xButton = new qx.ui.toolbar.RadioButton(this.tr("X"),"ae/qooxly/icons/xlabel.png").set({
            show:"icon",
            toolTipText:this.tr("X")
        });
        xButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":"x"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var yButton = new qx.ui.toolbar.RadioButton(this.tr("Y"),"ae/qooxly/icons/ylabel.png").set({
            show:"icon",
            toolTipText:this.tr("Y")
        });
        yButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":"y"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var closestButton = new qx.ui.toolbar.RadioButton(this.tr("x"),"ae/qooxly/icons/label.png").set({
            show:"icon",
            toolTipText:this.tr("Closest")
        });
        closestButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":"closest"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var falseButton = new qx.ui.toolbar.RadioButton(this.tr("x"),"ae/qooxly/icons/nolabel.png").set({
            show:"icon",
            toolTipText:this.tr("False")
        });
        falseButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":false});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var radioGroup2 = new qx.ui.form.RadioGroup(xButton,yButton,closestButton,falseButton);
        radioGroup2.setAllowEmptySelection(true);
        xButton.setValue(false);
        
        hovermodePart.add(xButton);
        hovermodePart.add(yButton);
        hovermodePart.add(closestButton);
        hovermodePart.add(falseButton);
        
        this.addSpacer();
        var viewPart = new qx.ui.toolbar.Part();
        var redrawButton = new qx.ui.toolbar.Button(this.tr("Redraw"));
        redrawButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().redraw();
        });
        viewPart.add(redrawButton);
        this.add(viewPart);
        
		
        
    },
    
    members : {

    }
    
    
});
