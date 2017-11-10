var dataConfig = require("../../data-config");
var app = window.app;

require("./global-factory");
require("./time-factory");

var moment = require("moment");

app.filterFactory = (function() {
    
	var globalFactory = app.globalFactory;
	var timeFactory = app.timeFactory;
    
    return {
		
		// check if assignee is one we want to track
		// info is declared in data-config.js
		assignee: function(item, configs) {
			
			// get look up data
			var assignees = configs.assignees[item.git_uid];
			var keys = Object.keys(assignees);
			var shouldTrack = false;
			
			// check assignee id against keys of those we wish to track
			if (item.assignee_id !== null && keys.includes(item.assignee_id.toString())) {
				
				// update name to git instance default defined in config
				item.assignee_name = assignees[item.assignee_id];
				
				// update track state
				shouldTrack = true;
				
			}
			
			return shouldTrack;
			
		},
		
		// calculate current week from sunday to saturday
		getCurrentWeek: function(item) {
			
			// get today's day index value
			var today = moment().day();

			// get the day of the year for today
			var dayOfYear = moment().format("DDD");

			// moment indices 
			var saturday = 6;

			// get day of year for sunday of current week
			var doySunday = moment().subtract(today, "day").format("DDD");
			var doySaturday = moment().add(saturday - today, "day").format("DDD");

			// get item date values
			var start = item.milestone === null ? null : item.start_date === null ? null : moment(item.milestone.start_date).format("DDD");
			var end = item.milestone === null ? null : item.milestone.due_date === null ? null : moment(item.milestone.due_date).format("DDD");
			var due = item.due_date === null ? null : moment(item.due_date).format("DDD");
			
			// evaluate if values are between sunday/saturday
			var startIsBetween = start !== null && start >= doySunday && start <= doySaturday;
			var endIsBetween = end !== null && end >= doySunday && end <= doySaturday;
			var dueIsBetween = due !== null && due >= doySunday && due <= doySaturday;
			
			return { 
				start: startIsBetween, 
				end: endIsBetween, 
				due: dueIsBetween
			};
			
		},
		
		// filter for current milestone by date across git instances
		milestone: function(source, configs) {
			
			var _self = this;
			var data = [];
			
			// loop through source
			for (var i = 0; i < source.length; i++) {
				
				var item = source[i];		
				var dates = _self.getCurrentWeek(item);
				
				// check for assignee we care about tracking
				if (_self.assignee(item, configs)) {

					// check if date values are inside the current week (sunday to saturday)

					// milestone start
					if (dates.start) {

						// add to data
						data.push(item);

					// milestone end
					} else if (dates.end) {

						// add to data
						data.push(item);

					// item due date
					} else if (dates.due) {

						// add to data
						data.push(item);

					// check for Doing label
					} else if (item.labels.length > 0 && item.labels.includes("Doing")) {

						// add to data
						data.push(item);

					}
					
				}
				
			}
			
			return data;
			
		}
        
    };
    
})();