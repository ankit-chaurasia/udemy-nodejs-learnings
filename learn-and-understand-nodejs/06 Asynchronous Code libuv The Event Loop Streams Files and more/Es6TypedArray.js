// ArrayBuffer of size 8 bytes
// 1 byte = 8 bits
var buffer = new ArrayBuffer(8);
// Represents a raw buffer of binary data, which is used to store data for the different typed arrays.
// ArrayBuffers cannot be read from or written to directly, but can be passed to a typed array or DataView Object to interpret the raw buffer as needed.
// A typed array of 32-bit signed integer values. The contents are initialized to 0.
// If the requested number of bytes could not be allocated an exception is raised.
var view = new Int32Array(buffer);
// Size of buffer passed = 8 bytes => 8 * 8 bits => 64 bits
// So Int32Array can only store(each of 32 bits) 64/32 = 2 numbers
view[0] = 5;
view[1] = 15;
view[2] = 30; // will not give any error but does not print the value
console.log(view);
