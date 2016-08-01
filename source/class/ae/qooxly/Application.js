/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

/**
 * This is the main application class of qooxly. It's only used for testing.
 *
 * @asset(ae/qooxly/*)
 */
qx.Class.define("ae.qooxly.Application", {
	extend : qx.application.Standalone,

	properties :
	  {
	      /**
	       * Chart view
	       */
	      chartView : {
	          init : null
	      },
	      /**
	       * ToolBar
	       */
	      toolBar : {
	          init : null
	      },
	      /**
	       * Menu
	       */
	      menu : {
	          init : null
	      },
	      /**
	       * Model
	       */
	      chartModel : {
	          init : null
	      }
	  },
	  
	/*
	 *****************************************************************************
	   MEMBERS
	 *****************************************************************************
	 */

	members : {
		/**
		 * This method contains the initial application code and gets called 
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function() {
			// Call super class
			this.base(arguments);

			qx.core.Environment.version = "0.1";
			
			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console;
			}

			//set theme
	        qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Indigo);

	        
	        //the application root
	        var root = this._root = this.getRoot();

	        //---------------------------Model-----------------------------------
	        var projectController = this.projectController = new ae.qooxly.controller.Project();

	        var model = new ae.chart.model.Chart();
			this.setChartModel(model);
	        /*var model = new ae.map.model.Map();
	        this.setModelMap(model);


	        var mapController = this.mapController = new map.controller.Map();
	        this.setEditorView(new map.view.EditorView());*/
	        //--------------------------Header----------------------------------------------------
	        
	        var workbench = new qx.ui.container.Composite();

	        var layout = new qx.ui.layout.VBox;
	        //layout.setSeparator("separator-vertical");
	        workbench.setLayout(layout);

	        var header = new qx.ui.container.Composite(
	            new qx.ui.layout.HBox()).set({
	                decorator: null
	            });
	        //header.setAppearance("app-header");
	        var img = new qx.ui.basic.Image("ae/qooxly/app_header.png").set({
	            marginRight: 15
	        });
	        var title = this.title = new qx.ui.basic.Label("Qooxly <span style='color:#999; font-size:14px; font-weight:normal'>- Chart Editor</span>").set({
	            marginTop: 10,
	            marginLeft: 6,
	            rich: true,
	            textColor: "#333"
	        });
	        var myFont = new qx.bom.Font(18, ["Arial", "Segoe UI"]).set({
	            bold: true
	        });
	        title.setFont(myFont);
	        //title.setFont("Helvetica");

	        var version = new qx.ui.basic.Label("Version 0.1").set({
	            marginTop: 17,
	            marginRight: 40
	        });
	        version.setFont("default");

	        header.add(img);

	        var midHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox());
	        midHeader.add(title);

	        this.setMenu(new ae.qooxly.ui.Menu());
	        midHeader.add(this.getMenu());

	        header.add(midHeader);
	        header.add(new qx.ui.core.Widget(),{flex:1});

	        workbench.add(header);
	      //----------------------------Body----------------------------------------------------

	        var splitpane = new qx.ui.splitpane.Pane("horizontal").set({margin:5});
	        splitpane.getChildControl("splitter").setBackgroundColor("white");
	        
	        var chartLayout = new ae.chart.model.layout.Layout().set({
	        	title:"My chart"
	        });
	        //var font = new ae.chart.model.Font(null,"Arial","#FF0FF0");
	        //chartLayout.setFont(font);
	        model.setLayout(chartLayout);
	        var scatter = new ae.chart.model.trace.Scatter();
	        scatter.setX([1, 2, 3, 4]);
	        scatter.setY([10, 15, 13, 17]);
	        scatter.setMode("markers");
	        //scatter.setName("Temperature");
	        model.addTrace(scatter);
	        var scatter2 = new ae.chart.model.trace.Scatter();
	        scatter2.setX([1, 2, 3, 4]);
	        scatter2.setY([8, 12, 18, 12]);
	        scatter2.setText(["valA", "valB", "", "valD"]);
	        scatter2.setMode("lines");
	        scatter2.setName("Humidity");
	        //var font = new ae.chart.model.Font(36,"Arial","#FF0FF0");
	        //scatter2.setTextfont(font);
	        model.addTrace(scatter2);
	        var scatter3 = new ae.chart.model.trace.Scatter();
	        scatter3.setX([1, 2, 3, 4]);
	        scatter3.setY([18, 14, 7, 9]);
	        scatter3.setMode("lines");
	        scatter3.setConnectgaps(true);
	        scatter3.setOpacity(0.2);
	        scatter3.setVisible(false);
	        
	        model.addTrace(scatter3);
	        var qxchart = new ae.chart.ui.Chart(model).set({
	        	decorator : "main"
	        });
	        
	        window.Qooxly=qxchart;
	        this.setChartView(qxchart);
	        
	        //----------------------------ToolBar-------------------------------------------------
	        this.setToolBar(new ae.qooxly.ui.ToolBar());
	        workbench.add(this.getToolBar());
	        

	        splitpane.add(this.getChartView(), 2);

	        var tabView = new qx.ui.tabview.TabView();
	        
	        var page1 = new qx.ui.tabview.Page("Traces");
	        page1.setLayout(new qx.ui.layout.VBox());
	        var splitpane2 = new qx.ui.splitpane.Pane("vertical").set({margin:5});
	        splitpane2.getChildControl("splitter").setBackgroundColor("white");
	        this._tracesEditor = new ae.qooxly.ui.Traces();
	        splitpane2.add(this._tracesEditor,0);
	        
	        var tabView2 = new qx.ui.tabview.TabView();
	        var page21 = new qx.ui.tabview.Page("Data");
	        page21.setLayout(new qx.ui.layout.VBox());
	        page21.add(new ae.qooxly.ui.form.Data(),{flex:1});
	        tabView2.add(page21);
	        
	        var page22 = new qx.ui.tabview.Page("Properties");
	        page22.setLayout(new qx.ui.layout.VBox());
	        page22.add(new ae.qooxly.ui.form.Scatter(),{flex:1});
	        tabView2.add(page22);
	        
	        splitpane2.add(tabView2,1);
	        page1.add(splitpane2,{flex:1});
	        tabView.add(page1);
	        
	        var page2 = new qx.ui.tabview.Page("Layout");
	        page2.setLayout(new qx.ui.layout.VBox());
	        page2.add(new ae.qooxly.ui.form.Layout(),{flex:1});
	        tabView.add(page2);
	        
	        var page3 = new qx.ui.tabview.Page("Axes");
	        page3.setLayout(new qx.ui.layout.VBox());
	        this._axesEditor = new ae.qooxly.ui.Axes();
	        page3.add(this._axesEditor,{flex:1});
	        tabView.add(page3);
	        
			
			splitpane.add(tabView, 0);
			
	        workbench.add(splitpane, {flex : 1});

	        root.add(workbench, {
	            edge : 0
	        });
	        
	        //Check query parameters
	        var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == "url"){
                	projectController.loadFromUrl(pair[1]);
                }
            }
		}
	}
});
