sap.ui.define([
		"sap/ui/core/Control",
		"sap/m/Link",
		"sap/m/Text"
	],
	function(Control, Link, Text) {

	"use strict";

	return Control.extend("moreMoreText.control.LinkWithMore", {

		metadata : {
			properties : {
				text : {type : "string", defaultValue : ""},
				charCount: {type : "int", defaultValue : 30},
				showMore: {type : "boolean", defaultValue : true},
				maxLines: {type : "int", defaultValue : 3}
			},
			aggregations : {
			},
			events : {
				onClickLess : {
					parameters : {
						text : {type : "string"}
					}
				},
				onClickMore: {
					parameters : {
					}
				}
			}

		},

		init : function() {
			this.text = new Text({"text": ""});
			this.lessLink = new Link({"text": "Less", "press": this.onPressLessLink.bind(this)});
			this.moreLink = new Link({"text": "More", "press": this.onPressMoreLink.bind(this)});
		},
		
		onPressLessLink: function(){
			this.setShowMore(true);
			this.rerender();
		},
		onPressMoreLink: function(){
			this.setShowMore(false);
			this.rerender();
		},
		// Overwriting the setter method is done in order to hand down the values to the
		// inner control. The setter method is used by the binding to update the
		// control's value.
		/**
		 * Setters
		 * */
		setShowMore: function(sValue) {
			return this.setProperty("showMore", sValue, true);
		},
		setText: function(sValue) {
			return this.setProperty("text", sValue, true);
		},
		setCharCount: function(sValue) {
			return this.setProperty("charCount", sValue, true);
		},
		setMaxLines: function(sValue){
			return this.setProperty("maxLines", sValue, true);
		},
		
		getCharacterFromText: function(oControl){
			return (oControl.getShowMore()) ? (oControl.getText().substr(0, this.getCharCount()) + "...") : oControl.getText().substr();
		},
		renderer : function(oRm, oControl) {
			oRm.write("<div");
			oRm.writeControlData(oControl);
			//oRm.addClass("sapUiSmallMarginBeginEnd");
			//oRm.writeClasses();
			oRm.write(">");
			
			if (oControl.getText().length > oControl.getCharCount()){
				oControl.text.setText(oControl.getCharacterFromText(oControl));
				oRm.renderControl(oControl.text);
				if (oControl.getShowMore()) {
					oRm.renderControl(oControl.moreLink);
				} else{
					oRm.renderControl(oControl.lessLink);
				}
			} else {
				oControl.text.setText(oControl.getText());
				oRm.renderControl(oControl.text);
			}
			oRm.write("</div>");
		}

	});
});