/**
 * Chart widget
 * 
 * @asset(ae/plotly/plotly.js)
 * 
 * @ignore(Plotly.*)
 * @ignore(saveAs.*)
 */
qx.Class.define("ae.plotly.ui.Chart", {
	extend : qx.ui.container.Scroll,

	properties : {
		
		/**
		 * Plotly data
		 */
		data: {
			check : "Object",
			event : "changeData",
			init : null
		},
		
		/**
		 * Plotly layout
		 */
		layout: {
			check : "Object",
			event : "changeLayout",
			init : null
		},
		
		/**
		 * Schema
		 * only used to fire tree reloading when needed (search 'fireDataEvent("changeSchema")'
		 */
		schema: {
			check : "Object",
			event : "changeSchema",
			init : null
		}
	},

	construct : function() {
		this.base(arguments);

		this.setDecorator("main");

		var c = new qx.ui.container.Composite();
		this.add(c);

		var l = new qx.ui.layout.VBox();
		c.setLayout(l);
		l.setAlignX("center");
		l.setAlignY("middle");

		var w = this.w = new qx.ui.core.Widget().set({
		  minWidth:800,
		  minHeight:600
		});
		w.setAllowGrowX(false);
		w.setAllowGrowY(false);
		c.add(w,{flex:1});
		
		this.add(c);

        this.w.addListener("resize", function (e) {
        	if(this.getPlotlyDiv()){
        		Plotly.Plots.resize(this.getPlotlyDiv());
        	}
        },this);        
	},

	members : {
		/**
		 * Get Plotly div
		 * @return {Element} Plotly div
		 */
		getPlotlyDiv : function(){
			return this.w.getContentElement().getDomElement();
		},
		
		/**
		 * Change styling of an existing plot
		 * @param attribute {Object} attribute string (like 'marker.symbol') and value will be passed in the second argument or attribute object (like '{astr1:val1, astr2:val2...}') allows setting multiple attributes simultaneously and the second argument will be ignored
		 * @param value {Object} value to give this attribute
		 * @param traces {Array} integer or array of integers for the traces to alter (all if omitted)
		 */
		restyle : function(attribute, value, traces){
			Plotly.restyle(this.getPlotlyDiv(),attribute,value,traces)
			this.fireDataEvent("changeData");
			//this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Change layout of an existing plot
		 * @param attribute {Object} attribute string (like 'xaxis.range[0]') and value will be passed in the second argument or attribute object (like '{astr1:val1, astr2:val2...}') allows setting multiple attributes simultaneously and the second argument will be ignored
		 * @param value {Object} value to give this attribute
		 */
		relayout : function(attribute, value){
			Plotly.relayout(this.getPlotlyDiv(),attribute, value);
			this.fireDataEvent("changeLayout");
			//this.setLayout(this.getPlotlyDiv().layout);
		},
		
		/**
		 * Add data traces to an existing graph
		 * @param traces  {Object} The object or array of objects to add
		 * @param indices {Array} Locations to add traces
		 */
		addTraces : function(traces,indices){
			Plotly.addTraces(this.getPlotlyDiv(),traces,indices);
			this.fireDataEvent("changeData");
			//this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Delete traces from an existing graph
		 * @param indices {Array} indices of traces to remove
		 */
		deleteTraces : function(indices){
			Plotly.deleteTraces(this.getPlotlyDiv(),indices);
			this.fireDataEvent("changeData");
			//this.setData(this.getPlotlyDiv().data);
		},
		
		/**
		 * Move traces at currentIndices array to locations in newIndices array. If newIndices is omitted, currentIndices will be moved to the end
		 * @param currentindices {Array} The locations of traces to be moved
		 * @param newindices {Array} The locations to move traces to
		 */
		moveTraces : function(currentindices,newindices){
			Plotly.moveTraces(this.getPlotlyDiv(),currentindices,newindices);
			this.fireDataEvent("changeData");
			//this.setData(this.getPlotlyDiv().data);
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
			Plotly.newPlot(this.getPlotlyDiv(), data, layout,{displayModeBar: false} );
			//Plotly.newPlot(this.getPlotlyDiv(), data, layout );

			//Resize if needed
			if(layout.width && layout.height && layout.autosize!=true){
				this.w.setMinWidth(layout.width);
				this.w.setMinHeight(layout.height);
				this.w.setAllowGrowX(false);
				this.w.setAllowGrowY(false);
			}else{
				this.w.setMinWidth(null);
				this.w.setMinHeight(null);
				this.w.setAllowGrowX(true);
				this.w.setAllowGrowY(true);
			}
			Plotly.Plots.resize(this.getPlotlyDiv());
			
			this.setData(this.getPlotlyDiv().data);
			this.setLayout(this.getPlotlyDiv().layout);
			//Remove modebar
			/*if(document.getElementsByClassName('modebar')[0]){
				document.getElementsByClassName('modebar')[0].style.display="None";	
			}*/
					
			
			//Get data from extra source parameter
			for(var i=0;i<data.length;i++){     		
        		var src = data[i].source;
        		if(src){
        			switch(src.format){
        			case "KDB":
        				var url=src.url;
        				for(var key in src.parameters){
        					url=url+key+"="+src.parameters[key]+"&";
        				}
        				this.loadKairosDBData(i,url);                    				
        				break;
        			}
        		}
        	}
			
			this.fireDataEvent("changeSchema");
		},
		
		/**
		 * Save chart as json, svg or image
		 * @param format {String} Format 'jpeg' | 'png' | 'json' | 'svg'
		 */
		saveAs : function(format, filename){
			switch (format){
			case "svg" :
				var svg = Plotly.Snapshot.toSVG(this.getPlotlyDiv());
				var blob = new Blob([svg], {type: "text/plain;charset=utf-8"});
				saveAs(blob, filename+"."+format);
				break;
			
			case "json" :
				var json = JSON.stringify({data:this.getData(),layout:this.getLayout()});
				var blob = new Blob([json], {type: "text/plain;charset=utf-8"});
				saveAs(blob, filename+"."+format);
				break;
				
			case "png" :
			case "jpeg" :
				
				//Should use canvg for IE11 : https://github.com/gabelerner/canvg
				
				var gd = this.getPlotlyDiv();


		        var ev = Plotly.Snapshot.toImage(gd, {format: format});

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
		
		loadKairosDBData : function(k,src){
			var req = new qx.io.request.Xhr(src);
			
            req.addListener("success", function (e) {
            	var x=[];
            	var y=[];
            	var values  =e.getTarget().getResponse().queries[0].results[0].values;
            	for (var i = 1; i < values.length; i++) {
                    x.push(values[i][0]);
                    y.push(parseFloat(values[i][1]));
                }

            	this.restyle({x:[x],y:[y]},k);
                
            },this);
            req.send();
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
