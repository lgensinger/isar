var app = window.app;

var d3 = require("d3");

app.nestFactory = (function() {
    
    return {
		
		// nest data
		nest: function(source, key) {
			
			// simple 1-level nest
			return d3.nest()
				.key(function(d) { return d[key]; })
				.entries(source);
									
		},
		
		// 1-level nest with sum
		sum: function(source, key) {

			// nest and sum
			return d3.nest()
				.key(function(d) { return d[key]; })
				.rollup(function(leaves) {
					return {
						nest: key,
						count: leaves.length, 
						time: {
							estimate: d3.sum(leaves, function(d) { return d.time_stats === undefined ? 0 : parseFloat(d.time_stats.time_estimate); }),
							spent: d3.sum(leaves, function(d) { return d.time_stats === undefined ? 0 : parseFloat(d.time_stats.total_time_spent); })
						}
					};
				})
				.entries(source);
						
		}
        
    };
    
})();