var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");

require("./aggregate-component");

app.mainComponent = (function() {
    
    var aggregateList = app.aggregateList;
	
	return {
		
		// store data
		sections: [
			{
				label: "Initiatives",
                data: ["Big Data Accessibility", "Cognitive Computing", "Cyber Security", "Identity", "Urban Informatics"]
			},
			{
				label: "Tasks",
                data: ["Anomaly Detection", "Language Translation", "Object Detection"]
			}
		],
		
		// create component
		create: function() {
			
			var _self = this;
			
			// top level component
			return createReactClass({

				displayName: "isar",

				render: function() {

					return (

						// component wrap
						React.createElement(
						  "section",
						  null,
                            
                            // add aggregate list component
                            _self.sections.map(function(section, i) {
                                
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
		render: function(id) {
			
			var _self = this;
			
			ReactDOM.render(
				React.createElement(_self.create(), {}),
				document.getElementById(id)
			);
			
		}
		
	};
    
})();