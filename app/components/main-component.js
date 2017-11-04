var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("./aggregate-component");
require("./progress-component");

app.mainComponent = (function() {
	
	return {
		
		// store references to other components
		componentMap: {
			aggregate: app.aggregate,
			progress: app.progress
		},
		
		// create component
		create: function() {
			
			var _self = this;
			
			// app level component
			return createReactClass({

				displayName: "isar",
				
				propTypes: {
					data: PropTypes.object
				},

				render: function() {
					
					var components = this.props.data.layout;
					var content = this.props.data.content;

					return (
                            
						// add each defined component
						components.map(function(component, i) {
							
							return React.createElement(
								"section",
								{
									key: "idx-" + i,
									className: component.uid
								},
								
								// add component
								React.createElement(_self.componentMap[component.uid], {
									component: component,
									content: content,
									idx: i
								})

							);

						})

					);

				}

			});
						
		},
		
		// render component
		render: function(id, data) {
			
			var _self = this;
			
			ReactDOM.render(
				React.createElement(_self.create(), {
					data: data
				}),
				document.getElementById(id)
			);
			
		}
		
	};
    
})();