// component prefixes
var list = [
	"aggregate",
	"aggregate-list",
	"area-circle-chart",
	"bar-chart",
	"fill-chart",
	"foci",
    "main",
	"participation-list",
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