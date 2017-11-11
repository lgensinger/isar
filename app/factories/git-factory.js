var app = window.app;
var token = require("../../data/token");

app.gitFactory = (function() {
	    
    return {
		
		// prune project info
		prune: function(assignees) {
			
			var data = {};
			
			// custom foci defined in data-config module
			var gits = token();
			
			// using the objects provided in data-config module
			for (var key in gits) {
				
				// get object data based on key
				var o = gits[key];
				
				// add to data
				data[key] = {
					git_uid: key,
					git_ip: o.git,
					git_token: o.token
				};
				
				// remap using git uri
				data[o.git.split("//")[1]] = {
					git_uid: key,
					git_ip: o.git,
					git_token: o.token
				};
												
			};
			
			return data;
			console.log("done pruning");
		}
        
    };
    
})();