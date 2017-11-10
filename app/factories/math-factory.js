var app = window.app;

app.mathFactory = (function() {
    
    return {
		
		// convert minutes to hours
		convertMinutes: function(seconds) {
			
			var minutes = seconds / 60;
			var hours = minutes / 60;
			var data = hours / 24;
			
			return Math.floor(hours);
			
		},
        
        // return a percent value and text label
        percentOfWhole: function(value, total, shouldRound) {
			
			return shouldRound ? Math.round((value / total) * 100) : (value / total) * 100;
            
        },
		
		// get the sum of a key from an array of objects
		sumOfOjectArray: function(array, key) {
			
			// create simple array of values
			var values = array.map(function(d) {
				return d.value.time[key];
			});
				
			// sum the array of values
			return values.reduce(function(total, value) {
				return total + value;
			});
			
		}
        
    };
    
})();