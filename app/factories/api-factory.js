var app = window.app;
var token = require("../../data/token");

app.apiFactory = (function() {
	    
    return {
        
        // store data
        success: 200,
        base: {
			api: "/api/v4/",
			issues: "issues?scope=all&per_page=100&",
			projects: "projects?per_page=100&",
			users: "users?"
		},
		
		// get issues from gitlab instance
		get: function(url, token, type) {
			
			var _self = this;
			
			// create promise
			return new Promise(function(resolve, reject) {
				
				// make API request
				_self.makeRequest("GET", url, token, type).then(function(data) {
					
					// success
					resolve(data);
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});

		},
		
		// get all of a type from all gitlab instances
		getAll: function(array, type) {
			
			var _self = this;
			
			// create promise
			return new Promise(function(resolve, reject) {
								
				// get data objects from array of gitlab instances
				var promises = array.map(function(d) {
					
					// make an async call for each object in the list
					return _self.get(d.git_ip, d.git_token, type).then(function(data) {
						
						// success
						return data;
						
					}, function(error) {
						
						// error
						return error;
						
					});
					
				});
				
				// wait for all promises to resolve before returning
				Promise.all(promises).then(function(data) {
					
					// success
					resolve(data);
					
				}, function(error) {
					
					// error
					reject(error);
					
				});
				
			});
			
		},
        
        // make request
        makeRequest: function(method, ip, token, type, obj) {
            
            var _self = this;
            
            // values for request
            var data = obj || "";
            var url = ip + _self.base.api + _self.base[type] + "private_token=" + token;
            
            // create promise
            return new Promise(function(resolve, reject) {
                
                // new HTTP
                var req = new XMLHttpRequest();
                
                // make call
                req.open(method, url);
                
                // check load status
                req.onload = function() {
                    
                    // check for success
                    if (req.status === _self.success) {
                        
                        // resolve promise
                        resolve(JSON.parse(req.response));
                        
                    } else {
                        
                        // reject promise
                        reject(Error(req.statusText));
                        
                    }
                };
                
                // handle error
                req.onerror = function() {
                    
                    // reject promise
                    reject(Error(req.statusText));
                    
                };
                
                // send request
                req.send(data);
                
            });
            
        }
        
    };
    
})();