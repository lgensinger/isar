var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("./aggregate-list-component");
require("./ring-chart-component");

app.aggregate = (function() {
	
	// store references to other components
	var componentMap = {
		"aggregate-list": app.aggregateList,
        "ring-chart": app.ringChart
	};

    return createReactClass({

        displayName: "aggregate",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var components = this.props.component.components;
			var content = this.props.content;
			
            return (
                    
				// add each defined component
				components.map(function(component, i) {

					return React.createElement(
						"div",
						{
							key: "idx-" + i,
							className: component.uid
						},
						
						// add component
						React.createElement(componentMap[component.uid], {
							component: component,
							content: content,
							idx: i
						})

					);

				})

            );

        }

    });
    
})();