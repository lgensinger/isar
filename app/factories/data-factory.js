var app = window.app;
var projectMap = require("../../project-map");

require("./api-factory");

app.dataFactory = (function() {
    
    var apiFactory = app.apiFactory;
    
    return {
        
        // calculate value as a percentage of all
        getPercent: function(category, value) {
            
            var config = projectMap()[category];
            
            // get issues from api
            apiFactory.makeRequest("GET", config.git).then(function(response) {
                console.log(response);
            }, function(error) {
                console.log(error);
            });
            
            return value;
            
        }
        
    };
    
})();