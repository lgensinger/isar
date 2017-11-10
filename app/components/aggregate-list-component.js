var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/color-factory");
require("../factories/math-factory");

app.aggregateList = (function() {
    
	var colorFactory = app.colorFactory;
	var mathFactory = app.mathFactory;
						
    return createReactClass({

        displayName: "aggregate-list",
        
        propTypes: {
            component: PropTypes.object.isRequired,
			content: PropTypes.object.isRequired,
			idx: PropTypes.number
        },

        render: function() {
			
			var component = this.props.component;
			var content = this.props.content;
			var list = content[component.data];
			var total = mathFactory.sumOfOjectArray(list, "spent");
			
            return (

                // component wrap
                React.createElement(
                  "div",
                    null,

                    // headline
                    React.createElement(
                        "h1",
                        null,
                        component.label
                    ),
                    
                    // list
                    React.createElement(
                        "ul",
                        null,
                        
                        // list item
                        list.map(function(item, i) {
                                
                            return React.createElement(
                                "li",
                                { key: "idx-" + i },
                                
                                // item graphic
                                React.createElement(
                                    "span",
									{
										style: {
											background: colorFactory[item.key]
										}
									},
                                    ""
                                ),
                                
                                // item label
                                React.createElement(
                                    "span",
                                    null,
                                    
                                    item.key
                                    
                                ),
                                
                                // item value
                                React.createElement(
                                    "span",
                                    null,
                                    
                                    mathFactory.percentOfWhole(item.value.time.spent, total, true) + "%"
                                    
                                )
                                
                            );

                        })
                        
                    )

                )

            );

        }

    });
    
})();