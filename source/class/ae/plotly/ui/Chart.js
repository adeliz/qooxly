/**
 * Chart widget
 * 
 * @asset(ae/plotly/plotly.js)
 * 
 * @ignore(Plotly.*)
 * @ignore(saveAs.*)
 */
qx.Class.define("ae.plotly.ui.Chart", {
	extend : qx.ui.core.Widget,

	properties : {
		
		/**
		 * Plotly data
		 */
		data: {
			check : "Object"
		},
		
		/**
		 * Plotly layout
		 */
		layout:{
			check : "Object"
		},
		
		/**
		 * Settings user interface
		 */
		settingsUI: {
			check : "qx.ui.container.Composite"
			
		}
	},

	construct : function() {
		this.base(arguments);

		this.setDecorator("main");

		this.setSettingsUI(new ae.plotly.ui.Settings(this));
		
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
		},
		
		/**
		 * Change styling of an existing plot
		 * @param update {Object} updated attributes
		 * @param traces {Array} integer or array of integers for the traces to alter (all if omitted)
		 */
		restyle : function(update,traces){
			Plotly.restyle(this.getPlotlyDiv(),update,traces)
			this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Change layout of an existing plot
		 * @param update {Object} updated attributes
		 */
		relayout : function(update){
			Plotly.relayout(this.getPlotlyDiv(),update);
			this.setLayout(this.getPlotlyDiv().layout);
		},
		
		/**
		 * Add data traces to an existing graph
		 * @param traces  {Object} The object or array of objects to add
		 * @param indices {Array} Locations to add traces
		 */
		addTraces : function(traces,indices){
			Plotly.addTraces(this.getPlotlyDiv(),traces,indices);
			this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Delete traces from an existing graph
		 * @param indices {Array} indices of traces to remove
		 */
		deleteTraces : function(indices){
			Plotly.deleteTraces(this.getPlotlyDiv(),indices);
			this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Move traces at currentIndices array to locations in newIndices array. If newIndices is omitted, currentIndices will be moved to the end
		 * @param currentindices {Array} The locations of traces to be moved
		 * @param newindices {Array} The locations to move traces to
		 */
		moveTraces : function(currentindices,newindices){
			Plotly.moveTraces(this.getPlotlyDiv(),currentindices,newindices);
			this.setData(this.getPlotlyDiv().data);
		},
		
		
		/**
		 * Convenient function to force a full redraw
		 */
		redraw : function(){
			this.getPlotlyDiv().data = this.getData();
			this.getPlotlyDiv().layout = this.getLayout();
			Plotly.redraw(this.getPlotlyDiv());
		},
		
		/**
		 * Plot a new chart
		 * @param data {Object} Plotly data
		 * @param layout {Object} Plotly layout
		 */
		plot : function(data,layout){
			Plotly.newPlot(this.getPlotlyDiv(), data, layout);//,{modeBarButtonsToRemove: ['sendDataToCloud','hoverCompareCartesian'],displaylogo: false} );
			
			this.setData(this.getPlotlyDiv().data);
			this.setLayout(this.getPlotlyDiv().layout);
			//Remove modebar
			document.getElementsByClassName('modebar')[0].style.display="None";
			this.getSettingsUI().loadSettings();
		},
		
		/**
		 * Export chart to json, svg or image
		 * @param format {String} Format 'jpeg' | 'png' | 'json' | 'svg'
		 */
		exportTo : function(format){
			switch (format){
			case "svg" :
				var svg = Plotly.Snapshot.toSVG(this.getPlotlyDiv());
				var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
				saveAs(blob, "chart."+format);
				break;
			
			case "json" :
				var json = JSON.stringify({data:this.getData(),layout:this.getLayout()});
				var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
				saveAs(blob, "chart."+format);
				break;
				
			case "png" :
			case "jpeg" :
				
				//Should use canvg for IE11 : https://github.com/gabelerner/canvg
				
				var gd = this.getPlotlyDiv();


		        var ev = Plotly.Snapshot.toImage(gd, {format: format});

		        var filename = 'chart';
		        filename += '.' + format;

		        ev.once('success', function(result) {
		        	

		            var downloadLink = document.createElement('a');
		            downloadLink.href = result;
		            downloadLink.download = filename; // only supported by FF and Chrome

		            document.body.appendChild(downloadLink);
		            downloadLink.click();
		            document.body.removeChild(downloadLink);

		            ev.clean();
		        });

		        ev.once('error', function(err) {
		            gd._snapshotInProgress = false;


		            console.error(err);

		            ev.clean();
		        });
		        break;
			}
		},
		
		/**
		 * Check if chart has a valid div to use Plotly.js
		 * @return {Boolean} Ready status
		 */
		isReady : function(){
			if(this.getPlotlyDiv()){
				return true;
			}else{
				return false;
			}
		}
	}
});