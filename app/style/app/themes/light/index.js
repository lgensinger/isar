var list = [
    "ring-chart",
    "progress",
    "progress-card"
];

// add dependent modules
for (var i=0; i < list.length; i++) {
    
    require("./" + list[i] + ".scss");
    
}