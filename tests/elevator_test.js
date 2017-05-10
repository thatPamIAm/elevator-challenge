const assert = require('assert');

require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const {Elevator, Person } = require('../classes').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 5]);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Susan", currentFloor: 8, dropOffFloor: 3 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [8, 3]);
  });

  //Person A goes up
  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Pammy", currentFloor: 2, dropOffFloor: 4 };
    elevator.goToFloor(mockUser);

    console.log(elevator.riders)
    assert.equal(elevator.currentFloor, 4);
    assert.equal(elevator.totalFloors, 5)
    assert.equal(elevator.totalStops, 2)
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [2, 4]);
  });

  //Person A goes down
  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Pammy", currentFloor: 10, dropOffFloor: 2 };
    elevator.goToFloor(mockUser);

    assert.equal(elevator.currentFloor, 2);
    assert.equal(elevator.motionStatus, 'idle');
    assert.deepEqual(elevator.getStops(), [10, 2]);
  });
});
