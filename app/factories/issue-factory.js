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
		
		// enrich gitlab issue object
		enrich: function(data) {
			
			var issues = data;
			
			// get all promises
			return new Promise(function(resolve, reject) {
						
				// flatten array of arrays
				projectFactory.get().then(function(data) {
					
					var projects = data;
					var foci = globalFactory.foci;
					
					// loop through issues
					issues.forEach(function(value, key) {
						
						// make focus other
						value.focus_uid = "other";
                        value.initiative_uid = "other";
						
						// add project data to issue object
						projects.forEach(function(v, k) {
							
							// check project id against issue project is
							if (v.id === value.project_id) {
								
								value.project = v;
								
							}
							
						});
						
						// check for valid project
						if (value.project !== undefined) {
							
							// check if project has a focus
							if (Object.keys(globalFactory.projects).includes(value.project.name)) {
								
								// get data config keys
								var dataconfigKeys = Object.keys(globalFactory.projects[value.project.name]);
								
								// loop through keys
								dataconfigKeys.forEach(function(v, k) {
									
									// add focus data to issue object
									value[v] = globalFactory.projects[value.project.name][v];

								});
								
							}
														
						};
						
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
		get: function() {
			
			var _self = this;

			// get list of gitlab instance
			var list = apiFactory.prune();
			
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// call all API endpoints gitlab projects
				apiFactory.getAll(list, "issues").then(function(data) {
					
					// success
					_self.enrich(utilsFactory.flatten(data)).then(function(data) {
						
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