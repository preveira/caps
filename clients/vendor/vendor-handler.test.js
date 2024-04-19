
const generatePackage = require('./handler.js');

describe('Testing Event Handlers', () => {
  test('Should create a package when create event fires', () => {
    console.log = jest.fn();
  
    generatePackage('1-206-flowers');
    expect(console.log).toHaveBeenCalled();
  });
});