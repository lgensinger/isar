var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("../factories/visualization-factory");

var d3 = require("d3");

app.barChart = (function() {
    
    var colorFactory = app.colorFactory;
    var visualizationFactory = app.visualizationFactory;
						
    return createReactClass({

        displayName: "bar-chart",
        
        propTypes: {
			content: PropTypes.object.isRequired,
			max: PropTypes.number.isRequired
        },
        
        componentWillMount: function() {
            
            var _self = this;
            
            // get initial data from component
			var content = this.props.content;
			
			// store data
			_self.content = content;
					
			// set static values 
            // uses d3 functions to calculate the geometry
            _self._calculateSettings(this.props.max);
			
        },

        render: function() {
			
            var _self = this;

			return (
				
				React.createElement(
					"div",
					{ className: "bar-chart" },

					// component wrap
					React.createElement(
					  "svg",
						{ viewBox: "0 0 " + (_self.width + (_self.padding * 2)) + " " + (_self.height + (_self.padding * 2)) },
						
						// fill
						React.createElement(
							"rect",
							{
								x: _self.padding,
								y: _self.padding,
								width: _self.xScale(_self.content.count),
								height: _self.height,
								style: {
									fill: colorFactory[_self.content.initiative_uid]
								}
							},
							null
						)

					)
				
				)

            );

        },
        
        // calculate all data-independent settings
        _calculateSettings: function(max) {
            
            var _self = this;
            
            // set sizes from attributes in html element
            // if not attributes present - use default
            var dimensions = visualizationFactory.getDimensions(100, 5);
			var padding = 1;
			
			// store width/height for graphic vs. svg artboard
			// padding accounts for stroke width see SCSS for value
            _self.width = dimensions.width;
            _self.height = dimensions.height;
			_self.padding = padding;
			
			// scales
            _self.xScale = d3.scaleLinear()
				.range([0, _self.width])
				.domain([0, max]);
            
        }

    });
    
})();