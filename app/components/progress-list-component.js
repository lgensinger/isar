var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("./fill-chart-component");
require("../factories/utils-factory");

var moment = require("moment");

app.progressList = (function() {
    
	var colorFactory = app.colorFactory;
	var fillChart = app.fillChart;
	var utilsFactory = app.utilsFactory;
						
    return createReactClass({

        displayName: "progress-list",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var component = this.props.component;
			var content = this.props.content;
			var list = content.values;
			
            return (

                // component wrap
                React.createElement(
					"div",
                    null,
					
					// list
					list.map(function(item, i) {
						
						return React.createElement(
							"div",
							{ key: "idx-" + i },
							
							// title/status wrap
							React.createElement(
								"div",
								null,
								
								// item title
								React.createElement(
									"p",
									null,
									item.title
								),
								
								// state
								React.createElement(
									"p",
									null,
									item.state === "closed" ? "Done" : ""
								)
								
							),
							
							// fill chart
							React.createElement(
								fillChart,
								{
									content: item,
                                    height: 4
								},
                                null
							),
							
							// updated/focus wrap
							React.createElement(
								"p",
								null,
								
								// updated
								React.createElement(
									"span",
									null,
									moment(item.updated_at).fromNow()
								),

								// focus
								React.createElement(
									"span",
									null,
									utilsFactory.title(item.focus_uid)
								)
								
							)
							
						);
						
					})

                )

            );

        }

    });
    
})();