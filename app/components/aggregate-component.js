var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");
var PropTypes = require("prop-types");

require("../factories/data-factory");

app.aggregateList = (function(d) {
    
    var dataFactory = app.dataFactory;
						
    return createReactClass({

        displayName: "aggregate-list",
        
        propTypes: {
            section: PropTypes.object.isRequired
        },

        render: function() {

            return (

                // component wrap
                React.createElement(
                  "div",
                    {
                        className: "aggregate-list"
                    },

                    // headline
                    React.createElement(
                        "h1",
                        null,
                        this.props.section.label
                    ),
                    
                    // list
                    React.createElement(
                        "ul",
                        null,
                        
                        // list item
                        this.props.section.values.map(function(item, i) {
                                
                            return React.createElement(
                                "li",
                                {
                                    key: "idx-" + i
                                },
                                
                                // item graphic
                                React.createElement(
                                    "span",
                                    null,
                                    ""
                                ),
                                
                                // item label
                                React.createElement(
                                    "span",
                                    null,
                                    
                                    item.label
                                    
                                ),
                                
                                // item value
                                React.createElement(
                                    "span",
                                    null,
                                    
                                    item.value
                                    
                                )
                                
                            );

                        })
                        
                    )

                )

            );

        }

    });
    
})();