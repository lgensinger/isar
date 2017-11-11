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
			
		},
		
		// serialize text with commas
		serialize: function(string, index, count) {
			
			return count > 1 ? index !== count - 1 ? string + ", " : string : string;
						
		}
        
    };
    
})();