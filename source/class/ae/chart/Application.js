/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "qxchart"
 *
 * @asset(ae/chart/*)
 */
qx.Class.define("ae.chart.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */

      // Create a button
      var button1 = new qx.ui.form.Button("First Button", "ae/chart/test.png");

      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
      doc.add(button1, {left: 100, top: 50});
      
      var trace1 = {
    		  x: [1, 2, 3, 4],
    		  y: [10, 15, 13, 17],
    		  mode: 'markers',
    		  type: 'scatter'
    		};

    		var trace2 = {
    		  x: [2, 3, 4, 5],
    		  y: [16, 5, 11, 9],
    		  mode: 'lines',
    		  type: 'scatter'
    		};

    		var trace3 = {
    		  x: [1, 2, 3, 4],
    		  y: [12, 9, 15, 12],
    		  mode: 'lines+markers',
    		  type: 'scatter'
    		};

    		var data = [trace1, trace2, trace3];
    		
      doc.add(new ae.chart.ui.Chart(data),{edge:0})
      // Add an event listener
      button1.addListener("execute", function(e) {
        alert("Hello World!");
      });
    }
  }
});
