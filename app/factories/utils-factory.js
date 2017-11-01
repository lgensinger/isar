var app = window.app;

app.utilsFactory = (function() {
    
    return {
		
		// convert value to array of values
		convertToArray: function (array, dedupKey) {
			
			var data = [];
			
			// loop through array
			for (var i = 0; i < array.length; i++) {
				
				// iter value
				var value = array[i][dedupKey];
				
				// check if not already in array
				if (!data.includes(value)) {

					// add to array
					data.push(value);
					
				}
				
			}
			
			return data;
			
		},
		
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
        
        // return a random integer in a specified range
        randint: function(min, max) {
            
            var minimum = Math.ceil(min);
            var maximum = Math.floor(max);

            return Math.floor(Math.random() * (maximum - minimum)) + minimum;
            
        }
        
    };
    
})();