export default class Person {
  constructor(settings) {
    this.name = settings.name;
    this.currentFloor = settings.currentFloor;
  }

  requestDropOffFloor(desiredDropOffFloor){
    this.dropOffFloor = desiredDropOffFloor;
  }
 }
