const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
// Above we are pass the network provider details to the Web3 and create a instance.
/* Web3 is imported with the Capticalized way since we are calling a
Contructor and we can create multiple instaces of the web3 from this
library which has all the function needed to connect the blockchain network.
*/

/* Boiler-plate : Adding sample test cases to check the working*/
class Animals{
  dog(){
    return 'Barks'; 
  }
  cat(){
    return 'Mew'; 
  }
  cow(){
    return 'moo'; 
  }
};

//animal vale is undefined.
let animal;

beforeEach(() => {
  // This is called two times since two it statements are there in the describe.
  animal = new Animals();
});

//beforeEach will be called every time a it assertion is called.

describe('testing animal class', ()=>{
  it('dogs', ()=>{
    assert.equal(animal.dog(), 'Barks');
  })
  it('cats', ()=>{
    assert.equal(animal.cat(), 'Mew');
  })
})
