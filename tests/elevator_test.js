const assert = require('assert')

require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
})

const Elevator = require('../Elevator').default;
const Person = require('../Person').default;

describe('Elevator', function() {
  let elevator = new Elevator()

  afterEach(function() {
    elevator.reset()
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 }

    elevator.goToFloor(mockUser)

    assert.equal(elevator.currentFloor, 5)
    assert.equal(elevator.motionStatus, 'idle')
  })

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser2 = { name: "Susan", currentFloor: 8, dropOffFloor: 3 }

    elevator.goToFloor(mockUser2)

    assert.equal(elevator.currentFloor, 3)
    assert.equal(elevator.motionStatus, 'idle')
  })

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser3 = { name: "Pammy", currentFloor: 2, dropOffFloor: 4 }
    assert.equal(elevator.currentFloor, 0)

    elevator.goToFloor(mockUser3)

    assert.equal(elevator.currentFloor, 4)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.totalFloors, 4)
    assert.equal(elevator.motionStatus, 'idle')
  })

  it('should bring a rider to a floor below their current floor', () => { let mockUser = { name: "Pammy", currentFloor: 10, dropOffFloor: 2 };
    let mockUser4 = { name: "Pammy", currentFloor: 10, dropOffFloor: 2 }

    elevator.goToFloor(mockUser4)

    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.motionStatus, 'idle')
  })

  it('should let multiple people request drop off floors', () => {
    let Bob = { name: "Bob", currentFloor: 3, dropOffFloor: 9 }
    let Sue = { name: "Sue", currentFloor: 6, dropOffFloor: 2 }

    elevator.goToFloor(Bob)
    assert.equal(elevator.currentFloor, 9)

    elevator.goToFloor(Sue)
    assert.equal(elevator.currentFloor, 2)
  })

  it('should correctly count floors and stops when PersonA and PersonB go up', () => {
    let personA = { name: "Bob", currentFloor: 2, dropOffFloor: 4 }
    let personB = { name: "Sue", currentFloor: 5, dropOffFloor: 10 }
    assert.equal(elevator.currentFloor, 0)

    elevator.goToFloor(personA)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.totalFloors, 4)
    assert.equal(elevator.currentFloor, 4)
    assert.equal(elevator.completedRequests, 1)

    elevator.goToFloor(personB)
    assert.equal(elevator.totalStops, 4)
    assert.equal(elevator.totalFloors, 10)
    assert.equal(elevator.currentFloor, 10)
    assert.equal(elevator.completedRequests, 2)
  })

  it('should correctly count floors and stops when PersonA goes up and PersonB goes down', () => {
    let personA = { name: "Bob", currentFloor: 3, dropOffFloor: 9 }
    let personB = { name: "Sue", currentFloor: 6, dropOffFloor: 2 }
    assert.equal(elevator.currentFloor, 0)
    elevator.goToFloor(personA)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.totalFloors, 9)
    assert.equal(elevator.currentFloor, 9)
    assert.equal(elevator.completedRequests, 1)

    elevator.goToFloor(personB)
    assert.equal(elevator.totalStops, 4)
    assert.equal(elevator.totalFloors, 16)
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.completedRequests, 2)
  })

  it('should correctly count floors and stops when PersonA goes down and PersonB goes up', () => {
    let personA = { name: "Bob", currentFloor: 10, dropOffFloor: 2 }
    let personB = { name: "Sue", currentFloor: 1, dropOffFloor: 4 }
    assert.equal(elevator.currentFloor, 0)

    elevator.goToFloor(personA)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.totalFloors, 18)
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.completedRequests, 1)

    elevator.goToFloor(personB)
    assert.equal(elevator.totalStops, 4)
    assert.equal(elevator.totalFloors, 22)
    assert.equal(elevator.currentFloor, 4)
    assert.equal(elevator.completedRequests, 2)
  })

  it('should correctly count floors and stops when PersonA and PersonB go down', () => {
    let personA = { name: "Bob", currentFloor: 12, dropOffFloor: 2 }
    let personB = { name: "Sue", currentFloor: 8, dropOffFloor: 4 }
    assert.equal(elevator.currentFloor, 0)

    elevator.goToFloor(personA)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.totalFloors, 22)
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.completedRequests, 1)

    elevator.goToFloor(personB)
    assert.equal(elevator.totalStops, 4)
    assert.equal(elevator.totalFloors, 32)
    assert.equal(elevator.currentFloor, 4)
    assert.equal(elevator.completedRequests, 2)
  })

  it('should correctly count floors and stops when PersonA and PersonB share floors', () => {
    let personA = { name: "Bob", currentFloor: 4, dropOffFloor: 10 }
    let personB = { name: "Sue", currentFloor: 10, dropOffFloor: 2 }
    let personC = { name: "Brittany", currentFloor: 2, dropOffFloor: 12 }
    let personD = { name: "Robbie", currentFloor: 12, dropOffFloor: 18 }

    assert.equal(elevator.currentFloor, 0)

    elevator.goToFloor(personA)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.totalFloors, 10)
    assert.equal(elevator.currentFloor, 10)
    assert.equal(elevator.completedRequests, 1)

    elevator.goToFloor(personB)
    assert.equal(elevator.totalStops, 3)
    assert.equal(elevator.totalFloors, 18)
    assert.equal(elevator.currentFloor, 2)
    assert.equal(elevator.completedRequests, 2)

    elevator.goToFloor(personC)
    assert.equal(elevator.totalStops, 4)
    assert.equal(elevator.totalFloors, 28)
    assert.equal(elevator.currentFloor, 12)
    assert.equal(elevator.completedRequests, 3)

    elevator.goToFloor(personD)
    assert.equal(elevator.totalStops, 5)
    assert.equal(elevator.totalFloors, 34)
    assert.equal(elevator.currentFloor, 18)
    assert.equal(elevator.completedRequests, 4)
  })
})


describe('Person', function() {
 it('should instantiate a new Person with current floor logged', () => {
   let person = new Person({name: "Pamela", currentFloor: 2})

   assert.deepEqual(person, { name: 'Pamela', currentFloor: 2 })
 })

 it('should have a method that allows users to request a floor', () => {
   let person = new Person({name: "Pamela", currentFloor: 2})
   person.requestDropOffFloor(10)

   assert.deepEqual(person, { name: 'Pamela', currentFloor: 2, dropOffFloor: 10 })
 })
})
