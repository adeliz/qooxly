qx.Class.define("ae.plotly.ui.ToolBar",{
    extend : qx.ui.toolbar.ToolBar,

    construct : function(){
        this.base(arguments);

        this.setDecorator("main");       

        var projectController = qx.core.Init.getApplication().projectController;
        
        //Project part
        var newProjectButton = new qx.ui.toolbar.Button(this.tr("New chart"),"ae/plotly/icons/new.png").set({
            show:"icon",
            toolTipText:"New project",
            enabled:true
        });
        newProjectButton.setCommand(projectController.getCommand("newplot"));
        var openProjectButton = new qx.ui.toolbar.Button(this.tr("Open project"),"ae/plotly/icons/folder.png").set({
            show:"icon",
            toolTipText:"Open project",
            enabled:true
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
        var dragmodePart = new qx.ui.toolbar.Part();
        this.add(dragmodePart);
        
        var panButton = new qx.ui.toolbar.RadioButton(this.tr("Pan"),"ae/plotly/icons/move.png").set({
            show:"icon",
            toolTipText:this.tr("Pan")
        });
        panButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"pan"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });

        var zoomButton = new qx.ui.toolbar.RadioButton(this.tr("Zoom"),"ae/plotly/icons/zoom.png").set({
            show:"icon",
            toolTipText:this.tr("Zoom")
        });
        zoomButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"zoom"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var selectBoxButton = new qx.ui.toolbar.RadioButton(this.tr("Box select"),"ae/plotly/icons/select.png").set({
            show:"icon",
            toolTipText:this.tr("Box select")
        });
        selectBoxButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"select"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var lassoBoxButton = new qx.ui.toolbar.RadioButton(this.tr("Lasso select"),"ae/plotly/icons/lasso.png").set({
            show:"icon",
            toolTipText:this.tr("Lasso select")
        });
        lassoBoxButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"lasso"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var radioGroup1 = new qx.ui.form.RadioGroup(panButton,zoomButton,selectBoxButton,lassoBoxButton);
        radioGroup1.setAllowEmptySelection(true);
        panButton.setValue(false);
        
        dragmodePart.add(panButton);
        dragmodePart.add(zoomButton);
        dragmodePart.addSeparator();
        dragmodePart.add(selectBoxButton);
        dragmodePart.add(lassoBoxButton);
        
        //Hover mode part
        var hovermodePart = new qx.ui.toolbar.Part();
        this.add(hovermodePart);
        
        var xButton = new qx.ui.toolbar.RadioButton(this.tr("X"),"ae/plotly/icons/xlabel.png").set({
            show:"icon",
            toolTipText:this.tr("X")
        });
        xButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":"x"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var yButton = new qx.ui.toolbar.RadioButton(this.tr("Y"),"ae/plotly/icons/ylabel.png").set({
            show:"icon",
            toolTipText:this.tr("Y")
        });
        yButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":"y"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var closestButton = new qx.ui.toolbar.RadioButton(this.tr("x"),"ae/plotly/icons/label.png").set({
            show:"icon",
            toolTipText:this.tr("Closest")
        });
        closestButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"hovermode":"closest"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
        var falseButton = new qx.ui.toolbar.RadioButton(this.tr("x"),"ae/plotly/icons/nolabel.png").set({
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
        
        //Editor part
        var editorPart = new qx.ui.toolbar.Part();

        var settingsButton = new qx.ui.toolbar.CheckBox(this.tr("Editor"),"ae/plotly/icons/link.png");
        settingsButton.setCommand(projectController.getCommand("option"));
        settingsButton.setValue(true);
        editorPart.add(settingsButton);
        
        this.add(editorPart);
        
    },
    
    members : {
    	
    }
    
    
});
