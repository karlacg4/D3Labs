/*
*    main.js
*/
var svg = d3.select("#chart-area").append("svg")

	.attr("width", 600)

	.attr("height", 400);

var circle = svg.append("circle")

    .attr("cx", 200)

    .attr("cy", 250)

    .attr("r", 100)

    .attr("fill", "black");

var rect = svg.append("rect")

	.attr("x", 20)

	.attr("y", 200)

	.attr("width", 200)

	.attr("height", 20)

	.attr("fill","pink");
