var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("./area-circle-chart-component");
require("./progress-list-component");

app.personnel = (function() {
	
	// store references to other components
	var componentMap = {
		"area-circle-chart": app.areaCircleChart,
		"progress-list": app.progressList
	};

    return createReactClass({

        displayName: "personnel",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var components = this.props.component.components;
			var contentBase = this.props.content;
			var content = contentBase[this.props.component.data];
			
            return (
                    
				// add defined component for each item in content
				content.map(function(item, i) {
					
					return React.createElement(
						"div",
						{
							key: "idx-" + i
						},
						
						// components
						components.map(function(component, j) {

							return React.createElement(
								"div",
								{
									key: "idx-" + j,
									className: component.uid
								},

								// add component
								React.createElement(componentMap[component.uid], {
									component: component,
									content: contentBase[component.data][i],
									idx: i
								})

							);

						})
						
					);
					
				})

            );

        }

    });
    
})();