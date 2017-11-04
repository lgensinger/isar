var app = window.app;

var d3 = require("d3");

app.visualizationFactory = (function() {
    
    return {
        
        // data storage
        square: { width: 500, height: 500 },
        vertical: { width: 100, height: 500 },
        horizontal: { width: 500, height: 100 },
        transition: { time: 3000 },
        
        // get dimensions of artboard
        getDimensions: function(w, h, type) {
            
            var _self = this;
            
            // set defaults
            var width = parseFloat(w) || _self[type].width;
            var height = parseFloat(h) || _self[type].height;
                                                
            return { width: width, height: height };
            
        },
        
        // draw svg
        drawSVG: function(element, w, h) {
            
            // create svg
            var svg = d3.select(element)
                .append("svg")
                .attr("viewBox", "0 0 " + w + " " + h);
            
            return svg;
            
        }
        
    };
    
})();