var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("../factories/visualization-factory");

var d3 = require("d3");

app.ringChart = (function() {
    
    var colorFactory = app.colorFactory;
    var visualizationFactory = app.visualizationFactory;
						
    return createReactClass({

        displayName: "ring-chart",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },
        
        componentWillMount: function() {
            
            var _self = this;
            
            // set static values 
            // uses d3 functions to calculate the geometry
            _self._calculateSettings();
            
            // get initial data from component
            var component = this.props.component;
			var content = this.props.content;
            var rings = content[component.data];
            
            // use d3 to process component data into svg data
            var data = _self._enrichRings(rings);
            
            // store enriched data to component for render
            _self.rings = data;
            
        },

        render: function() {
			
            var _self = this;
			
            return (

                // component wrap
                React.createElement(
                  "svg",
                    { viewBox: "0 0 " + _self.width + " " + _self.height },
                    
                    // svg center translation
                    // this allows more intuitive artboard coords
                    React.createElement(
                        "g",
                        { transform: "translate(" + (_self.width / 2) + "," + (_self.height / 2) + ")" },
                        
                        // ring item
                        _self.rings.map(function(slices, i) {
                            
                            // calculate radius
                            _self._calculateRadius(i);
                            
                            // slice wrap
                            return React.createElement(
                                "g",
                                { key: "idx-" + i },
                                  
                                // slice item
                                slices.map(function(item, i) {
                                    console.log(item);
                                    return React.createElement(
                                        "g",
                                        { key: "idx-" + i },
                                        
                                        // item arc
                                        React.createElement(
                                            "path",
                                            {
                                                d: _self.arc(item),
                                                fill: colorFactory[item.data.focus_uid === undefined ? item.data.key : item.data.initiative_uid]
                                            },
                                            null
                                        )
                                        
                                    );
                                    
                                })
                                
                            );
                            
                        })
                        
                    )

                )

            );

        },
        
        // custom arc due to concentric circles
        // otherwise the d3.arc function would be used outright
        _calculateRadius: function(idx) {
            
            var _self = this;
            
            // calculate new outer radius
            var radius = _self.radius - (_self.radius * (idx * 0.15));
            
            // update radii based on ring index
            _self.arc
                .outerRadius(radius + _self.radiusDifference)
                .innerRadius(radius);
            
            // store new radius
            _self.radius = radius;
            
        },
        
        // calculate all data-independent settings
        _calculateSettings: function() {
            
            var _self = this;
            
            // set sizes from attributes in html element
            // if not attributes present - use default
            var dimensions = visualizationFactory.getDimensions(200, 200);
            _self.width = dimensions.width;
            _self.height = dimensions.height;
            
            // strore radius 
            _self.radiusDifference = 20;
            _self.radius = Math.min(_self.width / 2, _self.height / 2) - _self.radiusDifference;
            _self.outer = _self.radius;

            // store initial arc function
            _self.arc = d3.arc();

            // set up the pie layout algorithm
            _self.pie = d3.pie()
                .value(function(d) { return d.value; });
            
        },
        
        // enrich component data with d3 svg calculations for render
        _enrichRings: function(rings) {
            
            var _self = this;   
            var data = [];
            
            // loop through array of values where each is a slice in the ring
            for (var i = 0; i < rings.length; i++) {
                
                // use d3 to calculate start/end angles for the slice
                data.push(_self.pie(rings[i]));
                
            }
            
            return data;
            
        }

    });
    
})();