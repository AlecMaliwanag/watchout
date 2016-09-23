// start slingin' some d3 here.
var gameOptions =
  {height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20};

var gameStats = {
  score: 0,
  bestScore: 0};

var axes = { 
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])};

var gameBoard = d3.select('.board').append('svg')
              .attr('width', gameOptions.width)
              .attr('height', gameOptions.height);

var enemies = [];
var makeEnemies = function() {
  enemies = [];
  for (var i = 0; i < gameOptions.nEnemies; i++) {
    enemies.push({id: i, x: Math.random() * 100, y: Math.random() * 100});
  }
  //console.log(enemies);
};


var update = function (data) {

  var svg = d3.select('svg');

  // DATA JOIN
  // Join new data with old elements, if any.
  var pieces = svg.selectAll('circle')
    .data(data, function(d) { return d.id; });

  // UPDATE
  // Update old elements as needed.
  pieces
      .transition()
      .duration(1000)
      .attr('cx', function(enemy) { return axes.x(Math.random() * 100); } )
      .attr('cy', function(enemy) { return axes.y(Math.random() * 100); } );

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
      .attr('r', 10)
      .style('background-image', 'url("asteroid.png")');
      //.pieces(function(d) { return d.id; });
   // .merge(text)
     // .attr("x", function(d, i) { return i * 32; });


  // EXIT
  // Remove old elements as needed.
  pieces.exit().remove();
};

makeEnemies();

setInterval(function() {
  update(enemies);
}, 1000);
