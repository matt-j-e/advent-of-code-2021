let filename = "input.txt";
let test = 0
if (test) {
  filename = "test.txt";
}
const fs = require('fs');
try {
  binaries = fs.readFileSync(filename, 'utf8').split('\n');
} catch(e) {
  console.log(e);
}

numBits = binaries[0].length;

let bits;
test 
? bits = [[], [], [], [], []] 
: bits = [[], [], [], [], [], [], [], [], [], [], [], []]

binaries.forEach(b => {
  for (let i = 0; i < numBits; i++) {
    bits[i].push(b[i]);
  }
});

let gamma = '';
let epsilon = '';

bits.forEach(bit => {
  numOnes = bit.filter(d => d==='1').length;
  if (numOnes > bit.length / 2) {
    gamma += 1;
    epsilon += 0;
  } else {
    gamma += 0;
    epsilon += 1;
  }
})

console.log("Answer a =", parseInt(gamma, 2) * parseInt(epsilon, 2));

// Answer a = 845186

let pos = 0;
let ogrBinaries = [...binaries]
while (ogrBinaries.length > 1) {
  let currBit = ogrBinaries.map(b => b[pos]);
  let numOnes = currBit.filter(d => d==='1').length;
  if (numOnes >= currBit.length / 2) {
    ogrBinaries = ogrBinaries.filter(b => b[pos] === "1");
  } else {
    ogrBinaries = ogrBinaries.filter(b => b[pos] === "0");
  }
  pos++;
}
const ogr = ogrBinaries[0];

pos = 0;
while (binaries.length > 1) {
  let currBit = binaries.map(b => b[pos]);
  let numZeros = currBit.filter(d => d==='0').length;
  if (numZeros <= currBit.length / 2) {
    binaries = binaries.filter(b => b[pos] === "0");
  } else {
    binaries = binaries.filter(b => b[pos] === "1");
  }
  pos++;
}
const csr = binaries[0];

console.log("Answer b =", parseInt(ogr, 2) * parseInt(csr, 2));

// Answer b = 4636702