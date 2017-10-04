d3.csv('data1.csv', function(error, dataset) {
  dataset.forEach(function(d) {
    d.NivelMaximo = +d.NivelMaximo;
    d.NivelPromedioRegistradoAntes = +d.NivelPromedioRegistradoAntes;
    d.NivelPromedioRegistradoDespues = +d.NivelPromedioRegistradoDespues;
    d.NivelPromedioRegistradoDurante = +d.NivelPromedioRegistradoDurante;
    d.DiferenciaNivelesAntes = +d.DiferenciaNivelesAntes;
    d.DiferenciaNivelesDespues = +d.DiferenciaNivelesDespues;
    d.DiferenciaNivelesDurante = +d.DiferenciaNivelesDurante;
    d.IndiceAntes = +d.IndiceAntes;
    d.IndiceDespues = +d.IndiceDespues;
    d.IndiceDurante = +d.IndiceDurante;
  })

  var dimensionTiempo = ["Antes", "Durante", "Después"]

  function gridData() {
    var data = new Array()
       ,xpos = 1
       ,ypos = 1
       ,width = 60
       ,height = 70;

    for (var row = 0; row < dataset.length; row++) {
      data.push( new Array() );
      var rowData = dataset[row]
         ,element = d3.map(rowData)
         ,elementValues = element.values();

      for (var column = 0; column < dimensionTiempo.length; column++) {

        data[row].push({
          x: xpos,
          y: ypos,
          width: width,
          height: height,
          barrio: elementValues[0],
          nivelMaximo: elementValues[1],
          nivelPromedioRegistrado: elementValues[3 * (column) + 2],
          diferenciaNiveles: elementValues[3 * (column) + 3],
          indice: elementValues[3 * (column) + 4]
        })

        //xpos += width;
        ypos += height;

      }
      //xpos = 1;
      //ypos += height;
      ypos = 1;
      xpos += width;
    }

    return data;
  }

  var gridData = gridData()
     ,margin = {top: 50, right: 20, bottom: 100, left: 30}
     ,width = 800
     ,height = 450
     ,widthScale = d3.scaleBand().range([0, 600])
     ,heightScale = d3.scaleBand().range([0, 220]);

  var grid = d3.select("#chart")
               .append("svg")
               .attr("width", width )
               .attr("height", height )
               .append("g")
               .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
     ,xAxis = grid.append("g")  
                  .attr("class", "x axis")
                  .attr("transform","translate(70,320)")                      
     ,yAxis = grid.append("g")
                  .attr("class", "y axis")
                  .attr("transform","translate(70,100)");

  widthScale.domain(dataset.map(function(d) { return d.Barrio; }));
  heightScale.domain(dimensionTiempo);

  xAxis.call(d3.axisBottom(widthScale)
               .tickSizeOuter(0)
               .tickSize(0))
       .selectAll("path")
       .style("display","none");

  xAxis.selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", "-.8em")
       .attr("dy", ".15em")
       .attr("transform", "rotate(-45)");

  yAxis.call(d3.axisLeft(heightScale)
               .tickSizeOuter(0)
               .tickSize(0))
       .selectAll("path")
       .style("display","none");

  yAxis.selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", "-.8em")
       .attr("dy", ".15em");

  var colors = ["#0571b0","#92c5de","#f7f7f7","#f4a582","#ca0020"];
  var colorScale = d3.scaleQuantile()
                     .domain([0, 4])
                     .range(colors);

  var labels = ["<= -2","-1","0","1",">= 2"]
     ,legend = grid.selectAll(".legend").data(labels);
  legend.enter()
        .append("rect")
        .attr("width", 50)
        .attr("height", 20)
        .attr("fill", function (d, i) { return colors[i]; })
        .attr("x", function (d, i) { return i * 50 + 240; })
        .attr("y", 10);
  legend.enter()
        .append("text")
        .attr("class", "legend")
        .attr("y", 40)
        .attr("x", function (d, i) { return i * 50 + 260; })
        .attr("text-anchor", "middle")
        .text(function (d, i) { return labels[i]; });
  legend.exit().remove();

  var row = grid.selectAll(".row")
                .data(gridData)
                .enter()
                .append("g")
                .attr("class", "row");

  var tooltip = grid.append("text")
                    .attr("class", "tooltip");

  var corrimientoX = 100, corrimientoY = 110;
  var column = row.selectAll(".square")
                  .data(function(d) { return d; })
                  .enter()
                  .append("rect")
                  .attr("class","square")
                  .attr("x", function(d) { return d.x + 70; })
                  .attr("y", function(d) { return d.y + 100; })
                  .attr("width", function(d) { return d.width; })
                  .attr("height", function(d) { return d.height; })
                  .style("fill", function(d){ return colorScale(d.indice + 2);})
                  .style("stroke", "#222")
                  .on("mouseover", function(d){ tooltip.style("visibility","visible")
                                                       .append('tspan')
                                                       .attr("x",d.x+corrimientoX)
                                                       .attr("y",d.y+corrimientoY + 5)
                                                       .text("Max: " + d.nivelMaximo)
                                                       .append('svg:tspan')
                                                       .attr("x",d.x+corrimientoX)
                                                       .attr("y",d.y+corrimientoY + 20)
                                                       .text("Prom: " + d.nivelPromedioRegistrado)
                                                       .append('svg:tspan')
                                                       .attr("x",d.x+corrimientoX)
                                                       .attr("y",d.y+corrimientoY + 35)
                                                       .text("Dif: " + d.diferenciaNiveles)
                                                       .append('svg:tspan')
                                                       .attr("x",d.x+corrimientoX)
                                                       .attr("y",d.y+corrimientoY + 50)
                                                       .text("Nivel: " + d.indice)
                                              })
                  .on("mouseout",function(d){grid.selectAll("tspan").remove();});
});
