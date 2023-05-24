var margin = {top: 10, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);


var group= svg.append("g")
	.attr("transform","translate("+100+","+10+")");

d3.json("data/buildings.json").then((data)=> {
    data.forEach(d => {
        d.height = +d.height;
    });
    names = data.map((d)=>{return d.name});

    var x = d3.scaleBand()
        .domain(names)
        .range([0, 400])
        .paddingInner(0.3)
        .paddingOuter(0.3);
        
    var y = d3.scaleLinear()
        .domain([0, 828])
        .range([0, 400]);

    var colors = d3.scaleOrdinal()
        .domain(names)
        .range(d3.schemeSet3);
    
    var buildings = group.selectAll("rect").data(data);
        buildings.enter()
            .append("rect")
                .attr("x", (d)=>{return x(d.name);})
                .attr("y", (d)=>{return height - y(d.height);})
                .attr("width", x.bandwidth())
                .attr("height", (d)=>{return y(d.height);})
                .attr("fill",(d)=>{return colors(d.name)});
    


});