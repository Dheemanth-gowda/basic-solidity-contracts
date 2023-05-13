const path = require('path');
const fs = require('fs');
const solc = require('solc')
// we are using the version specific to : "^0.4.17"

//Get the files root path
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
// Get the files content : Synchronously reads the entire contents of a file.
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];