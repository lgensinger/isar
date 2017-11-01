var app = window.app;
var projectMap = require("../../project-map");
var token = require("../../token");

require("./api-factory");
require("./data-factory");
require("./project-factory");
require("./utils-factory");

app.issueFactory = (function() {
    
	var apiFactory = app.apiFactory;
	var dataFactory = app.dataFactory;
	var projectFactory = app.projectFactory;
    var utilsFactory = app.utilsFactory;
    
    return {
		
		// get all issues from all gitlab instances
		// MIGHT BE OLD DELETE
		build: function() {
			
			var _self = this;
			
			// get pruned data for API calls
			var list = _self.prune();
			
			// dedup the list to reduce API calls
			var dedup = dataFactory.dedup(list, "git_uid", ["git_projects", "project_uid", "project_label"]);
			
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// call all API endpoints gitlab issues
				apiFactory.getAll(dedup, "issues").then(function(data) {
					
					// success
					resolve(_self.enrich(data));
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		},
		
		// dedup arrays of objects
		dedup: function(array, dedupKey, valueKeys) {
			
			var _self = this;
			
			var data = [];
			var track = [];
			
			// loop through array of values
			for (var i = 0; i < array.length; i++) {
				
				// iter values
				var o = array[i];
				var key = array[i][dedupKey];
				
				// check if already in data list
				if (track.includes(key)) {
					
					// loop through array of keys that need merged into existing objects
					for (var j = 0; j < valueKeys.length; j++) {
						
						// iter value
						var jKey = valueKeys[j];
						var jKeyObjType = typeof o[jKey];
						
						// get the index of the object to udpate
						var idx = track.indexOf(key);
						
						// check key type
						switch (jKeyObjType) {
							case "string": data[idx][jKey + "s"] = utilsFactory.convertToArray(data, jKey);
								break;
							default: data[idx][jKey] = data[idx][jKey].concat(o[jKey]);
						}						
						
					}
					
					
				} else {
					
					// loop through array of keys that need merged into existing objects
					for (var k = 0; k < valueKeys.length; k++) {
						
						// iter value
						var kKey = valueKeys[k];
						
						// check for non-array type
						if (typeof o[kKey] !== "object") {
					
							// update key to match later objc with concatenated values
							o[kKey + "s"] = [o[kKey]];
							
						}
						
					}
					
					// add new value
					data.push(o);
					
					// add key to track
					track.push(key);
					
				}
				
			}
			
			// loop through deduped data
			data.forEach(function(value, key) {
				
				valueKeys.forEach(function(v, k) {
					
					// remove unused keys
					Reflect.deleteProperty(value, v);
					
				});
				
			});
			
			return data;
			
		},
		
		// enrich gitlab issue object
		enrich: function(data) {
			
			var issues = data;
			
			// get all promises
			return new Promise(function(resolve, reject) {
						
				// flatten array of arrays
				projectFactory.get().then(function(data) {
					
					var projects = data;
					
					// loop through issues
					issues.forEach(function(value, key) {
						
						// add project data to issue object
						projects.forEach(function(v, k) {
							if (v.id === value.project_id) {
								value.project = v;
							}
						});
						
					});

					// success
					resolve(issues);

				}, function(error) {

					// error
					reject(error);

				});
				
			});
			
		},
		
		// get all issues from all gitlab instances
		get: function() {
			
			var _self = this;

			//var list = _self.prune();
			var list = apiFactory.prune();
			
			// dedup the list to reduce API calls
			var dedup = _self.dedup(list, "git_uid", ["git_projects", "project_uid", "project_label"]);
			
			// get all promises
			return new Promise(function(resolve, reject) {
				
				// call all API endpoints gitlab projects
				apiFactory.getAll(list, "issues").then(function(data) {
					
					// success
					_self.enrich(utilsFactory.flatten(data)).then(function(data) {
						
						resolve(data);
						
					});
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		},
		
		// prune request data to reduce API calls
		prune: function() {
			
			// using the objects provided in project-map module
			// map the objects to arrays b/c JS likes those more
			return Object.keys(projectMap()).map(function(d, i) {
				
				// get object data based on key
				var o = projectMap()[d];
				
				// move key to unique id key inside object
				o.project_uid = Object.keys(projectMap())[i];
				
				// add project label 
				o.project_label = o.label;
				
				// add git unique id
				o.git_uid = o.git;
				
				// get ip from token module
				o.git_ip = token()[o.git].git;
				
				// get token from token module
				o.git_token = token()[o.git].token;
				
				// add git projects
				o.git_projects = o.projects;
				
				// remove unused an ambiguous keys
				Reflect.deleteProperty(o, "label");
				Reflect.deleteProperty(o, "git");
				Reflect.deleteProperty(o, "projects");
				
				return o;
				
			});
			
		}
        
    };
    
})();