var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("../factories/math-factory");
require("../factories/visualization-factory");

var d3 = require("d3");

app.areaCircleChart = (function() {
    
    var colorFactory = app.colorFactory;
	var mathFactory = app.mathFactory;
    var visualizationFactory = app.visualizationFactory;
						
    return createReactClass({

        displayName: "area-circle-chart",
        
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
			
			// store for render
			_self.timeKeys = Object.keys(content.value.time);
			_self.timeKeysReverse = [_self.timeKeys[1], _self.timeKeys[0]];
			_self.content = content;
            
        },

        render: function() {
			
            var _self = this;
			
            return (
				
				React.createElement(
					"div",
					null,
					
					// svg wrap for styling
					React.createElement(
						"div",
						null,
						
						// component wrap
						React.createElement(
						  "svg",
							{ viewBox: "0 0 " + _self.width + " " + _self.height },

							// svg center translation
							// this allows more intuitive artboard coords
							React.createElement(
								"g",
								{ transform: "translate(" + (_self.width / 2) + "," + (_self.height / 2) + ")" },
								null,

								// circle item wrap
								_self.timeKeys.map(function(key, i) {
									
									var value = _self.content.value.time[key];

									// update scale for render
									_self._updateScale(key, value);
									var radius = _self.aScale(visualizationFactory.getRadius(value));
									
									return React.createElement(
										"g",
										{ key: "idx-" + i },


										// circle item
										React.createElement(
											"circle",
											{
												cx: 0,
												cy: key === "estimate" ? 0 : (_self.height / 2) - radius,
												r: radius
											},
											null

										)

									);

								})

							)

						)
						
					),
					
					// text wrap
					React.createElement(
						"div",
						null,
						
						// headline
						React.createElement(
							"h1",
							null,
							_self.content.key
						),

						// summary
						React.createElement(
							"p",
							null,
							
							// time
							_self.timeKeysReverse.map(function(key, i) {
								
								return React.createElement(
									"span",
									{ key: "idx-" + i },
									
									mathFactory.convertMinutes(_self.content.value.time[key]) + "h"
									
								);
								
							})

						)
						
					)
				
				)

            );

        },
        
        // calculate all data-independent settings
        _calculateSettings: function() {
            
            var _self = this;
            
            // set sizes from attributes in html element
            // if not attributes present - use default
            var dimensions = visualizationFactory.getDimensions(200, 200);
			var padding = 2;
			
			// store width/height for graphic vs. svg artboard
			// padding accounts for stroke width see SCSS for value
            _self.width = dimensions.width;
            _self.height = dimensions.height;
			_self.padding = padding;
			
			// area scale
            _self.aScale = d3.scaleLinear();
            
        },
		
		// update scale with data
		_updateScale: function(key, value) {
			
			var _self = this;
			
			// check type of value
			// every assignee will have only 1 estiamte and 1 spent item
			if (key === "estimate") {
				
				// update scale with values from data
				_self.aScale.range([0, (_self.width / 2) - (_self.padding * 2)])
					.domain([0, visualizationFactory.getRadius(value)]); 
				
			}
			
		}

    });
    
})();