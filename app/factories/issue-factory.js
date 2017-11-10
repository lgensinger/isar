var app = window.app;

require("./api-factory");
require("./global-factory");
require("./project-factory");
require("./utils-factory");

app.issueFactory = (function() {
    
	var apiFactory = app.apiFactory;
	var globalFactory = app.globalFactory;
	var projectFactory = app.projectFactory;
    var utilsFactory = app.utilsFactory;
    
    return {
		
		// relate foci to issue by project
		addConfigData: function(value, data) {
			
			// git/foci keys colon separated
			var keys = Object.keys(data.projects);
			var key = value.git_uid + ":" + value.project.name;
			
			// check if project has a focus
			if (keys.includes(key)) {
				
				// get foci object keys
				var fociKeys = Object.keys(data.projects[key]);

				// loop through keys
				fociKeys.forEach(function(v, k) {

					// relate focus/initiative to issue/project
					value[v] = data.projects[key][v] === null ? "other" : data.projects[key][v];

				});

			}
			
		},
		
		// add or expose data to top-level object
		bubbleUp: function(value, data) {
			
			// get git ip
			var ip = value.web_url.split("//")[1].split("/")[0];

			// add git unique id used to connect git API to data-config module
			// TODO fix once all git instances have matching ip to API
			value.git_uid = data.git[ip] === undefined ? data.git[data.assignees.label_git].git_uid : data.git[ip].git_uid;

			// add default values to top-level object
			value.focus_uid = "other";
			value.initiative_uid = "other";

			// surface some assignee info to top-level object
			value.assignee_name = value.assignee === null ? "other" : value.assignee.name;
			value.assignee_id = value.assignee === null ? null : value.assignee.id;
			
		},
		
		// enrich gitlab issue object
		enrich: function(data, list, configData) {
			
			var _self = this;
			var issues = data;
			
			// get all promises
			return new Promise(function(resolve, reject) {
						
				// flatten array of arrays
				projectFactory.get(list).then(function(data) {
					
					var projects = data;
					
					// loop through issues
					issues.forEach(function(value, key) {
						
						// add or expose data to issue object
						_self.bubbleUp(value, configData);
						
						// add project data to issue object
						projects.forEach(function(v, k) {
							
							// check project id against issue project is
							if (v.id === value.project_id) {
								
								// add project object
								value.project = v;
								
								// add foci to object
								_self.addConfigData(value, configData);
								
							}
							
						});
						
					});

					// success
					resolve(issues);

				}, function(error) {

					// error
					reject(error);

				});
				
			});
			
		},
		
		// get all issues from all gitlab instances
		get: function(data) {
		
			var _self = this;
			
			var configData = data;
			var list = [];

			// get list of gitlab instance
			for (var key in configData.git) {
				
				// have to filter out dup keys mapped for quick reference later
				if (!key.includes(".")) {
					
					// add to list
					list.push(configData.git[key]);
					
				}
				
			}
			
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// call all API endpoints gitlab projects
				apiFactory.getAll(list, "issues").then(function(data) {
					
					// success
					
					// flatten data
					// enrich with project/foci/initiative/git correlation
					_self.enrich(utilsFactory.flatten(data), list, configData).then(function(data) {
						
						resolve(data);
						
					});
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		}
        
    };
    
})();