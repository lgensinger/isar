// factory prefixes
var list = [
    "api",
	"color",
    "data",
	"dom",
	"foci",
	"global",
	"initiative",
	"issue",
	"math",
	"project",
    "utils",
    "visualization"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + "-factory");
    
}