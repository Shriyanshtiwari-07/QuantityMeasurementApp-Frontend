const unitData = {
  length: {
    units: ["Meter","Kilometer","Centimeter","Millimeter","Mile","Yard","Foot","Inch"],
    toBase: { Meter:1, Kilometer:1000, Centimeter:0.01, Millimeter:0.001,
              Mile:1609.344, Yard:0.9144, Foot:0.3048, Inch:0.0254 }
  },
  weight: {
    units: ["Kilogram","Gram","Milligram","Pound","Ounce","Ton"],
    toBase: { Kilogram:1, Gram:0.001, Milligram:0.000001,
              Pound:0.453592, Ounce:0.0283495, Ton:1000 }
  },
  temperature: {
    units: ["Celsius","Fahrenheit","Kelvin"],
    convert(val, from, to) {
      let c = from==="Celsius"?val : from==="Fahrenheit"?(val-32)*5/9 : val-273.15;
      if (to==="Celsius") return c;
      if (to==="Fahrenheit") return c*9/5+32;
      return c+273.15;
    }
  },
  volume: {
    units: ["Liter","Milliliter","Gallon","Quart","Pint","Cup","FluidOunce"],
    toBase: { Liter:1, Milliliter:0.001, Gallon:3.78541, Quart:0.946353,
              Pint:0.473176, Cup:0.24, FluidOunce:0.0295735 }
  }
};
let currentType = "length";
let currentAction = "comparison";
let currentOp = "+";
function selectType(type) {
  currentType = type;
  document.querySelectorAll(".type-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.type === type));
  populateSelects();
  runAction();
}
function selectAction(action) {
  currentAction = action;
  document.querySelectorAll(".action-btn").forEach((b,i) =>
    b.classList.toggle("active", ["comparison","conversion","arithmetic"][i]===action));
  ["comparison","conversion","arithmetic"].forEach(a =>
    document.getElementById(a+"-panel").classList.toggle("hidden", a!==action));
  runAction();
}
function populateSelects() {
  const units = unitData[currentType].units;
  const ids = [
    "comp-from-unit","comp-to-unit",
    "conv-from-unit","conv-to-unit",
    "arith-unit1","arith-unit2","arith-result-unit"
  ];
  ids.forEach(id => {
    const sel = document.getElementById(id);
    if (!sel) return;
    const prev = sel.value;
    sel.innerHTML = units.map(u => `<option value="${u}">${u}</option>`).join("");
    if (units.includes(prev)) sel.value = prev;
    if (id.includes("to") && units.length > 1) sel.selectedIndex = 1;
  });
}
function convert(val, from, to) {
  const d = unitData[currentType];
  if (d.convert) return d.convert(val, from, to);
  return val * d.toBase[from] / d.toBase[to];
}
function doCompare() {
  const v = parseFloat(document.getElementById("comp-from-val").value) || 0;
  const from = document.getElementById("comp-from-unit").value;
  const to = document.getElementById("comp-to-unit").value;
  document.getElementById("comp-to-val").value = convert(v, from, to).toFixed(4);
}
function doConvert() {
  const v = parseFloat(document.getElementById("conv-val").value) || 0;
  const from = document.getElementById("conv-from-unit").value;
  const to = document.getElementById("conv-to-unit").value;
  document.getElementById("conv-result").value = convert(v, from, to).toFixed(4);
}
function toggleOp() {
  const ops = ["+", "-", "\u00d7", "\u00f7"];
  const i = (ops.indexOf(currentOp) + 1) % ops.length;
  currentOp = ops[i];
  document.getElementById("arith-op").textContent = currentOp;
  doArithmetic();
}
function doArithmetic() {
  const v1 = parseFloat(document.getElementById("arith-val1").value) || 0;
  const v2 = parseFloat(document.getElementById("arith-val2").value) || 0;
  const u1 = document.getElementById("arith-unit1").value;
  const u2 = document.getElementById("arith-unit2").value;
  const ru = document.getElementById("arith-result-unit").value;
  const base1 = convert(v1, u1, ru);
  const base2 = convert(v2, u2, ru);
  let result = 0;
  if (currentOp === "+") result = base1 + base2;
  else if (currentOp === "-") result = base1 - base2;
  else if (currentOp === "\u00d7") result = base1 * base2;
  else if (currentOp === "\u00f7") result = base2 !== 0 ? base1 / base2 : 0;
  document.getElementById("arith-result").textContent = result.toFixed(4);
}
function runAction() {
  if (currentAction === "comparison") doCompare();
  else if (currentAction === "conversion") doConvert();
  else doArithmetic();
}
// Init
populateSelects();
doCompare()