var app = window.app;
var dataConfig = require("../../data-config");

require("./global-factory");

app.initiativeFactory = (function() {
	
	var globalFactory = app.globalFactory;
	    
    return {
		
		// prune project info
		prune: function() {
			
			var _self = this;
			
			var initiatives = dataConfig().initiatives;
			
			// using the objects provided in project-map module
			// map the objects to arrays b/c JS likes those more
			var list = Object.keys(initiatives).map(function(d, i) {
				
				// get object data based on key
				var o = initiatives[d];
				
				// move key to unique id key inside object
				o.initiative_uid = Object.keys(initiatives)[i];
				
				// add git projects
				o.git_projects = o.projects;
				
				// store in global
				_self.store(o.projects, o.initiative_uid);
				
				// remove unused an ambiguous keys
				Reflect.deleteProperty(o, "projects");
				
				return o;
								
			});
			
			var data = {};
			
			// re-map to object
			list.forEach(function(value, key) {
				data[value.initiative_uid] = value;
			});
			
			return data;
			
		},
		
		// store by project in global
		store: function(projects, inititative) {
			
			// loop through projects
			for (var i = 0; i < projects.length; i++) {
				
				// add initiative info to global storage
				globalFactory.projects[projects[i]].initiative_uid = inititative;
				
			}
			
		}
        
    };
    
})();