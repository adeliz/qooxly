qx.Class.define("ae.plotly.ui.Menu",
    {
        extend: qx.ui.menubar.MenuBar,

        construct: function () {
            this.base(arguments);

            this.setPadding(0);
            this.setBackgroundColor("white");

            //File - New/Open.../Open from URL.../Save as.../Print
            
            //Data - Add/Move/Edit/Delete
            
            //Axes
            
            //Layout
            
            //Shapes
            
            //Annotations
            
            //Legend
            
            //Settings
            
            //Help
            var menuhelp = new qx.ui.menu.Menu();
            var helpButton = new qx.ui.menu.Button(this.tr("Help contents"), null, qx.core.Init.getApplication().projectController.getCommand("help"));
            var bugButton = new qx.ui.menu.Button(this.tr("Report an issue"), null, qx.core.Init.getApplication().projectController.getCommand("bug"));
            var aboutButton = new qx.ui.menu.Button(this.tr("About"), null, qx.core.Init.getApplication().projectController.getCommand("about"));
            menuhelp.add(helpButton);
            menuhelp.add(bugButton);
            menuhelp.add(aboutButton);

            var helpMenu = new qx.ui.menubar.Button(this.tr("Help"), null, menuhelp);

            this.add(helpMenu);
        }
    });