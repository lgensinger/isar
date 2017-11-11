var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("./bar-chart-component");

app.participationList = (function() {
	
	var barChart = app.barChart;
						
    return createReactClass({

        displayName: "participation-list",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },
		
		componentWillMount: function() {
            
            var _self = this;
            
            // get initial data from component
			var content = this.props.content.value.participants;
			var max = 0;
			
			// loop through content
			for (var i = 0; i < content.length; i++) {
				
				max = content[i].value.count > max ? content[i].value.count : max;
				
			}
			
			// store data
			_self.content = content;
			_self.max = max;
			
        },

        render: function() {
			
			var _self = this;
			var component = this.props.component;
			
            return (

                // component wrap
                React.createElement(
					"div",
                    { className: component.uid },
					
					// participator wrap
					_self.content.map(function(item, i) {
						
						return React.createElement(
							"div",
							{ key: "idx-" + i },
							
							// name
							React.createElement(
								"p",
								null,
								item.key
							),
							
							// bar chart
							React.createElement(
								barChart,
								{
									content: item.value,
									max: _self.max
								},
								null
							),
							
							// count
							React.createElement(
								"p",
								null,
								item.value.count + " Tasks"
							)
							
						);
						
					})

                )

            );

        }

    });
    
})();