var app = window.app;

var React = require("react");

app.patternFactory = (function() {
    
    return {
		
		// store data
		patterns: null,
        
        // create svg pattern
		create: function(key, fill) {
			
			var _self = this;
			
			// check type
			if (fill.type === "pattern") {
				
				// check first for null
				if (_self.patterns === null) {
					
					// establish object
					_self.patterns = {};
					
				}
				
				// store pattern map to keys in data-config
				_self.patterns[key] = fill;
				
			}
			
		},
		
		// define patterns as svg <pattern>
		define: function(pattern, key, i) {
			
			return React.createElement(
				"pattern",
				{
					key: i,
					id: "pattern-circles-" + key,
					x: 0,
					y: 0,
					width: 20,
					height: 20,
					patternUnits: "userSpaceOnUse",
					patternContentUnits: "userSpaceOnUse"
				},

				// circle in pattern
				React.createElement(
					"circle",
					{
						cx: 10,
						cy: 10,
						r: 10,
						fill: pattern.value
					},
					null
				)

			);
			
		}
        
    };
    
})();