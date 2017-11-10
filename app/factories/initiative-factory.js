var app = window.app;
var dataConfig = require("../../data-config");

app.initiativeFactory = (function() {
		    
    return {
		
		// prune project info
		prune: function(projectMap) {
			
			var _self = this;
			var data = {};
			
			// custom initiatives defined in data-config module
			var initiatives = dataConfig().initiatives;
			
			// using the objects provided in data-config module
			for (var key in initiatives) {
				
				// get object data based on key
				var o = initiatives[key];
				
				// move key to unique id key inside object
				o.initiative_uid = key;
				
				// add git projects remapped to remove the git prefix
				o.git_projects = o.projects;
				
				// loop through projects
				for (var i = 0; i < o.projects.length; i++) {
					
					// add to project data
					projectMap[o.projects[i]].initiative_uid = key;
					
				}
				
				// remove unused an ambiguous keys
				Reflect.deleteProperty(o, "projects");
				
				// add to data
				data[key] = o;
								
			};
			
			return { initiatives: data, projects: projectMap };
			
		}
        
    };
    
})();