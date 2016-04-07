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
        
        var panButton = new qx.ui.toolbar.RadioButton(this.tr("Pan"),"ae/qooxly/icons/move.png").set({
            show:"icon",
            toolTipText:this.tr("Pan")
        });
        panButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"pan"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });

        var zoomButton = new qx.ui.toolbar.RadioButton(this.tr("Zoom"),"ae/qooxly/icons/zoom.png").set({
            show:"icon",
            toolTipText:this.tr("Zoom")
        });
        zoomButton.addListener("execute",function(e){
        	qx.core.Init.getApplication().getChartView().relayout({"dragmode":"zoom"});
        	Plotly.Fx.init(qx.core.Init.getApplication().getChartView().getPlotlyDiv());
        });
        
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
        this.add(viewPart);
        
		var treeView = new qx.ui.toolbar.RadioButton("Tree Editor","ae/qooxly/icons/tree.png").set({
            //show:"icon",
            toolTipText:this.tr("Tree editor")
        });
		treeView.setModel('tree');
		var jsonView = new qx.ui.toolbar.RadioButton("JSON Editor","ae/qooxly/icons/json.png").set({
            //show:"icon",
            toolTipText:this.tr("Json editor")
        });
		jsonView.setModel('json');
		
		treeView.setUserData("value", "tree");
		jsonView.setUserData("value", "json");
		
		viewPart.add(treeView);
		viewPart.add(jsonView);

        var consoleView = new qx.ui.toolbar.RadioButton("Code Editor","ae/qooxly/icons/code.png").set({
            //show:"icon",
            toolTipText:this.tr("Code Editor")
        });

        consoleView.setUserData("value", "console");
        consoleView.setModel('console');

        viewPart.add(consoleView);

        var viewGroup = this.__viewGroup = new qx.ui.form.RadioGroup;
        viewGroup.setAllowEmptySelection(true);
        viewGroup.add(treeView,jsonView,consoleView);
        
        viewGroup.addListener('changeSelection',this.__syncRightView,this);
        
    },
    
    members : {
		
		/**
	     * TODOC
	     *
	     */
	    __syncRightView :  function(e)
	    {
	      //var theOtherGroup = e.getTarget()===this.__viewGroup ? this.__menuViewRadioGroup : this.__viewGroup;
	      var selected = e.getData()[0];
	      /*if(theOtherGroup && selected) {
	        theOtherGroup.setModelSelection([selected.getModel()]);
	      }*/
	      var stack = qx.core.Init.getApplication()._stack;
	      var show = selected != null ? selected.getUserData("value") : "";
	      switch(show)
	      {
	        case "tree":
	        	stack.setSelection([qx.core.Init.getApplication()._stack.__treeView]);
	        	stack.show();
	        	break;

	        case "json":
	        	stack.setSelection([qx.core.Init.getApplication()._stack.__jsonView]);
	        	stack.show();
	        	break;

	        case "console":
	        	stack.setSelection([qx.core.Init.getApplication()._stack.__consoleView]);
	        	stack.show();
	        	break;

	        default:
	        	stack.resetSelection();
	        	stack.exclude();
	      }
	    }
    }
    
    
});
