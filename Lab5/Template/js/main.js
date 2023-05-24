var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;
var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);


var g = svg.append("g")
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
    
    var buildings = g.selectAll("rect").data(data);
        buildings.enter()
            .append("rect")
                .attr("x", (d)=>{return x(d.name);})
                .attr("y", 1)
                .attr("width", x.bandwidth())
                .attr("height", (d)=>{return y(d.height);})
                .attr("fill",(d)=>{return colors(d.name)});

    var bottomAxis = d3.axisBottom(x);
        g.append("g")
            .attr("class", "bottom axis")
            .attr("transform", "translate(0, " + height+ ")")
            .call(bottomAxis)
            .selectAll("text")
                .attr("x", "-12")
                .attr("y", "5")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-30)");

    var leftAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat((d)=>{return d +" m";})
        g.append("g")
            .attr("class", "left axis")
            .call(leftAxis);
        g.append("text")
			.attr("class", "x axis-label")
			.attr("x", (width / 2))
			.attr("y", height + 140)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(-120, -25)")
			.text("The word's tallest buildings");
		g.append("text")
			.attr("class", "y axis-label")
			.attr("x", - (height / 2))
			.attr("y", -50)
			.attr("font-size", "20px")
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")
			.text("Height (m)");

});