const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");
// Above we are pass the network provider details to the Web3 and create a instance.
/* Web3 is imported with the Capticalized way since we are calling a
Contructor and we can create multiple instaces of the web3 from this
library which has all the function needed to connect the blockchain network.
*/
let accounts;
let inbox;
const initialMessageString = 'Hi there!' ;

beforeEach(async () => {

  // Get a list of all accounts
  //get list of all the accounts from local provider from Ganache.
  // eth here is a particular module.
  //! Every function called via web3 is async
  accounts = await web3.eth.getAccounts();
  //Use one of the acounts to deploy a contract.
  /*
   web3.eth.Contract(JSON.parse(interface)) => Contract is a constructor fnc and it allows to interact with the existing contracts in the chain.
                                            => The first arugument to the constructor is the ABI -> ABI allows connection with solidity and js.
                                            => The interface passed should be a javascript object hence need to parse before passing.
   .deploy({})                              => This line tells the web3 that we want to push a new contract.                                            
  */
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({                                           // This code doesn't deploy to the byteCode to network. It only creates an 
      data: bytecode,                                   // object which can then be deployed to the network.
      arguments: [initialMessageString],
    })
    .send({ from: accounts[0], gas: "1000000" });      // This triggers the contract creation that is from web3 to network.                                                      // It tells web3 to send a transaction that creates the contract.
});

describe("Inbox", () => {
  it("Contracy deployment is successful", () => {
    assert.ok(inbox.options.address)                // Check if this value is present only then this test will pass.
  });

  it('Initial message is set to default', async ()=>{
    const message = await inbox.methods.message().call();  // Methods is object that has all the public functions in the contracts.
                                                          // call() it is used to customize the transaction we send to the network.
    assert.equal(message, initialMessageString);
  })

  it('Can change the message set', async () =>{
    await inbox.methods.setMessage('Updated value , Bye!').send({ from : accounts[0] });
    const message = await inbox.methods.message().call(); 
    assert.equal(message, 'Updated value , Bye!')
  } )
});

/* Boiler-plate : Adding sample test cases to check the working*/
// class Animals{
//   dog(){
//     return 'Barks'; 
//   }
//   cat(){
//     return 'Mew'; 
//   }
//   cow(){
//     return 'moo'; 
//   }
// };

// //animal vale is undefined.
// let animal;

// beforeEach(() => {
//   // This is called two times since two it statements are there in the describe.
//   animal = new Animals();
// });

// //beforeEach will be called every time a it assertion is called.

// describe('testing animal class', ()=>{
//   it('dogs', ()=>{
//     assert.equal(animal.dog(), 'Barks');
//   })
//   it('cats', ()=>{
//     assert.equal(animal.cat(), 'Mew');
//   })
// })
