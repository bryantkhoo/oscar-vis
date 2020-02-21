(this["webpackJsonpcs5346-bryant"]=this["webpackJsonpcs5346-bryant"]||[]).push([[0],{12:function(t){t.exports=JSON.parse('[{"text":"The Academy Awards, also more popularly known as the Oscars, are awards for merit in the film industry. The dataset used for the following visualisations is obtained from Kaggle, and contains past Oscar Nominations and Award winners. The following queries are explored using the visualisation below."},{"query":"1. Which films have received the most nominations, and how many awards did they receive? From which categories were they nominated for?","text":""},{"query":"2. Which films have been awarded the most times, and for which categories?","text":""},{"query":"3. Who were the award winners for each of the main categories from 1927 to 2020?","text":""}]')},22:function(t,e,a){t.exports=a.p+"static/media/nominated_films.68fa43f3.csv"},23:function(t,e,a){t.exports=a.p+"static/media/awarded_only_films.09a00128.csv"},24:function(t,e,a){t.exports=a.p+"static/media/top_10_awarded.5e5fab46.csv"},25:function(t,e,a){t.exports=a.p+"static/media/top_10_nominated.702880db.csv"},35:function(t,e,a){t.exports=a(41)},41:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(21),i=a.n(o),s=a(3),l=a(4),c=a(10),d=a(9),m=a(11),u=a(1),f=a(22),p=a.n(f),h=a(23),y=a.n(h),v=a(24),x=a.n(v),g=a(25),w=a.n(g),b=10,A=160,E=800-A-10,N=500-b-50,D=function(){function t(e){Object(s.a)(this,t);var a=this;a.svg=u.i(e).append("svg").attr("preserveAspectRatio","xMinYMin meet").attr("viewBox","0 0 800 500").classed("svg-content-responsive",!0).append("g").attr("transform","translate(".concat(A,", ").concat(b,")")),a.tooltip=u.i("body").append("div").attr("class","tooltip").style("opacity",0),a.xLabel=a.svg.append("text").attr("x",E/2).attr("y",N+50).attr("text-anchor","middle"),a.yLabel=a.svg.append("text").attr("x",-N/2).attr("y",-50).attr("text-anchor","middle").attr("transform","rotate(-90)"),a.xAxisGroup=a.svg.append("g").attr("transform","translate(0, ".concat(N,")")),a.yAxisGroup=a.svg.append("g"),u.c(p.a).then((function(t){t=t.slice(0,10),console.log(t),t.forEach((function(t){t.nominated=+t.nominated,t.won=+t.won})),a.nomineeData=t,a.update("nominated")})),u.c(y.a).then((function(t){t=t.slice(0,10),console.log(t),t.forEach((function(t){t.won=+t.won})),a.awardeeData=t})),u.c(x.a).then((function(t){console.log(t),t.forEach((function(t){t.won=+t.won})),a.awardedDetailsData=t})),u.c(w.a).then((function(t){console.log(t),t.forEach((function(t){t.won=+t.won})),a.nominatedDetailsData=t}))}return Object(l.a)(t,[{key:"update",value:function(t){var e=this;if("nominated"===t){e.data=e.nomineeData,e.xLabel.text("Number of Awards/Nominations"),e.yLabel.text("Films").transition().duration(500).attr("y",-100);var a=u.g().domain([0,u.e(e.data,(function(t){return t.nominated}))]).range([0,E]),n=u.f().domain(e.data.map((function(t){return t.film}))).range([0,N]).padding(.4),r=u.a(a);e.xAxisGroup.attr("transform","translate(0,".concat(N,")")).transition().duration(500).call(r);var o=u.b(n);e.yAxisGroup.transition().duration(500).call(o).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-30)");var i=e.svg.selectAll("rect.nomRect").data(e.data);i.exit().transition().duration(500).attr("height",0).attr("width",0).remove(),i.transition().duration(500).attr("class","nomRect").attr("x",0).attr("y",(function(t){return n(t.film)})).attr("height",n.bandwidth).attr("width",(function(t){return a(t.nominated)})).attr("fill","#bddbc5"),i.enter().append("rect").transition().duration(500).attr("class","nomRect").attr("x",0).attr("width",(function(t){return a(t.nominated)})).attr("y",(function(t){return n(t.film)})).attr("height",n.bandwidth).attr("fill","#bddbc5");var s=e.svg.selectAll("rect.oscarRect").data(e.data);s.exit().transition().duration(500).attr("height",0).attr("width",0).remove(),s.transition().duration(500).attr("class","oscarRect").attr("x",0).attr("y",(function(t){return n(t.film)})).attr("height",n.bandwidth).attr("width",(function(t){return a(t.won)})).attr("fill","#72ad82"),s.enter().append("rect").transition().duration(500).attr("class","oscarRect").attr("x",0).attr("width",(function(t){return a(t.won)})).attr("y",(function(t){return n(t.film)})).attr("height",n.bandwidth).attr("fill","#72ad82"),e.svg.selectAll("rect").on("mousemove",(function(t){e.tooltip.style("top",u.d.pageY-51+"px").style("left",u.d.pageX-51+"px")})).on("mouseover",(function(t){t.nominated&&(e.tooltip.transition().duration(200).style("opacity",.9),e.tooltip.html(e.getDetailsInTable(e.nominatedDetailsData,t.film)).style("left",u.d.pageX+"px").style("top",u.d.pageY-28+"px"))})).on("mouseout",(function(t){e.tooltip.transition().style("opacity",0)})),e.svg.selectAll(".mydots").remove(),e.svg.selectAll(".mylabels").remove();var l=["Awarded","Nominated"],c=u.h().domain(l).range(["#72ad82","#bddbc5"]);e.svg.selectAll("mydots").data(l).enter().append("rect").attr("class","mydots").attr("x",E-100).attr("y",(function(t,e){return N-100+25*e})).attr("width",20).attr("height",20).style("fill",(function(t){return c(t)})),e.svg.selectAll("mylabels").data(l).enter().append("text").attr("class","mylabels").attr("x",E-100+24).attr("y",(function(t,e){return N-100+25*e+10})).style("fill",(function(t){return c(t)})).text((function(t){return t})).attr("text-anchor","left").style("alignment-baseline","middle")}else if("awarded"===t){e.data=e.awardeeData,e.xLabel.text("Number of Awards/Nominations"),e.yLabel.text("Films").transition().duration(500).attr("y",-100);var d=u.g().domain([0,u.e(e.data,(function(t){return t.won}))]).range([0,E]),m=u.f().domain(e.data.map((function(t){return t.film}))).range([0,N]).padding(.4),f=u.a(d);e.xAxisGroup.attr("transform","translate(0,".concat(N,")")).transition().duration(500).call(f);var p=u.b(m);e.yAxisGroup.transition().duration(500).call(p).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform","rotate(-30)");var h=e.svg.selectAll("rect").data(e.data);h.exit().transition().duration(500).attr("height",0).attr("width",0).remove(),h.transition().duration(500).attr("x",0).attr("y",(function(t){return m(t.film)})).attr("height",m.bandwidth).attr("width",(function(t){return d(t.won)})).attr("fill","#72ad82"),h.enter().append("rect").transition().duration(500).attr("x",0).attr("width",(function(t){return d(t.won)})).attr("y",(function(t){return m(t.film)})).attr("height",m.bandwidth).attr("fill","#72ad82"),e.svg.selectAll("rect").on("mousemove",(function(t){e.tooltip.style("top",u.d.pageY-51+"px").style("left",u.d.pageX-51+"px")})).on("mouseover",(function(t){t.won&&(e.tooltip.transition().duration(200).style("opacity",.9),e.tooltip.html(e.getDetailsInTable(e.awardedDetailsData,t.film)).style("left",u.d.pageX+"px").style("top",u.d.pageY-28+"px"))})).on("mouseout",(function(t){e.tooltip.transition().style("opacity",0)})),e.svg.selectAll(".mydots").remove(),e.svg.selectAll(".mylabels").remove();var y=["Awarded"],v=u.h().domain(y).range(["#72ad82"]);e.svg.selectAll("mydots").data(y).enter().append("rect").attr("class","mydots").attr("x",E-100).attr("y",(function(t,e){return N-100+25*e})).attr("width",20).attr("height",20).style("fill",(function(t){return v(t)})),e.svg.selectAll("mylabels").data(y).enter().append("text").attr("class","mylabels").attr("x",E-100+24).attr("y",(function(t,e){return N-100+25*e+10})).style("fill",(function(t){return v(t)})).text((function(t){return t})).attr("text-anchor","left").style("alignment-baseline","middle")}}},{key:"getDetailsInTable",value:function(t,e){var a="<table border=1>";return a+="<tr><th>Year</th><th>Category<th>Name</th><th>Winner</th></tr>",console.log(t),t.forEach((function(t){console.log(t.film+" and "+e),t.film===e&&("True"===t.winner?a+='<tr bgcolor="#adc3f0">':a+="<tr>",a+="<td>"+t.year_ceremony+"</td>",a+="<td>"+t.category+"</td>",a+="<td>"+t.name+"</td>",a+="<td>"+t.winner+"</td>",a+="</tr>")})),a+="</table>"}}]),t}(),O=function(t){function e(){return Object(s.a)(this,e),Object(c.a)(this,Object(d.a)(e).apply(this,arguments))}return Object(m.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.setState({chart:new D(this.refs.chart)})}},{key:"shouldComponentUpdate",value:function(){return!1}},{key:"UNSAFE_componentWillReceiveProps",value:function(t){this.state.chart.update(t.topic)}},{key:"render",value:function(){return r.a.createElement("div",{ref:"chart"})}}]),e}(n.Component),j=a(12),k=function(t){function e(){var t,a;Object(s.a)(this,e);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(c.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(r)))).state={topic:"nominated"},a.toggleNomineeAwards=function(t){return a.setState({topic:t})},a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"header col-xs-offset-1 col-xs-11"},r.a.createElement("p",null,"The Oscar Awards (1927 - 2020)"),r.a.createElement("div",{className:"subheader"},r.a.createElement("p",null,"A visualisation by KJSBryant")))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-offset-1 col-xs-6"},r.a.createElement("hr",null))),r.a.createElement("div",{className:"article"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-offset-2 col-xs-6"},r.a.createElement("p",{className:"text-content"},j[0].text))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-offset-1 col-xs-7"},r.a.createElement(O,{className:"vis-center-container",topic:this.state.topic})),r.a.createElement("div",{className:"col-xs-1"},r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"float",onClick:function(){return t.toggleNomineeAwards("nominated")}},"1")),r.a.createElement("div",{className:"row"},r.a.createElement("button",{className:"float",onClick:function(){return t.toggleNomineeAwards("awarded")}},"2")))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-offset-2 col-xs-6"},r.a.createElement("p",{className:"query-content"},j[1].query))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-xs-offset-2 col-xs-6"},r.a.createElement("p",{className:"query-content"},j[2].query)))))}}]),e}(n.Component);a(40);i.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.8d2e7526.chunk.js.map