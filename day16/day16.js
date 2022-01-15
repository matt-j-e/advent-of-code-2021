const test1 = "8A004A801A8002F478";
const test2 = "D2FE28";

const startBin = parseInt(test1, 16).toString(2);

let binStr = "";
for (const char of test2) {
  const binChar = parseInt(char, 16).toString(2);
  const prefix = "0".repeat(4 - binChar.length);
  binStr += (prefix + binChar);
}
const version = parseInt(binStr.substr(0,3), 2);
const type = parseInt(binStr.substr(3,3), 2);
let literalVal = 0;
if (type === 4) {
  literalBin = binStr.substr(6);
  // console.log("Literal Bin", literalBin);
  literalVal = literal(literalBin);
}
console.log("Literal val", literalVal);


console.log(binStr);
console.log("version", version, "type", type);

function literal(bin) {
  let str = "";
  let final = false;
  for (let i = 0; i < bin.length; i += 5) {
    const chunk = bin.substr(i, 5);
    if (chunk[0] === '0') {
      final = true;
    }
    str += chunk.substr(1);
    if (final) break;
  }
  
  return parseInt(str, 2);
}
