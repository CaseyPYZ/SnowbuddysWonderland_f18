// keep track of whether the video has been repositioned yet
// markers needs to be fliped too if we flip the video --------------------------------------------------------------- *
var videoRepositioned = true;

// create a variable to hold our world object
var world;

// create variables to hold our markers
var markerHiro, markerZb;
var markerJin, markerMu, markerShui, markerHuo, markerTu, markerMing, markerAn, markerXu, markerShi;
var markerArray = [];

// our miniverse models
var miniverse1;

// our Snowbuddy array
var sbArray = [];

// Snowbuddy parameters
var sbParams = {
  //markerId:'hiro',
  //yBase:0.05,
  rB:0.07,
  rT:0.055,
  visible:false
};

var active = 5;
var previous = 5;

var sbTravel = false;
var speed = 0.005;

var previousPos, activePos;

// our Miniverses
var Hiro, Bluuuey;
var Jin, Mu, Shui, Huo, Tu, Ming, An, Xu, Shi;
var miniverseArray = [];
var miniverseNames = ["jin","mu","shui","huo","tu","hiro","ming","an","xu","shi","zb"];

// our audios
var bgmJin, bgmMu, bgmShui, bgmHuo, bgmTu, bgmHiro;
var bgmArray = [];


function preload(){
  // load our JSON file
  miniverseData = loadJSON("data/miniverses.json");

  // load our audios
  for(var m=0; m<6; m++){
    var bgm = loadSound("aud/" + miniverseNames[m] + ".mp3");
    bgm.playMode('untilDone');
    bgmArray.push(bgm);
  }



}


function setup() {
  // create our world (this also creates a p5 canvas for us)
  world = new World('ARScene');

  // grab a reference to our two markers that we set up on the HTML side (connect to it using its 'id')
  markerHiro = world.getMarker('hiro');
  markerZb = world.getMarker('zb');

  // my custom markers
  markerJin = world.getMarker('jin');
  markerMu = world.getMarker('mu');
  markerShui = world.getMarker('shui');
  markerHuo = world.getMarker('huo');
  markerTu = world.getMarker('tu');
  markerMing = world.getMarker('ming');
  markerAn = world.getMarker('an');
  markerXu = world.getMarker('xu');
  markerShi = world.getMarker('shi');

  markerArray = [markerJin, markerMu, markerShui, markerHuo, markerTu, markerMing, markerAn, markerXu, markerShi, markerHiro, markerZb];


  // create our miniverses

  Hiro = new Miniverse("hiro", miniverseData, world);
  Bluuuey = new Miniverse("zb", miniverseData, world);

  Jin = new Miniverse( miniverseNames[0], miniverseData, world ); miniverseArray.push(Jin);
  Mu = new Miniverse( miniverseNames[1], miniverseData, world ); miniverseArray.push(Mu);
  Shui = new Miniverse( miniverseNames[2], miniverseData, world ); miniverseArray.push(Shui);
  Huo = new Miniverse( miniverseNames[3], miniverseData, world ); miniverseArray.push(Huo);
  Tu = new Miniverse( miniverseNames[4], miniverseData, world ); miniverseArray.push(Tu);
  Ming = new Miniverse( miniverseNames[5], miniverseData, world ); miniverseArray.push(Ming);
  An = new Miniverse( miniverseNames[6], miniverseData, world ); miniverseArray.push(An);
  Xu = new Miniverse( miniverseNames[7], miniverseData, world ); miniverseArray.push(Xu);
  Shi = new Miniverse( miniverseNames[8], miniverseData, world ); miniverseArray.push(Shi);

  Jin.marker.addChild(Jin.obj);
  Mu.marker.addChild(Mu.obj);
  Shui.marker.addChild(Shui.obj);
  Huo.marker.addChild(Huo.obj);
  Tu.marker.addChild(Tu.obj);
  Hiro.marker.addChild(Hiro.obj);

  // create our Snowbuddies

  for(var b=0; b<11; b++){
    SBnew = new Snowbuddy( sbParams, miniverseNames[b], miniverseData, world );
    sbArray.push(SBnew);
  }

  // audio properties

  bgmArray[0].setVolume(0.2);
  //bgmArray[1].setVolume(1);
  bgmArray[2].setVolume(0.3);
  bgmArray[3].setVolume(0.2);
  bgmArray[4].setVolume(0.3);
  bgmArray[5].setVolume(0.3);

  sbArray[active].container.show();

} // end of setup


function draw() {

  for(var s=0; s<bgmArray.length; s++){
    if(s==active){
      bgmArray[s].play();
    } else {
      bgmArray[s].pause();
    }
  }

  previousPos = sbArray[previous].container.getWorldPosition();
  activePos = sbArray[active].container.getWorldPosition();

  if(sbTravel){
    travel();
  } else {

    sbArray[active].move();
  }

}


function keyPressed(){

  // switch active Snowbuddy
  if(keyCode === 49){ // jin
    previous = active;
    active = 0;
    sbTravel = true;

  } else if (keyCode === 50) { // mu
    previous = active;
    active = 1;
    sbTravel = true;

  } else if (keyCode === 51) { // shui
    previous = active;
    active = 2;
    sbTravel = true;

  } else if (keyCode === 52) { // huo
    previous = active;
    active = 3;
    sbTravel = true;

  } else if (keyCode === 53) { // tu
    previous = active;
    active = 4;
    sbTravel = true;

  } else if (keyCode === 54) { // hiro
    previous = active;
    active = 5;
    sbTravel = true;

  } else if (keyCode === 55) {
    previous = active;
    active = 6;
    sbTravel = true;

  } else if (keyCode === 56) {
    previous = active;
    active = 7;
    sbTravel = true;

  } else if (keyCode === 57) {
    previous = active;
    active = 8;
    sbTravel = true;

  } else if (keyCode === 48) { //hiro
    previous = active;
    active = 9;
    sbTravel = true;

  } else if (keyCode === 189) { //zb
    previous = active;
    active = 10;
    sbTravel = true;
  }
}

function travel(){

  if( markerArray[previous].isVisible() && markerArray[active].isVisible() ){

    var previousPos = sbArray[previous].container.getWorldPosition();
    var activePos = sbArray[active].container.getWorldPosition();

    // are we down travlling?
    if (  (abs(previousPos.x - activePos.x) <= speed) && (abs(previousPos.z - activePos.z) <= speed)  ){

      sbArray[previous].container.hide();
      sbArray[active].container.show();
      sbArray[previous].container.setPosition(0,sbArray[previous].yPos,0);
      sbArray[previous].constrain = true;

      sbTravel = false;

    }

    else {
        sbArray[previous].constrain = false;

        //console.log("previous: " + previousPos.x, previousPos.y, previousPos.z);
        //console.log("active: " + activePos.x, activePos.y, activePos.z);


        // x
        if (abs(previousPos.x - activePos.x) <= speed) {
          sbArray[previous].container.x = activePos.x;

        } else { // otherwise see if we have to move left or right
          if (previousPos.x > activePos.x) {
            sbArray[previous].container.nudge(-speed,0,0);
          } else if (previousPos.x < activePos.x) {
            sbArray[previous].container.nudge(speed,0,0);
          }
        }

        // z
        if (abs(previousPos.z - activePos.z) <= speed) {
          sbArray[previous].container.y = activePos.y;

        } else {
          // move up or down
          if (previousPos.z > activePos.z) {
            sbArray[previous].container.nudge(0,0,-speed);
          } else if (previousPos.z < activePos.z) {
            sbArray[previous].container.nudge(0,0,speed);
          }
        }

      }


  } // end of isVisible()


}
