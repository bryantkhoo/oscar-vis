import * as d3 from 'd3'
import oscar_data from "./datasets/awarded_films.csv";

const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 160, RIGHT: 10 }
const WIDTH = 800 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
	constructor(element) {
		const vis = this

		vis.svg = d3.select(element)
			.append("svg")
				//.attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
				//.attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
				.attr("preserveAspectRatio", "xMinYMin meet")
   				.attr("viewBox", `0 0 800 500`)
				.classed("svg-content-responsive", true)
			.append("g")
				.attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)
			

		vis.tooltip = d3.select("body").append("div")	
			.attr("class", "tooltip")				
			.style("opacity", 0);

		vis.xLabel = vis.svg.append("text")
			.attr("x", WIDTH / 2)
			.attr("y", HEIGHT + 50)
			.attr("text-anchor", "middle")

		vis.yLabel = vis.svg.append("text")
			.attr("x", -(HEIGHT / 2))
			.attr("y", -50)
			.attr("text-anchor", "middle")
			.attr("transform", "rotate(-90)")

		vis.xAxisGroup = vis.svg.append("g")
			.attr("transform", `translate(0, ${HEIGHT})`)
			

		vis.yAxisGroup = vis.svg.append("g")
		console.log('start promise')

		d3.csv(oscar_data)
			.then(function(dataset){
				dataset = dataset.slice(0,10)
				console.log(dataset)
				dataset.forEach(function(d) {
					d.nominated = +d.count_x;
					d.won = +d.count_y;
				});
				vis.nomineeData = dataset
				vis.update()
			})
		  
	}

	update() {
		const vis = this

		vis.data = vis.nomineeData;
		vis.xLabel.text(`Number of Awards/Nominations`)
		vis.yLabel.text(`Films`)
			.transition().duration(500)
			.attr("y", -100)

		// update the axis scales for transition
		const x = d3.scaleLinear()
			.domain([
				0, 
				d3.max(vis.data, d =>  d.nominated)
			])
			.range([0, WIDTH])

		const y = d3.scaleBand()
			.domain(vis.data.map(d => d.film))
			.range([0, HEIGHT])
			.padding(0.4)
		
		const xAxisCall = d3.axisBottom(x)
		vis.xAxisGroup.attr("transform",`translate(0,${HEIGHT})`)
			.transition().duration(500).call(xAxisCall)

		const yAxisCall = d3.axisLeft(y)
		vis.yAxisGroup
			.transition().duration(500).call(yAxisCall)
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", ".15em")
			.attr("transform", "rotate(-30)");
		
		// DATA JOIN
		const rectsNominated = vis.svg.selectAll("rect.nomRect")
			.data(vis.data)

		// EXIT
		rectsNominated.exit()
			.transition().duration(500)
				.attr("height", 0)
				.attr("width", 0)
				.remove()

		// UPDATE
		rectsNominated.transition().duration(500)
			.attr("class", "nomRect")
			.attr("x", 0)
			.attr("y", d => y(d.film))
			.attr("height", y.bandwidth)
			.attr("width", d => x(d.nominated))
			.attr("fill", "#96a0d6")

		// ENTER
		rectsNominated.enter().append("rect")
			.transition().duration(500)
				.attr("class", "nomRect")
				.attr("x", 0)
				.attr("width", d =>  x(d.nominated))
				.attr("y", d => y(d.film))
				.attr("height", y.bandwidth)
				.attr("fill", "#96a0d6")
		
		// DATA JOIN
		const rectsWon = vis.svg.selectAll("rect.oscarRect")
			.data(vis.data)

		// EXIT
		rectsWon.exit()
			.transition().duration(500)
				.attr("height", 0)
				.attr("width", 0)
				.remove()		

		// UPDATE
		rectsWon.transition().duration(500)
			.attr("class", "oscarRect")
			.attr("x", 0)
			.attr("y", d => y(d.film))
			.attr("height", y.bandwidth)
			.attr("width", d => x(d.won))
			.attr("fill", "#4454a6")

		// ENTER
		rectsWon.enter().append("rect")
			.transition().duration(500)
				.attr("class", "oscarRect")
				.attr("x", 0)
				.attr("width", d =>  x(d.won))
				.attr("y", d => y(d.film))
				.attr("height", y.bandwidth)
				.attr("fill", "#4454a6")
		
		const rects = vis.svg.selectAll("rect")
		rects.on('mousemove', function(event){
			vis.tooltip.style("top", (d3.event.pageY - 51) + "px")
				.style("left", (d3.event.pageX - 51) + "px")
		}).on("mouseover", function(d) {		
					vis.tooltip.transition()		
						.duration(200)		
						.style("opacity", .9);		
					vis.tooltip.html(`<p>Nomnated:${d.nominated}</br>Won: ${d.won}<p>`)	
						.style("left", (d3.event.pageX) + "px")		
						.style("top", (d3.event.pageY - 28) + "px");	
				}).on("mouseout", function(d) {		
					vis.tooltip.transition()	
						.style("opacity", 0);	
				});
	}
}