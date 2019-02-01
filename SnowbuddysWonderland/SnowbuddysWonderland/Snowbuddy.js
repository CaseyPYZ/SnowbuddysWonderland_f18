function Snowbuddy(sbParams, markerId, miniverseData, world){
  // create a reference to our world
  this.world = world;

  //this.miniverseName = marker;
  this.miniverseParas = miniverseData[markerId];

  // create a reference to our marker
  this.marker = this.world.getMarker(markerId);

  // some numbers needed
  this.yPos = miniverseData[markerId].sbYBase;
  this.centerDiff = (sbParams.rB + sbParams.rT)*0.85;

  this.xMin = -0.35; this.xMax = 0.35;
  this.yMin = sbParams.yBase; this.yMax = sbParams.yBase;
  this.zMin = -0.35; this.zMax = 0.35;

  // wether this Snowbuddy's movement is currently under constrain
  this.constrain = true;

  // create & add a container for this Snowbuddy
  // by default: insvisible
  this.container = new Container3D({
    x:0, y:this.yPos, z:0
    ,visible:sbParams.visible,
  });

  this.marker.addChild( this.container );

  // bottom & top sphere
  // body
  this.bottomS = new Sphere({
    x:0, y:0, z:0,
    radius:sbParams.rB,
    red:255, green:255, blue:255
  });
  // head
  this.topS = new Sphere({
    x:0, y:this.centerDiff, z:0,
    radius:sbParams.rT,
    red:255, green:255, blue:255
  });

  this.container.addChild(this.bottomS);
  this.container.addChild(this.topS);

  //this.container.rotationX(90);

  // params for Perlin movement
  this.xSpeed = 0;
  this.ySpeed = 0;

  this.nDetail = random(10,30);

  this.noiseIdx_x = random(10);
  this.noiseIdx_y = random(20,30);


  // move the Snowbuddy around a little
  // Perlin noise movement
  this.move = function(){

    noiseDetail(this.nDetail);

    var xn = noise(this.noiseIdx_x);
    var zn = noise(this.noiseIdx_y);

    this.xSpeed = map(xn, 0, 1, -0.01, 0.01);
    this.zSpeed = map(zn, 0, 1, -0.01, 0.01);

    //this.container.nudge(this.xSpeed,this.zSpeed,0);

    // constrain movement
    // when needed
    if(this.constrain==true){
      this.container.constrainPosition(this.xMin, this.xMax, this.yMin, this.yMax, this.zMin, this.zMax);
    }

    this.container.nudge(this.xSpeed,0,this.zSpeed);

    this.noiseIdx_x+=0.005;
    this.noiseIdx_y+=0.005;

  }

  // this method makes sure the Snowbuddy's head and body stays together
  this.refreshY = function(){
    if(this.bottomS.getY() > this.topS.getY()){
      //console.log('heyyy');
      this.yPos = this.bottomS.getY();
      this.topS.setY(this.yPos+0.7);
    } else {
      this.yPos = this.topS.getY()-0.7;
      this.bottomS.setY(this.yPos);
    }
  }

}
