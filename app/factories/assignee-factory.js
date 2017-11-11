var dataConfig = require("../../data/data-config");
var token = require("../../data/token");
var app = window.app;

require("./api-factory");

app.assigneeFactory = (function() {
	
	var apiFactory = app.apiFactory;
    
    return {
		
		// enrich based on defined assignnee data in data-config
		enrich: function(map) {
			
			var _self = this;
			
			var data = {};
			var assignees = dataConfig().assignees;
			
			// mapping from all instances to git instance to use as labeling truth
			var label_map = assignees.label_map;
			
			// git unique ids
			var keys = Object.keys(assignees.git);

			// loop through git instances
			for (var i = 0; i < keys.length; i++) {

				var git_uid = keys[i];

				// loop through defined assignees
				for (var j = 0; j < assignees.git[git_uid].length; j++) {

					// check if key already stored
					if (!Object.keys(data).includes(git_uid)) {

						// add empty obj
						data[git_uid] = {};

					}

					// add to existing
					data[git_uid][assignees.git[git_uid][j]] = map[label_map[git_uid][assignees.git[git_uid][j]]];

				}

			}
			
			return data;
			
		},
		
		// prune project info
		prune: function() {
			
			var _self = this;
			var assignees = dataConfig().assignees;

			// which instance to use as labeling truth
			var label_git = assignees.label_git;
			
			// create promise
			return new Promise(function(resolve, reject) {
			
				// get users from git label single point of truth instance
				// defined in data-config
				apiFactory.get(token()[label_git].git, token()[label_git].token, "users").then(function(data) {

					// success
					
					// create new map
					var map = {};

					// loop through data
					for (var i = 0; i < data.length; i++) {

						// add to map
						map[data[i].id] = data[i].name;

					}

					// enrich data from config
					// i.e. get single user names and connect the same user across git instances that we care about
					var enrichedData = _self.enrich(map);
					
					// add other data needed to pass along
					enrichedData.label_git = label_git;
					
					// return data
					resolve(enrichedData);

				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		}
        
    };
    
})();