qx.Class.define("ae.plotly.ui.Menu",
    {
        extend: qx.ui.menubar.MenuBar,

        construct: function () {
            this.base(arguments);

            this.setPadding(0);
            this.setBackgroundColor("white");

            //File - New/Open.../Open from URL.../Save as.../Print
            var menufile = new qx.ui.menu.Menu();
            var newButton = new qx.ui.menu.Button(this.tr("New"), null, qx.core.Init.getApplication().projectController.getCommand("newplot"));
            var openButton = new qx.ui.menu.Button(this.tr("Open..."), null, qx.core.Init.getApplication().projectController.getCommand("open"));
            var openurlButton = new qx.ui.menu.Button(this.tr("Open from URL..."), null, qx.core.Init.getApplication().projectController.getCommand("openurl"));
            var saveasButton = new qx.ui.menu.Button(this.tr("Save as..."), null, qx.core.Init.getApplication().projectController.getCommand("saveas"));
            var printButton = new qx.ui.menu.Button(this.tr("Print"), null, qx.core.Init.getApplication().projectController.getCommand("print"));
            menufile.add(newButton);
            menufile.addSeparator();
            menufile.add(openButton);
            menufile.add(openurlButton);
            menufile.addSeparator();
            menufile.add(saveasButton);
            //menufile.addSeparator();
            //menufile.add(printButton);
            
            var fileMenu = new qx.ui.menubar.Button(this.tr("Chart"), null, menufile);
            this.add(fileMenu);
            
            //Traces
            
            //Axes
            var menuaxes = new qx.ui.menu.Menu();
            var addXAxisButton = new qx.ui.menu.Button(this.tr("Add X Axis"), null, qx.core.Init.getApplication().projectController.getCommand("addXAxis"));
            var addYAxisButton = new qx.ui.menu.Button(this.tr("Add Y Axis"), null, qx.core.Init.getApplication().projectController.getCommand("addYAxis"));
            var removeAxisButton = new qx.ui.menu.Button(this.tr("Remove Axis"), null, qx.core.Init.getApplication().projectController.getCommand("removeAxis"));
            menuaxes.add(addXAxisButton);
            menuaxes.add(addYAxisButton);
            menuaxes.add(removeAxisButton);
            
            var axesMenu = new qx.ui.menubar.Button(this.tr("Axes"), null, menuaxes);
            this.add(axesMenu);
            
            //Notes
            var menunotes = new qx.ui.menu.Menu();
            var addNoteButton = new qx.ui.menu.Button(this.tr("Add Annotation"), null, qx.core.Init.getApplication().projectController.getCommand("addNote"));
            var removeNoteButton = new qx.ui.menu.Button(this.tr("Remove Annotation"), null, qx.core.Init.getApplication().projectController.getCommand("removeNote"));
            menunotes.add(addNoteButton);
            menunotes.add(removeNoteButton);
            
            var notesMenu = new qx.ui.menubar.Button(this.tr("Annotations"), null, menunotes);
            this.add(notesMenu);
            
            //Shapes
            
            //Legend
            
            //Settings
            var menusettings = new qx.ui.menu.Menu();
            var configButton = new qx.ui.menu.CheckBox(this.tr("Show/Hide editor"));
            configButton.setValue(true);
            configButton.setCommand(qx.core.Init.getApplication().projectController.getCommand("option"));
            menusettings.add(configButton);
            
            var settingsMenu = new qx.ui.menubar.Button(this.tr("Settings"), null, menusettings);
            this.add(settingsMenu);
            
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