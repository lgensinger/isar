var app = window.app;

require("./api-factory");
require("./global-factory");
require("./utils-factory");

app.projectFactory = (function() {
	
	var apiFactory = app.apiFactory;
	var globalFactory = app.globalFactory;
	var utilsFactory = app.utilsFactory;
    
    return {
		
		// get all projects from all gitlab instances
		get: function() {
			
			var list = apiFactory.prune();
			
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// call all API endpoints gitlab projects
				apiFactory.getAll(list, "projects").then(function(data) {
					
					// success
					resolve(utilsFactory.flatten(data));
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		},
		
		// extract from foci info and store in global
		store: function(list, data) {
			
			// check global storage
			var inGlobal = globalFactory.projects === undefined ? false : true;
						
			// loop through list
			for (var i = 0; i < list.length; i++) {
				
				// no data stored
				if (!inGlobal) {
					
					// add empty project object first
					globalFactory.projects = {};
					
				}			
				
				// add to stored values
				globalFactory.projects[list[i]] = data;
			
			}
			
		}
        
    };
    
})();