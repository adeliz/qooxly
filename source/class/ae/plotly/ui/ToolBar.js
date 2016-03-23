qx.Class.define("ae.plotly.ui.ToolBar",{
    extend : qx.ui.toolbar.ToolBar,

    construct : function(){
        this.base(arguments);

        this.setDecorator("main");       

        var projectController = qx.core.Init.getApplication().projectController;
        
        var actionPart = new qx.ui.toolbar.Part();

        var settingsButton = new qx.ui.toolbar.CheckBox("Settings","ae/plotly/icons/link.png");
        settingsButton.setCommand(projectController.getCommand("option"));
        settingsButton.setValue(true);
        actionPart.add(settingsButton);
        
        this.add(actionPart);
        
    },
    
    members : {
    	
    }
    
    
});
