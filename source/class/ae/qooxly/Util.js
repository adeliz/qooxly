/**
 *Static methods
 */
qx.Class.define("ae.qooxly.Util", {
	
  statics : {
      /**
       *
       */
	  

	  handleCartesian : function(gd,astr,val){
		  var DRAGCURSORS = {
				    pan: 'move',
				    zoom: 'crosshair',
				    select: 'crosshair',
				    lasso: 'crosshair'
		  };
		  
		  var /*button = ev.currentTarget,
	        astr = button.getAttribute('data-attr'),
	        val = button.getAttribute('data-val') || true,*/
	        fullLayout = gd._fullLayout,
	        aobj = {};

	    if(astr === 'zoom') {
	        var mag = (val === 'in') ? 0.5 : 2,
	            r0 = (1 + mag) / 2,
	            r1 = (1 - mag) / 2,
	            axList = Plotly.Axes.list(gd, null, true);

	        var ax, axName, initialRange;

	        for(var i = 0; i < axList.length; i++) {
	            ax = axList[i];
	            if(!ax.fixedrange) {
	                axName = ax._name;
	                if(val === 'auto') aobj[axName + '.autorange'] = true;
	                else if(val === 'reset') {
	                    if(ax._rangeInitial === undefined) {
	                        aobj[axName + '.autorange'] = true;
	                    }
	                    else aobj[axName + '.range'] = ax._rangeInitial.slice();
	                }
	                else {
	                    initialRange = ax.range;
	                    aobj[axName + '.range'] = [
	                        r0 * initialRange[0] + r1 * initialRange[1],
	                        r0 * initialRange[1] + r1 * initialRange[0]
	                    ];
	                }
	            }
	        }
	    }
	    else {
	        // if ALL traces have orientation 'h', 'hovermode': 'x' otherwise: 'y'
	        if (astr==='hovermode' && (val==='x' || val==='y')) {
	            val = fullLayout._isHoriz ? 'y' : 'x';
	            //button.setAttribute('data-val', val);
	        }

	        aobj[astr] = val;
	    }

	    Plotly.relayout(gd, aobj).then(function() {
	        if(astr === 'dragmode') {
	            if(fullLayout._hasCartesian) {
	                Plotly.Fx.setCursor(
	                    fullLayout._paper.select('.nsewdrag'),
	                    DRAGCURSORS[val]
	                );
	            }
	            Plotly.Fx.supplyLayoutDefaults(gd.layout, fullLayout, gd._fullData);
	            Plotly.Fx.init(gd);
	        }
	    });
	  }
  }
});