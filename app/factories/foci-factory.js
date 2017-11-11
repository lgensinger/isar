var app = window.app;
var dataConfig = require("../../data/data-config");
var token = require("../../data/token");

app.fociFactory = (function() {
	    
    return {
		
		// prune project info
		prune: function(assignees) {
			
			var data = {};
			var d = {};
			
			// custom foci defined in data-config module
			var foci = dataConfig().foci;
			
			// using the objects provided in data-config module
			for (var key in foci) {
				
				// get object data based on key
				var o = foci[key];
				
				// add git projects
				o.git_projects = o.projects;
				
				// loop through projects
				for (var i = 0; i < o.projects.length; i++) {
					
					// add to project data
					d[o.projects[i]] = {
						focus_uid: key,
						initiative_uid: null
					};
					
				}
				
				// replace user id with assignee name
				o.lead = o.lead.map(function(d) {
					return assignees[dataConfig().assignees.label_git][d];
				});
				
				// remove unused and ambiguous keys
				Reflect.deleteProperty(o, "projects");
				
				// add to data
				data[key] = o;
												
			};
			
			return { foci: data, projects: d };
			
		}
        
    };
    
})();