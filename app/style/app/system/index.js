var list = [
	"palettes",
    "typography",
    "shapes"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + ".scss");
    
}