/**
 * ColorField widget
 */
qx.Class.define("ae.qooxly.ui.ColorField", {
	extend : qx.ui.form.TextField,

	construct : function (){
		this.base(arguments);
		this.bind("value", this, "backgroundColor",{
			converter : function(value){
				if(value!=""){
					return value;
				}
			}
		});
		
		var popup = this.popup = new qx.ui.control.ColorPopup();
		popup.addListener("changeValue", function(e) {
			//this.setDecorator("main");
			//this.setBackgroundColor(e.getData());
			this.setValue(qx.util.ColorUtil
					.rgbToHexString(qx.util.ColorUtil.cssStringToRgb(e
							.getData())));
		}, this);

		
		this.addListener("click", function(e) {
			this.popup.placeToWidget(this);
			this.popup.show();
		}, this);
	}
});
