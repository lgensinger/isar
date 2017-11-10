// factory prefixes
var list = [
    "api",
	"assignee",
	"color",
    "data",
	"dom",
	"filter",
	"foci",
	"git",
	"global",
	"initiative",
	"issue",
	"math",
	"pattern",
	"project",
	"time",
    "utils",
    "visualization"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + "-factory");
    
}