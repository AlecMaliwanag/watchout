// start slingin' some d3 here.
var data = alcData.data;

// var firstDay = data.filter(function(element) {
//   return element[9] === "2012-10-10T00:00:00";
// });

var filterDate = function(dateNum) {
  var filteredData = data.filter(function(element) {
    return Math.abs(Date.parse(element[9]) - dateNum) < 10000;
  });
  return filteredData;
};

var currentDate = Date.parse('2012-08-01T00:00:00');

// while (currentDate <= Date.parse("2013-05-30T00:00:00")) {

// }

setInterval(function() {
  var filtData = filterDate(currentDate);
  console.log(aggregateData(filtData));
  if (currentDate <= Date.parse('2013-05-30T00:00:00')) {
    currentDate += 86400000;
  } else {
    console.log('DONNNNNEEEEEE');
  }
}, 5000);

var aggregateData = function(dailyData) {
  var volByType = {whiskey: 0, gin: 0, vodka: 0, rum: 0, tequila: 0, everclear: 0, other: 0 };
  var alcTypes = {whiskey: ['WHISKIES', 'WHISKEY', 'WHISKY', 'SCOTCH', 'BOURBON'],
                  gin: ['GIN'],
                  vodka: ['VODKA'],
                  rum: ['RUM'],
                  tequila: ['TEQUILA'],
                  everclear: ['EVERCLEAR']};
  var type;

  for (var i = 0; i < dailyData.length; i++) {
    type = 'other';
    for (var alc in alcTypes) {
      for (var j = 0; j < alcTypes[alc].length; j++) {
        if (dailyData[i][19].indexOf(alcTypes[alc][j]) >= 0) {
          type = alc;
        }
      }
    }
    //console.log(dailyData[i][19]+ "   " + type);
    volByType[type] += Number(dailyData[i][30]);
  }

  return volByType;
};



// type = 19;
// volume in liters 30

// whiskey = WHISKIES, WHISKEY, WHISKY, SCOTCH, BOURBON
// GIN = GIN
// VODKA = VODKA
// rum = rum
// TEQUILA
// OTHER
// everclear EVERCLEAR
// 
/*
var graphOptions =
  {height: 900,
  width: 900,
  padding: 20};

var axes = { 
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])};

var graphBoard = d3.select('.board').append('svg')
              .attr('width', gameOptions.width)
              .attr('height', gameOptions.height);




var update = function (data) {

  var svg = d3.select('svg');

  // DATA JOIN
  // Join new data with old elements, if any.
  var pieces = svg.selectAll('circle.enemy')
    .data(data, function(d) { return d.id; });

  // UPDATE
  // Update old elements as needed.
  pieces
      .transition()
      .duration(1000)
      .attr('cx', function(enemy) { return axes.x(Math.random() * 100); } )
      .attr('cy', function(enemy) { return axes.y(Math.random() * 100); } );
      //.call(checkCollision(this,function() {console.log("hihi");}));

  // ENTER
  // Create new elements as needed.
  //
  // ENTER + UPDATE
  // After merging the entered elements with the update selection,
  // apply operations to both.

  pieces.enter().append('circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy) { return axes.x(enemy.x); } )
      .attr('cy', function(enemy) { return axes.y(enemy.y); } )
      .attr('r', 20);
      //.call(checkCollision(this,function() {console.log("hihi");}));

  // Remove old elements as needed.
  pieces.exit().remove();
};






*/


