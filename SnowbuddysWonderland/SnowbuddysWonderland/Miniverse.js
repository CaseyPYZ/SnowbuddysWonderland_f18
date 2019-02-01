function Miniverse(name, miniverseData, world){
  // create a reference to our world
  this.world = world;

  this.name = name;
  this.paramsData = miniverseData[name];

  // create a reference to our marker
  this.marker = this.world.getMarker(this.paramsData.markerId);

  // geometries
  this.cube = new Box(this.paramsData.cubeParas);

  this.floor = new Box(this.paramsData.floorParas);
  //this.backwall = new Plane(this.paramsData.backwallParas);

  // OBJ
  this.obj = new OBJ(this.paramsData.objParas);

  //this.marker.addChild(this.obj);
  this.marker.addChild(this.cube);
  this.marker.addChild(this.floor);
  //this.marker.addChild(this.backwall);

}
