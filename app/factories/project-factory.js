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
		get: function(data) {
						
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// call all API endpoints gitlab projects
				apiFactory.getAll(data, "projects").then(function(data) {
					
					// success
					
					// flatten array of arrays
					resolve(utilsFactory.flatten(data));
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		}
        
    };
    
})();