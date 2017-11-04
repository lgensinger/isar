var app = window.app;

app.mathFactory = (function() {
    
    return {
        
        // return a percent value and text label
        percentOfWhole: function(value, total, shouldRound) {
			
			return shouldRound ? Math.round((value / total) * 100) : (value / total) * 100;
            
        },
		
		// get the sum of a key from an array of objects
		sumOfOjectArray: function(array) {
			
			// create simple array of values
			var values = array.map(function(d) {
				return d.value;
			});
				
			// sum the array of values
			return values.reduce(function(total, value) {
				return total + value;
			});
			
		}
        
    };
    
})();