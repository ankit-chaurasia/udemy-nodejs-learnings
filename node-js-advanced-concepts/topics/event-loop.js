//we run program using command: node event-loop.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

myFile.runContents();

function shouldContinue() {
  // node does 3 checks to decide whether or not execute the event loop
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

while (shouldContinue()) {
    
}

// exit back to terminal
