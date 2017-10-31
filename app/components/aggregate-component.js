var app = window.app;

var React = require("react");
var ReactDOM = require("react-dom");
var createReactClass = require("create-react-class");


app.aggregateList = (function(d) {
						
    return createReactClass({

        displayName: "aggregate-list",

        render: function() {

            return (

                // component wrap
                React.createElement(
                  "div",
                    {
                        className: "aggregate-list"
                    },

                    React.createElement(
                        "h1",
                        null,
                        this.props.section.label
                    )

                )

            );

        }

    });
    
})();