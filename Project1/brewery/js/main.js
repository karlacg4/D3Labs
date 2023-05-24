var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);


var g = svg.append("g")
	.attr("transform","translate("+100+","+10+")");

d3.json("data/revenues.json").then((data)=> {
    data.forEach(d => {
        d.revenue = +d.revenue;
    });
    months = data.map((d)=>{return d.month});
    max_height=d3.max(data,(d)=>{return d.revenue});
    console.log(data)

    var x = d3.scaleBand()
        .domain(months)
        .range([width, 0])
        .paddingInner(0.3)
        .paddingOuter(0.3);
        
    var y = d3.scaleLinear()
        .domain([max_height, 0])
        .range([70, height]);
    
    var buildings = g.selectAll("rect").data(data);
        buildings.enter()
            .append("rect")
                .attr("x", (d)=>{return x(d.month);})
                .attr("y", (d)=>{return height - y(d.revenue) + 50;})
                .attr("width", x.bandwidth() + 10)
                .attr("height", (d)=>{return y(d.revenue);})
                .attr("fill","Orange");

    var bottomAxis = d3.axisBottom(x);
        g.append("g")
            .attr("class", "bottom axis")
            .attr("transform", "translate(0, " + (height + 50) + ")")
            .call(bottomAxis)
            .selectAll("text")
                .attr("y", "10")
                

    var leftAxis = d3.axisLeft(y)

        .tickFormat((d)=>{return "$" + (d / 1000) +"K";})
        g.append("g")
            .attr("class", "left axis")
            .attr("transform", "translate(0, " +  50 + ")")
            .call(leftAxis);
        g.append("text")
			.attr("class", "x axis-label")
			.attr("x", (width / 2))
			.attr("y", height + 140)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(0, -25)")
			.text("Month");
		g.append("text")
			.attr("class", "y axis-label")
			.attr("x", - (height / 2 + 90))
			.attr("y", -50)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
			.text("Revenue (dlls)");

});