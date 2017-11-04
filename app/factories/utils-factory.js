var app = window.app;

app.utilsFactory = (function() {
    
    return {
		
		// flatten return of array of arrays
		flatten: function(data) {
			
			var array = [];
					
			// flatten array
			data.forEach(function(value, key) {

				// add to new array
				array = array.concat(value);

			});
			
			return array;
			
		}
        
    };
    
})();