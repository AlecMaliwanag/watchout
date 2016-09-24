// start slingin' some d3 here.
var gameOptions =
  {height: 900,
  width: 700,
  nEnemies: 30,
  padding: 20};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
};
var collided = false;
var axes = { 
  x: d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  y: d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])};

var gameBoard = d3.select('.board').append('svg')
              .attr('width', gameOptions.width)
              .attr('height', gameOptions.height);
//===============================PLAYER =====================================

   // alert('dropped');
// DATA JOIN
// Join new data with old elements, if any.
var onDragDrop = function(dragHandler, dropHandler) {
  var drag = d3.behavior.drag();

  drag.on('drag', dragHandler)
  .on('dragend', dropHandler);
  return drag;
};


var dropHandler = function(d) {
   // alert('dropped');
};

var dragmove = function(d) {
  d3.select(this)
  .attr('cx', d.x = d3.event.x)
  .attr('cy', d.y = d3.event.y);
};

var player = d3.select('body').select('svg').append('g')
.data([{ x: axes.x(50), y: axes.y(50) }]);

player.append('circle')
.attr('class', 'player')
.attr('r', 10)
.attr('cx', function(d) { return d.x; } )
.attr('cy', function(d) { return d.y; } )
.attr('fill', 'red')
.call(onDragDrop(dragmove, dropHandler));



//===============================ENEMIESssss ================================
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

  

  // var onCollision = function() {
  //   updateBestScore();
  //   gameStats.score = 0;
  //   updateScore();
  // };

  // var tweenWithCollisionDetection = function(endData) {
  //   var enemy = d3.select(this);
  //   var startPos = {
  //     x: parseFloat(enemy.attr('cx')),
  //     y: parseFloat(enemy.attr('cy'))
  //   };
  //   var endPos = {
  //     x: axes.x(endData.x),
  //     y: axes.y(endData.y)
  //   };
  //   return function(t) {
  //     checkCollision(enemy, onCollision)
  //     var enemyNextPos = {
  //       x: startPos.x + (endPos.x - startPos.x)*t,
  //       y: startPos.y + (endPos.y - startPos.y)*t
  //     };
  //     enemy.attr('cx', enemyNextPos.x)
  //     .attr('cy', enemyNextPos.y);
  //   };

  // }  ;

  // pieces
  //   .transition()
  //     .duration(2000)
  //     .tween('custom', tweenWithCollisionDetection) 
      


  // EXIT
  // Remove old elements as needed.
  pieces.exit().remove();
};



//=================================COLLISIONSssss=======================
var checkCollision = function() {
  d3.selectAll('.enemy').each(function(d) {
    enemyR = d3.select(this).attr('r');
    radiusSum = parseFloat(d3.select('.player').attr('r')) + parseFloat(enemyR);
    xDiff = parseFloat(d3.select(this).attr('cx')) - parseFloat(d3.select('.player').attr('cx'));
    yDiff = parseFloat(d3.select(this).attr('cy')) - parseFloat(d3.select('.player').attr('cy'));
    //console.log(d3.select('.player').attr('cx'), d3.select(this).attr('cx'));
    separation = Math.sqrt( Math.pow(xDiff, 2) + Math.pow(yDiff, 2) );
    if (separation < radiusSum) {
      collided = true;
      gameStats.score = 0;
    }
  });
};


//DO STUFF


makeEnemies();


  // DATA JOIN
//   // Join new data with old elements, if any.
// function helga() {
//     update(enemies);
//     var enemies = d3.selectAll("circle.enemy");
//     enemies.call(checkCollision(this

//       ))
// };
var gatecheck = function() {
  if (collided === true) {
    gameStats.collisions++;
    collided = false;
  }
};
var scoreIncrease = function() {
  gameStats.score += .4;

  d3.select('.current').selectAll('span').text('' + Math.floor(gameStats.score));
  if (gameStats.score > gameStats.bestScore) {
    gameStats.bestScore = gameStats.score;
  }
  d3.select('.highscore').selectAll('span').text('' + Math.floor(gameStats.bestScore));
  d3.select('.collisions').selectAll('span').text('' + gameStats.collisions);
};
setInterval(function() {
  checkCollision();
  scoreIncrease();
}, 40);

setInterval(function() {
  update(enemies);
  gatecheck();
  //helga();
  //console.log(d3.selectAll("circle.enemy'").attr("cx"));
//   var pieces = d3.selectAll('circle.enemy');
// console.log(pieces);
//    pieces.forEach(function(enemy) {
//      checkCollision(enemy, function(){console.log("freud likes butts")});
//    });
}, 1000);












