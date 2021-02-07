function createMAP(){
    for (i = 0; i < MapDim.row; i++){
      MAP.push([]);
    }
    for (i = 0; i < MapDim.col; i++){
        MAP[0].push(MapChr.wall);
        MAP[MapDim.row-1].push(MapChr.wall);
    }
    for (i=1;i<MapDim.row-1;i++){
    MAP[i].push(MapChr.wall);
    for (j=0;j<MapDim.col-2;j++)
        MAP[i].push(MapChr.land);
    MAP[i].push(MapChr.wall);
    }
  PLoc[0] = Math.floor(Math.random()*(MapDim.row-2))+1;
  PLoc[1] = Math.floor(Math.random()*(MapDim.col-2))+1;
  
  MAP[PLoc[0]][PLoc[1]] = MapChr.user;
}

function showMAP(){
    var temp = "<table>";
    for (i = 0; i < MapDim.row; i++){
        temp += "<tr>";
        for (j = 0; j < MapDim.col; j++)
            temp += "<td>" + MAP[i][j] + "<td>";
        temp += "</tr>";
    }
    temp += "</table>";
    document.getElementById("MAP").innerHTML = temp;
}

function objGen(num,size,type){
  temp = [0,0];
  for (i=0;i<num;i++){
    while (true){
      temp[0] = Math.floor(Math.random()*(MapDim.row-size*2))+size;
      temp[1] = Math.floor(Math.random()*(MapDim.col-size*2))+size;
      if (MAP[temp[0]][temp[1]] == MapChr.land)
        break;
    }
    MAP[temp[0]][temp[1]] = type;
  }
}

function movePlyr(x, y){
  MAP[PLoc[0]][PLoc[1]] = MapChr.land;
  if (OnGoal[0] != 0){
    MAP[OnGoal[0]][OnGoal[1]] = MapChr.goal;
    OnGoal[0] = OnGoal[1] = 0;
  }

  if (MAP[PLoc[0]+x][PLoc[1]+y] == MapChr.goal){
    OnGoal[0] = PLoc[0]+x;
    OnGoal[1] = PLoc[1]+y;
    PLoc[0] += x;
    PLoc[1] += y;
  }
  else if (MAP[PLoc[0]+x][PLoc[1]+y] != MapChr.wall && MAP[PLoc[0]+x][PLoc[1]+y] != MapChr.done){
    if (MAP[PLoc[0]+x][PLoc[1]+y] != MapChr.obj){}
    else if (MAP[PLoc[0]+(x*2)][PLoc[1]+(y*2)] == MapChr.land){
      MAP[PLoc[0]+(x*2)][PLoc[1]+(y*2)] = MapChr.obj;
      MAP[PLoc[0]+x][PLoc[1]+y] = MapChr.land;
    }
    else if (MAP[PLoc[0]+(x*2)][PLoc[1]+(y*2)] == MapChr.goal){
      MAP[PLoc[0]+(x*2)][PLoc[1]+(y*2)] = MapChr.done;
      MAP[PLoc[0]+x][PLoc[1]+y] = MapChr.land;
      FIN += 1;
    }
    else{
      PLoc[0] -= x;
      PLoc[1] -= y;
    }
    PLoc[0] += x;
    PLoc[1] += y;
  }
  MAP[PLoc[0]][PLoc[1]] = MapChr.user;
}

function CtrlUp(){
    movePlyr(-1,0);
    after();
}
function CtrlLeft(){
    movePlyr(0,-1);
    after();
}
function CtrlDown(){
    movePlyr(1,0);
    after();
}
function CtrlRight(){
    movePlyr(0,1);
    after();
}

function after(){
    showMAP();
    document.getElementById("stats").innerHTML = "Move all " + MapChr.obj + " to " + MapChr.goal + "!\nYou can walk over " + MapChr.goal;
    if (FIN < 0){
        reset();
    }
    else if (FIN == OBJ){
        document.getElementById("stats").innerHTML = 'Congratulations! You have successfully finished this map!';
        reset();
    }
}

function reset(){
    FIN=0, OBJ=3, MAP=[];
    createMAP();
    objGen(OBJ,1,MapChr.goal);
    objGen(OBJ,2,MapChr.obj);
    showMAP();
}


var MapDim = {row:8,col:12};
var MapChr = {wall:'🟥',land:' ',user:'👷🏽',goal:'★',obj:'📦',done:'✔️'};
//❌
var PLoc = [0,0], OnGoal = [0,0];
var FIN, OBJ, MAP;
document.getElementById("stats").innerHTML = "Move all " + MapChr.obj + " to " + MapChr.goal + "!\nYou can walk over " + MapChr.goal;
reset();

/*

while (true){
  
  while (true){
    showMAP();
    temp = prompt("");
    switch(temp){
      case 'w':
        movePlyr(-1,0);
        break;
      case 'a':
        movePlyr(0,-1);
        break;
      case 's':
        movePlyr(1,0);
        break;
      case 'd':
        movePlyr(0,1);
        break;
      case "r":
        FIN = -1;
        break;
    }
    if (FIN < 0){
      console.log('You have failed to complete this map!\n');
      break;
    }
    else if (FIN == OBJ){
      console.log('Congratulations! You have successfully finished this map!');
      break;
    }
  }
}

*/
