class Elevator {
  constructor() {
    this.request = [];
    this.motionStatus = 'idle';
    this.dropOffFloor = 0;
    this.currentFloor = 0;
    this.stopsCounter = 0;
    this.totalFloors = 0;
  }

  reset() {
    this.request = [];
    this.dropOffFloor = 0;
    this.grabFloor = 0;
    this.currentFloor = 0;
    this.stopsCounter = 0;
    this.totalFloors = 0;
  }

  goToFloor(rider) {
    this.request.unshift(rider)
    this.currentFloor = rider.dropOffFloor;
  }

  getStops() {
    return [this.request[0].currentFloor, this.currentFloor]
  }

  countFloorsForTrip(array){
    //take the results from calling getStops()
    //Use Math.abs(current floor - dropOffFloor)
    //return this number
  }

  countStopsForTrip(){
    //stopsCounter++
  }
}

class Person {
  constructor(settings) {
    this.name = settings.name;
    this.currentFloor = settings.currentFloor;
  }

  requestDropOffFloor(desiredDropOffFloor){
    this.dropOffFloor = desiredDropOffFloor;
  }
}

export default { Elevator, Person };
