/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

/**
 * This is the main application class of qxplotly. It's only used for testing.
 *
 * @asset(ae/plotly/*)
 */
qx.Class.define("ae.plotly.Application", {
	extend : qx.application.Standalone,

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

			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug")) {
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

			// Document is the application root
			var doc = this.getRoot();

			var trace1 = {
				x : [ 1, 2, 3, 4 ],
				y : [ 10, 15, 13, 17 ],
				mode : 'markers',
				type : 'scatter'
			};

			var trace2 = {
				x : [ 2, 3, 4, 5 ],
				y : [ 16, 5, 11, 9 ],
				mode : 'lines',
				type : 'scatter'
			};

			var trace3 = {
				x : [ 1, 2, 3, 4 ],
				y : [ 12, 9, 15, 12 ],
				mode : 'lines+markers',
				type : 'scatter'
			};

			var data = [ trace1, trace2 ];
			var layout={title:'Test'};
			
			var splitpane = new qx.ui.splitpane.Pane("horizontal");
			
			var chart = new ae.plotly.ui.Chart();
			console.log(chart.isReady());
			
			splitpane.add(chart, 1);
			splitpane.add(chart.getSettingsUI(), 0);
			
			doc.add(splitpane, {
				edge : 0
			});
			
			/**
			 * Because Plotly needs a DOM element, after the qxchart creation, 2 tehcnics are possbile to plot a chart :
			 *  - add the chart widget to the application root, flush and then plot the chart chart.plot(data,layout);
			 *  - use the "appear" event with the addListnerOnce method.
			 *    Be careful to call the addListenerOnce("appear",...) method before the chart widget apparition otherwise it won't be triggered  
			 */
			qx.ui.core.queue.Manager.flush();
			
			chart.plot(data,layout);
			
			var req = new qx.io.request.Xhr("http://cmhm-sig:8888/notebooks/Adrien/Data/Charts/simple.json","GET");
			req.addListener("success", function(e) {
				var ptchart = JSON.parse(e.getTarget().getResponse());
				
				//chart.addListenerOnce("appear",function(e){
					chart.plot(ptchart.data,ptchart.layout);
					
				//});
				
				
			});
			req.send();
			
			
		}
	}
});
