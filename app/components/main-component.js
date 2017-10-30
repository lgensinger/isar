var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");


app.mainComponent = (function() {
	
	return {
		
		// store data
		sections: [
			{
				name: "aggregate"
			},
			{
				name: "progress"
			}
		],
		
		// create component
		create: function() {
			
			var _self = this;
			
			// top level component
			var isar = createReactClass({

				displayName: "isar",

				render: function() {

					return (

						// component wrap
						React.createElement(
						  "section",
						  null,
						  _self.sections.map(function (week) {
							return React.createElement(
							  "li",
							  null,
							  week.name
							);
						  })
						)

					);

				}

			});
			
			return isar;
			
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