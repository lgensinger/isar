var dataConfig = require("../../data-config");
var app = window.app;

app.colorFactory = (function() {
    
    return {
		
		// store data
		"anomaly-detection": dataConfig().foci["anomaly-detection"].color,
		"object-detection": dataConfig().foci["language-translation"].color,
		"language-translation": dataConfig().foci["object-detection"].color,
		other: "grey",
        "big-data-accessibility": dataConfig().initiatives["big-data-accessibility"].color,
        "cognitive-computing": dataConfig().initiatives["cognitive-computing"].color,
        "cyber-security": dataConfig().initiatives["cyber-security"].color,
        "identity": dataConfig().initiatives.identity.color,
        "urban-informatics": dataConfig().initiatives["urban-informatics"].color
        
    };
    
})();