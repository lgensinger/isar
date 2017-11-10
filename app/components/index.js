// component prefixes
var list = [
	"aggregate",
	"aggregate-list",
	"area-circle-chart",
	"fill-chart",
	"foci",
    "main",
	"personnel",
	"progress",
	"progress-card",
	"progress-list",
    "ring-chart"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + "-component");
    
}