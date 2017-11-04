var dataConfig = require("../../data-config");
var app = window.app;

app.colorFactory = (function() {
    
    return {
		
		// store data
		"anomaly-detection": dataConfig().foci["anomaly-detection"].color,
		"object-detection": dataConfig().foci["language-translation"].color,
		"language-translation": dataConfig().foci["object-detection"].color,
		other: "grey"
        
    };
    
})();