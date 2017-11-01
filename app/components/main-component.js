var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("./aggregate-component");

app.mainComponent = (function() {
    
    var aggregateList = app.aggregateList;
	
	return {
		
		// create component
		create: function() {
			
			var _self = this;
			
			// top level component
			return createReactClass({

				displayName: "isar",
				
				propTypes: {
					sections: PropTypes.arrayOf(PropTypes.object)
				},

				render: function() {

					return (

						// component wrap
						React.createElement(
						  "section",
						  null,
                            
                            // add aggregate list component
                            this.props.sections.map(function(section, i) {
                                
                                return React.createElement(
                                    "div",
                                    {
                                        key: "idx-" + i
                                    },
                                    
                                    // aggregate list
                                    React.createElement(aggregateList, {
                                        section: section
                                    })
                                    
                                );
                                
                            })

						)

					);

				}

			});
						
		},
		
		// render component
		render: function(id, data) {
			
			var _self = this;
			
			ReactDOM.render(
				React.createElement(_self.create(), {
					sections: data
				}),
				document.getElementById(id)
			);
			
		}
		
	};
    
})();