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
			
			var _self = this;
			
			// filter for time, assignees
			var filteredTimeStaff = filterFactory.filter(source, configs, true);
			
			// filter for only time, keeping all assignees
			var filteredTime = filterFactory.filter(source, configs, false);
            			
			// data for visualization
			var foci = _self.postProcess(nestFactory.timeSum(filteredTimeStaff, "focus_uid", configs.foci), configs.foci);
			var fociList = _self.postProcess(nestFactory.timeSum(filteredTime, "focus_uid", configs.foci), configs.foci);
            var initiatives = _self.postProcess(nestFactory.timeSum(filteredTimeStaff, "initiative_uid"), configs.initiatives);
			var staff = nestFactory.timeSum(filteredTimeStaff, "assignee_name");
			var staffList = nestFactory.nest(filteredTimeStaff, "assignee_name");
			
			// content objects
			var content = {
				foci: foci,
				foci_list: fociList,
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
						value: nestFactory.value(0, [], "blah", [], [], [])
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