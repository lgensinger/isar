var app = window.app;

require("./api-factory");
require("./utils-factory");

app.projectFactory = (function() {
	
	var apiFactory = app.apiFactory;
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
			
		}
        
    };
    
})();