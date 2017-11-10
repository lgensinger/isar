var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("./progress-card-component");

app.foci = (function() {
	
	// store references to other components
	var componentMap = {
		"progress-card": app.progressCard
	};

    return createReactClass({

        displayName: "foci",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var components = this.props.component.components;
			var content = this.props.content[this.props.component.data];
			
            return (
                    
				// add defined component for each item in content
				content.map(function(item, i) {
					
					return React.createElement(
						"div",
						{ key: "idx-" + i },
						
						// components
						components.map(function(component, j) {

							return React.createElement(
								"div",
								{ key: "idx-" + j },

								// add component
								React.createElement(componentMap[component.uid], {
									component: component,
									content: content[i],
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