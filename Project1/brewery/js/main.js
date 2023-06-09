var margin = {top: 50, right: 10, bottom: 100, left:100};
var width = 600;
var height = 400;

var svg = d3.select("#chart-area")
	.append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/revenues.json").then((data)=> {
    console.log("Brewery");
    
	data.forEach((d)=>{
		d.revenue = +d.revenue;
	});
    console.log(data);
    
    var months = data.map((d) => { return d.month; }) ;
    var maxRev = d3.max(data, (d) => { return d.revenue; });

    var x = d3.scaleBand()
        .domain(months)
        .range([0, width])
        .paddingInner(0.2)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([maxRev, 0])
        .range([0, height]);

    var rects = g.selectAll("rect").data(data);
    rects.enter()
        .append("rect")
            .attr("x", (d) => {return x(d.month);})
            .attr("y", (d) => {return y(d.revenue);})
            .attr("height", (d) => {return height - y(d.revenue);})
            .attr("width", x.bandwidth())
            .attr("fill", "orange")

    var bottomAxis = d3.axisBottom(x);
    g.append("g")
    .attr("class", "bottom axis")
    .attr("transform", "translate(0, " + height + ")")
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", "10")
    .attr("x", "-5")

    var leftAxis = d3.axisLeft(y)
        .ticks(10)
	    .tickFormat((d) => { return "$" + + d/1000 + "K"; });
    g.append("g")
    .call(leftAxis);
    
    // x axis label
    g.append("text")
    .attr("class", "x axis-label")
    .attr("x", (width / 2))
    .attr("y", height + 140)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(0, -70)")
    .text("Month");

    // y axis label
    g.append("text")
    .attr("class", "y axis-label")
    .attr("x", - (height / 2))
    .attr("y", -60)
    .attr("font-size", "30px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Revenue (dlls.)");
        
}).catch((error)=> {
    console.log(error);
});