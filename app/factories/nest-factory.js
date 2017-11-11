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
		participantSum: function(source, key) {
			
			var _self = this;
			
			// nest and sum
			var data = d3.nest()
				.key(function(d) { return d[key]; })
				.rollup(function(leaves) {
					return { 
						count: leaves.length,
						time: _self.time(leaves) 
					}; 
				})
				.entries(source);
			
			// sort by count
			data.sort(function (a, b) {
				return b.value.count - a.value.count;
			});
			
			return data;
			
		},
		
		// construct time data object for consistency throughout
		time: function(source) {
			
			var estimate = d3.sum(source, function(d) { return parseFloat(d.time.estimate); });
			var spent = d3.sum(source, function(d) { return parseFloat(d.time.spent); });
			
			return {
				estimate: estimate,
				spent: spent
			};
			
		},
		
		// 1-level nest with sum
		timeSum: function(source, key, configs) {
			
			var _self = this;
			
			// nest and sum
			return d3.nest()
				.key(function(d) { return d[key]; })
				.rollup(function(leaves) {
				
					// calculate values
					var lead = key === "focus_uid" && leaves[0][key] !== "other" ? configs[leaves[0][key]].lead : [];
					var participants = _self.participantSum(leaves, "assignee_name");
					var partners = key === "focus_uid" && leaves[0][key] !== "other" ? configs[leaves[0][key]].partners : [];
					var time = _self.time(leaves);
				
					// set values
					return _self.value(leaves.length, lead, key, participants, partners, leaves);
				
				})
				.entries(source);
						
		},
		
		// construct value data object for consistency throughout
		value: function(count, lead, nest, participants, partners, leaves) {
			
			var _self = this;
			
			return {
				count: count,
				lead: lead,
				nest: nest,
				participants: participants,
				partners: partners,
				time: _self.time(leaves)
			};
			
		}
        
    };
    
})();