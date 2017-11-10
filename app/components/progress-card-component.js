var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("./fill-chart-component");
require("../factories/math-factory");

var moment = require("moment");

app.progressCard = (function() {
    
	var colorFactory = app.colorFactory;
	var fillChart = app.fillChart;
	var mathFactory = app.mathFactory;
						
    return createReactClass({

        displayName: "progress-card",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var component = this.props.component;
			var content = this.props.content;
			//var list = content.values;
			console.log(content);
            return (

                // component wrap
                React.createElement(
					"div",
                    {
						className: component.uid,
						style: {
							background: colorFactory[content.key]
						}
					},
					
					// title
					React.createElement(
						"h1",
						null,
						content.key
						
					),
					
					// lead
					React.createElement(
						"p",
						null,
						content.values[0].lead
					)

                )

            );

        }

    });
    
})();