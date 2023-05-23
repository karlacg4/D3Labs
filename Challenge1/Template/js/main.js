/*
*    main.js
*/
d3.json("data/buildings.json").then((data)=> {
    data.forEach(d => {
        d.height = +d.height;
    });
	console.log(data);
    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 900)
        .attr("height", 900);

    var rects = svg.selectAll("rect")
        .data(data);
        rects.enter()
            .append("rect")
                .attr("x", (d, i) => {return (i * 50 + 25)})
                .attr("y", (d, j) => {return (j * 1)})
                .attr("width", 40)
                .attr("height", (d)=>{return d.height;})
                .attr("fill","pink");

});
