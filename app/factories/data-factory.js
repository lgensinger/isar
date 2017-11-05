var config = require("../app-frontend-config");
var app = window.app;

require("./foci-factory");
require("./global-factory");
require("./initiative-factory");
require("./issue-factory");

var d3 = require("d3");

app.dataFactory = (function() {
    
	var fociFactory = app.fociFactory;
	var globalFactory = app.globalFactory;
	var initiativeFactory = app.initiativeFactory;
	var issueFactory = app.issueFactory;
    
    return {
		
		// build top level data object
		build: function() {
			
			var _self = this;
			
			// get API data from list of project foci
			var fociList = fociFactory.prune();
			var initiativesList = initiativeFactory.prune();
			
			// store in globals for access later
			globalFactory.setData("foci", fociList);
			globalFactory.setData("initiatives", initiativesList);
						
			// create promise
			return new Promise(function(resolve, reject) {
				
				// get all issues
				issueFactory.get().then(function(data) {
					
					// success
					resolve(_self.enrich(data));
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		},
		
		// enrich layout data with content data
		enrich: function(source) {
			
			var _self = this;
            
            var tasks = _self.nest(source, "focus_uid", "count");
            var initiatives = _self.nest(source, "initiative_uid", "count");
            var simplified = source.map(function(d) {
                return {
                    focus_uid: d.focus_uid,
                    initiative_uid: d.initiative_uid,
                    key: d.title,
                    value: 1
                };
            });
			
			// content objects
			var content = {
				initiatives: initiatives,
                rings: [simplified, tasks, initiatives],
				tasks: tasks
			};

			// add content to layout data
			return { layout: config().layout, content: content };
						
		},
		
		// nest data
		nest: function(source, key, type) {
			
			var data = source;
			
			// check type
			if (type === "count") {
				
				// simple 1-level nest with counted leaves
				data = d3.nest()
					.key(function(d) { return d[key]; })
					.rollup(function(leaves) { return leaves.length; })
					.entries(source);
				
				// sort by count value
				data.sort(function(a, b) {
					return parseFloat(b.value) - parseFloat(a.value);
				});
				
			} else {
			
				// simple 1-level nest
				data = d3.nest()
					.key(function(d) { return d[key]; })
					.entries(source);
				
			}
			
			return data;
						
		}
        
    };
    
})();