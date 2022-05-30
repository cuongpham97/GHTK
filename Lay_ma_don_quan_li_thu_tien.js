console.clear();
const delivering = document.getElementById('not-reviewed-packages').querySelectorAll(".aui-lozenge>H5>a");
console.log(`Đang giao hàng: ${delivering .length}:`);
if (delivering.length) console.log([...delivering].map(a => a.textContent.match(/\d{10}/)[0]).join(" "));

const delay = document.getElementById('delay-delivering-packages-by-operator').querySelectorAll(".aui-lozenge>H5>a");
console.log(`Delay ${delay.length}:`);
if (delay.length) console.log([...delay].map(a => a.textContent.match(/\d{10}/)[0]).join(" "));

const delivered = document.getElementById('delivered-packages-by-operator').querySelectorAll(".aui-lozenge>H5>a");
console.log(`Delivered ${delivered.length}:`);
if (delivered.length) console.log([...delivered].map(a => a.textContent.match(/\d{10}/)[0]).join(" "));