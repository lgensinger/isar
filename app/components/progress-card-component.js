var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("./fill-chart-component");
require("../factories/utils-factory");

var moment = require("moment");

app.progressCard = (function() {
    
	var colorFactory = app.colorFactory;
	var fillChart = app.fillChart;
	var utilsFactory = app.utilsFactory;
						
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
					
					// lead wrap
					React.createElement(
						"p",
						null,
						
						// lead
						content.value.lead.map(function(lead, i) {
							
							return React.createElement(
								"span",
								{ key: "idx-" + i },
								utilsFactory.serialize(lead, i, content.value.lead.length)
							);
							
						})
					
					),
					
					// partner wrap
					React.createElement(
						"p",
						null,
						
						// lead
						content.value.partners.map(function(partner, i) {
							
							return React.createElement(
								"span",
								{ key: "idx-" + i },
								utilsFactory.serialize(partner, i, content.value.partners.length)
							);
							
						})
					
					),
					
					// fill chart
					React.createElement(
						fillChart,
						{ content: content.value },
						null
					)

                )

            );

        }

    });
    
})();