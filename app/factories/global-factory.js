var app = window.app;

app.globalFactory = (function() {
	    
    return {
		
		// store data
		git: null,
		foci: null,
		assignees: null,
		
		// set data
        setData: function(key, data) {
            this[key] = data;

        }
        
    };
    
})();