export default class Elevator {
  constructor() {
    this.requests = []
    this.completedRequests = 0
    this.riders = []
    this.completedRides = []
    this.dropOffFloor = 0
    this.currentFloor = 0
    this.totalStops = 0
    this.totalFloors = 0
    this.motionStatus
  }

  reset() {
    this.requests = []
    this.completedRequests = 0
    this.riders = []
    this.completedRides = []
    this.dropOffFloor = 0
    this.currentFloor = 0
    this.totalStops = 0
    this.totalFloors = 0
    this.motionStatus
  }

  goToFloor(person) {
    this.requests.push(person)
    this.startElevatorTrip(person)
  }

  startElevatorTrip(person){
    this.riders.push(person)
    this.requests.shift()
    this.motionStatus = 'moving'
    this.logElevatorTrip()
    this.stopElevator()
  }

  logElevatorTrip(){
    let currentRider = this.riders[0]
    this.countStops(this.getStops())
    this.countFloors(this.getStops())
    this.currentFloor = currentRider.dropOffFloor
  }

  stopElevator(){
    this.motionStatus = 'idle'
    if (this.riders[0].dropOffFloor === this.currentFloor) {
      this.completedRides.push(this.riders[0])
      this.riders.shift()
    }
    this.completedRequests ++
  }

  getStops() {
    return [this.riders[0].currentFloor, this.riders[0].dropOffFloor]
  }

  countFloors(stopsArray){
    if(this.currentFloor === 0) {
      let floordiff1 = stopsArray[0]
      let floordiff2 = Math.abs(stopsArray[1] - stopsArray[0])
      let floorsTraversed = floordiff1 + floordiff2
      this.totalFloors = this.currentFloor + floorsTraversed
    } else {
      let floordiff1 = Math.abs(this.currentFloor - stopsArray[0])
      let floordiff2 = Math.abs(stopsArray[0] - stopsArray[1])
      let floorsTraversed = floordiff1 + floordiff2
      this.totalFloors = this.totalFloors + floorsTraversed
    }
  }

  countStops(stopsArray){
    if(this.currentFloor === stopsArray[0]) {
      this.totalStops = this.totalStops + 1
    } else {
      this.totalStops = this.totalStops + 2
    }
  }
}
