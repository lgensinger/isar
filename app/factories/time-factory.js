var config = require("../app-frontend-config");
var app = window.app;

require("./assignee-factory");
require("./foci-factory");
require("./global-factory");
require("./initiative-factory");
require("./issue-factory");

var d3 = require("d3");
var moment = require("moment");

app.timeFactory = (function() {
    
	var assigneeFactory = app.assigneeFactory;
	var fociFactory = app.fociFactory;
	var globalFactory = app.globalFactory;
	var initiativeFactory = app.initiativeFactory;
	var issueFactory = app.issueFactory;
    
    return {
		
		// process time from nested source
		aggregate: function(source) {
			
			var data = [];
			
			// reset count
			var total = {
				estimate: 0,
				spent: 0
			};

			// loop through items
			for (var i = 0; i < source.length; i++) {

				var item = source[i];

				// track time across issues
				var estimate = 0;
				var spent = 0;

				// loop through values
				for (var j = 0; j < item.values.length; j++) {

					var value = item.values[j];

					// add time to total
					estimate += value.time_stats.time_estimate;
					spent += value.time_stats.total_time_spent;
					total.estimate += value.time_stats.time_estimate;
					total.spent += value.time_stats.total_time_spent;

				}

				// set up values for visualization
				var values = [
					{
						label: "estimate",
						value: estimate
					},
					{
						label: "spent", 
						value: spent
					}
				];

				// add to data
				data.push({ key: item.key, values: values });

			}
			
			return { data: data, total: total };
			
		}
        
    };
    
})();