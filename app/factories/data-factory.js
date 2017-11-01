var app = window.app;
var projectMap = require("../../project-map");
var token = require("../../token");

require("./api-factory");
require("./issue-factory");
require("./project-factory");
require("./utils-factory");

app.dataFactory = (function() {
    
    var apiFactory = app.apiFactory;
	var issueFactory = app.issueFactory;
	var projectFactory = app.projectFactory;
	var utilsFactory = app.utilsFactory;
    
    return {
		
		// build top level data object
		build: function() {
						
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// get all issues
				issueFactory.get().then(function(data) {
					
					// success
					resolve(data);
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		}
        
    };
    
})();