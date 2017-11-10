var config = require("../app-frontend-config");
var dataConfig = require("../../data-config");
var app = window.app;

require("./assignee-factory");
require("./color-factory");
require("./filter-factory");
require("./foci-factory");
require("./git-factory");
require("./initiative-factory");
require("./issue-factory");
require("./nest-factory");
require("./time-factory");

app.dataFactory = (function() {
    
	var assigneeFactory = app.assigneeFactory;
	var colorFactory = app.colorFactory;
	var filterFactory = app.filterFactory;
	var fociFactory = app.fociFactory;
	var gitFactory = app.gitFactory;
	var initiativeFactory = app.initiativeFactory;
	var issueFactory = app.issueFactory;
	var nestFactory = app.nestFactory;
	var timeFactory = app.timeFactory;
    
    return {
		
		// build top level data object
		build: function() {
			
			var _self = this;
			
			// process and store color data
			colorFactory.store("initiatives");
			colorFactory.store("foci");
						
			// create promise
			return new Promise(function(resolve, reject) {
				
				// process config data and pass to issue call to enrich
				_self.preprocess().then(function(data) {
					
					var configs = data;
									
					// get all issues
					issueFactory.get(configs).then(function(data) {

						// success
						resolve(_self.enrich(data, configs));

					}, function(error) {

						// error
						reject(error);

					});
					
				});
				
			});
			
		},
		
		// enrich layout data with content data
		enrich: function(source, configs) {
			console.log(source);
			var _self = this;
			
			// filter for milestone/assignee
			var data = filterFactory.milestone(source, configs);
            			
			// data for visualization
            var initiatives = _self.postProcess(nestFactory.sum(data, "initiative_uid"), configs.initiatives);
			var foci = _self.postProcess(nestFactory.sum(data, "focus_uid"), configs.foci);
			var staff = nestFactory.sum(data, "assignee_name");
			var staffList = nestFactory.nest(data, "assignee_name");
			console.log(staffList);
			
			// content objects
			var content = {
				foci: foci,
				initiatives: initiatives,
                rings: [foci, initiatives],
				staff: staff,
				staff_list: staffList
			};

			// add content to layout data
			return { layout: config().layout, content: content };
						
		},
		
		// add empty data values to aid comprehension
		postProcess: function(source, configs) {
			
			// keys with real values
			var sourceKeys = source.map(function(d) {
				return d.key;
			});
			
			// all keys
			var configKeys = Object.keys(configs);
			
			// loop through config keys
			for (var i = 0; i < configKeys.length; i++) {
				
				// check if already in source
				if (!sourceKeys.includes(configKeys[i])) {
					
					// add empty object for visualization
					source.push({
						key: configKeys[i],
						value: {
							count: 0,
							time: {
								estimate: 0,
								spent: 0
							}
						}
					});
					
				}
			}
			
			return source;
 			
		},
		
		// process data-config data
		preprocess: function() {
			
			// create promise
			return new Promise(function(resolve, reject) {
				
				// process assignees first as foci/initiatves depend on it
				assigneeFactory.prune().then(function(data) {
					
					// success
					
					// get foci and prjoects from data-config
					var d = fociFactory.prune(data);
					var i = initiativeFactory.prune(d.projects);
					
					// return data
					resolve({
						assignees: data,
						foci: d.foci,
						git: gitFactory.prune(),
						initiatives: i.initiatives,
						projects: i.projects
					});

				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		}
        
    };
    
})();