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
        var dragmodePart = new qx.ui.toolbar.Part();
        this.add(dragmodePart);
        
        var panButton = new qx.ui.toolbar.RadioButton(this.tr("Pan"),"ae/qooxly/icons/move.png").set({
        	model:qx.data.marshal.Json.createModel("pan"),
        	show:"icon",
            toolTipText:this.tr("Pan")
        });

        var zoomButton = new qx.ui.toolbar.RadioButton(this.tr("Zoom"),"ae/qooxly/icons/zoom.png").set({
        	model:qx.data.marshal.Json.createModel("zoom"),
            show:"icon",
            toolTipText:this.tr("Zoom")
        });
        
        var radioGroup1 = new qx.ui.form.RadioGroup(panButton,zoomButton);
        //radioGroup1.setAllowEmptySelection(true);
        //panButton.setValue(false);
        radioGroup1.setSelection([zoomButton]);
        qx.core.Init.getApplication().getChartView().bind("model.layout.dragmode", radioGroup1, "modelSelection[0]");
        radioGroup1.bind("modelSelection[0]", qx.core.Init.getApplication().getChartView(),"model.layout.dragmode" );
        
        
        dragmodePart.add(panButton);
        dragmodePart.add(zoomButton);
        
        //Hover mode part
        var hovermodePart = new qx.ui.toolbar.Part();
        this.add(hovermodePart);
        
        var xButton = new qx.ui.toolbar.RadioButton(this.tr("X"),"ae/qooxly/icons/xlabel.png").set({
        	model:qx.data.marshal.Json.createModel("x"),
        	show:"icon",
            toolTipText:this.tr("X")
        });
        
        var yButton = new qx.ui.toolbar.RadioButton(this.tr("Y"),"ae/qooxly/icons/ylabel.png").set({
        	model:qx.data.marshal.Json.createModel("y"),
        	show:"icon",
            toolTipText:this.tr("Y")
        });
        
        var closestButton = new qx.ui.toolbar.RadioButton(this.tr("x"),"ae/qooxly/icons/label.png").set({
        	model:qx.data.marshal.Json.createModel("closest"),
        	show:"icon",
            toolTipText:this.tr("Closest")
        });
        
        var falseButton = new qx.ui.toolbar.RadioButton(this.tr("x"),"ae/qooxly/icons/nolabel.png").set({
        	model:qx.data.marshal.Json.createModel(false),
        	show:"icon",
            toolTipText:this.tr("False")
        });
        
        var radioGroup2 = new qx.ui.form.RadioGroup(xButton,yButton,closestButton,falseButton);
        radioGroup2.setAllowEmptySelection(true);
        //radioGroup2.setSelection([closestButton]);
        qx.core.Init.getApplication().getChartView().bind("model.layout.hovermode", radioGroup2, "modelSelection[0]");
        radioGroup2.bind("modelSelection[0]", qx.core.Init.getApplication().getChartView(),"model.layout.hovermode" );
        
        hovermodePart.add(xButton);
        hovermodePart.add(yButton);
        hovermodePart.add(closestButton);
        hovermodePart.add(falseButton);
        
        /*this.addSpacer();
        var viewPart = new qx.ui.toolbar.Part();
        var redrawButton = new qx.ui.toolbar.Button(this.tr("Redraw"));
        redrawButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().redraw();
        });
        viewPart.add(redrawButton);
        this.add(viewPart);*/
        
		
        
    },
    
    members : {

    }
    
    
});
