var app = window.app;
var dataConfig = require("../../data-config");
var token = require("../../token");

require("./project-factory");

app.fociFactory = (function() {
	
	var projectFactory = app.projectFactory;
    
    return {
		
		// prune project info
		prune: function() {
			
			var foci = dataConfig().foci;
			
			// using the objects provided in project-map module
			// map the objects to arrays b/c JS likes those more
			var list = Object.keys(foci).map(function(d, i) {
				
				// get object data based on key
				var o = foci[d];
				
				// move key to unique id key inside object
				o.focus_uid = Object.keys(foci)[i];
				
				// add git unique id
				o.git_uid = o.git;
				
				// get ip from token module
				o.git_ip = token()[o.git].git;
				
				// get token from token module
				o.git_token = token()[o.git].token;
				
				// add git projects
				o.git_projects = o.projects;
				
				// extract project data & store in global
				projectFactory.store(o.projects, o);
				
				// remove unused an ambiguous keys
				Reflect.deleteProperty(o, "label");
				Reflect.deleteProperty(o, "git");
				Reflect.deleteProperty(o, "projects");
				
				return o;
								
			});
			
			var data = {};
			
			// re-map to object
			list.forEach(function(value, key) {
				data[value.focus_uid] = value;
			});
			
			return data;
			
		}
        
    };
    
})();