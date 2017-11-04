var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/visualization-factory");

var d3 = require("d3");

app.ringChart = (function() {
    
    var visualizationFactory = app.visualizationFactory;
						
    return createReactClass({

        displayName: "ring-chart",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
            var _self = this;
			var component = this.props.component;
			var content = this.props.content;
            var slices = content[component.data];
            
            // set static values
            _self._calculateSettings();
			
            return (

                // component wrap
                React.createElement(
                  "svg",
                    {
                        viewBox: "0 0 " + _self.width + " " + _self.height
                    },
                    
                    // svg center translation
                    // this allows more intuitive artboard coords
                    React.createElement(
                        "g",
                        {
                            transform: "translate(" + (_self.width / 2) + "," + (_self.height / 2) + ")"
                        },
                        
                        // s
                        slices.map(function(item, i) {
                            
                            //
                            
                        })
                        
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
            _self.width = dimensions.width;
            _self.height = dimensions.height;
            
            // set other layout attributes
            /*var radius = Math.min(width, height) * 0.4;
            var outer = radius - 10;
            var inner = radius - 90;
            var arcPadding = 0.03;
            var transition = visualizationFactory.transition.time;

            // set up the arc layout algorithm
            _self.arc = d3.arc()
                .outerRadius(outer)
                .innerRadius(inner);

            // set up the pie layout algorithm
            _self.pie = d3.pie()
                .padAngle(arcPadding)
                .value(function(d) { return d.count; });*/
            
        }

    });
    
})();