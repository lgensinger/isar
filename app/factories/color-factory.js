var dataConfig = require("../../data/data-config");
var app = window.app;

require("./pattern-factory");

app.colorFactory = (function() {
	
	var patternFactory = app.patternFactory;
    
    return {
		
		// store data
		other: "lightgrey",
		
		// store color based on data-config
		store: function(type) {
			
			var _self = this;
			
			// get keys
			var keys = Object.keys(dataConfig()[type]);
			
			// loop through keys
			for (var i = 0; i < keys.length; i++) {
				
				var key = keys[i];
				
				// store color value in factory
				_self[key] = dataConfig()[type][key].fill.color;
				
				// create patterns and store
				patternFactory.create(key, dataConfig()[type][key].fill);
				
			}
			
		}
        
    };
    
})();