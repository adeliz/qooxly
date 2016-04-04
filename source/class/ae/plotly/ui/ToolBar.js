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
        
        //Action part
        /*var actionPart = new qx.ui.toolbar.Part();
        this.add(actionPart);
        
        var panButton = new qx.ui.toolbar.RadioButton(this.tr("Pan"),"ae/plotly/icons/link.png");
        panButton.addListener("execute",function(e){
        	ae.plotly.Util.handleCartesian(qx.core.Init.getApplication().getChartView().getPlotlyDiv(),"dragmode","lasso");
        });
        //panButton.setCommand(projectController.getCommand("pan"));
        var zoomButton = new qx.ui.toolbar.RadioButton(this.tr("Zoom"),"ae/plotly/icons/link.png");
        //zoomButton.setCommand(projectController.getCommand("zoom"));
        var selectBoxButton = new qx.ui.toolbar.RadioButton(this.tr("Box select"),"ae/plotly/icons/link.png");
        //selectBoxButton.setCommand(projectController.getCommand("boxselect"));
        var lassoBoxButton = new qx.ui.toolbar.RadioButton(this.tr("Lasso select"),"ae/plotly/icons/link.png");
        //lassoBoxButton.setCommand(projectController.getCommand("lassoselect"));
        var radioGroup = new qx.ui.form.RadioGroup(panButton,zoomButton,selectBoxButton,lassoBoxButton);
        
        actionPart.add(panButton);
        actionPart.add(zoomButton);
        actionPart.addSeparator();
        actionPart.add(selectBoxButton);
        actionPart.add(lassoBoxButton);*/
        
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
