var app = window.app;
var token = require("../../token");

app.apiFactory = (function() {
    
    return {
        
        // store data
        success: 200,
        base: "/api/v4/issues?private_token=" + token(),
        
        // make request
        makeRequest: function(method, ip, obj) {
            
            var _self = this;
            
            // values for request
            var data = obj || "";
            var url = ip + _self.base;
            
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