/**
 * Chart widget
 * 
 * @asset(ae/chart/plotly.js)
 * 
 * @ignore(Plotly.*)
 */
qx.Class.define("ae.chart.ui.Chart", {
	extend : qx.ui.core.Widget,
	
	properties : {
		/**
		 * Chart's model
		 */
		model : {
			check : "ae.chart.model.Chart",
			nullable : true,
			init : null
		}
	},
	/**
	 * @param model {ae.chart.model.Chart} Chart's model
	 */
	construct : function(model) {
		this.base(arguments);

		this.addListenerOnce("appear", function(e){
			if(model==null){
				model = [{
					  x: [1999, 2000, 2001, 2002],
					  y: [10, 9, 8, 7],
					  type: 'scatter'
					}]
			}
			var plotlychart = this.plotlychart = Plotly.newPlot(this.getContentElement().getDomElement(), model, {title:'My Plot'}); 


			//Liaison avec Plotly

			//var controller = new map.controller.OpenLayers(model,olmap);
			
		},this);

        this.addListener("resize", function (e) {
        	Plotly.Plots.resize(this.getContentElement().getDomElement());
        },this);
        
        
	},

	members : {
		/**
		 * Get Plotly div
		 * @return {Element} Plotly div
		 */
		getPlotlyDiv : function(){
			return this.getContentElement().getDomElement();
		}
	}
});
