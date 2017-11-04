var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

app.progress = (function() {

    return createReactClass({

        displayName: "progress",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var components = this.props.component.components;
			
            return (
                    
				// add each defined component
				components.map(function(component, i) {

					return React.createElement(
						"div",
						{
							key: "idx-" + i
						},
						component.uid

					);

				})

            );

        }

    });
    
})();