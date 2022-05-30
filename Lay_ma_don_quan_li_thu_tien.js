const obj = {
    'Đang giao hàng': 'not-reviewed-packages',
    'Đã giao hàng': 'delivered-packages-by-operator',
    'Đã giao một phần': 'delivered-apart-packages-by-cod',
    'Hủy trả shop': 'not-delivered-packages-by-operator',
    'Delay': 'delay-delivering-packages-by-operator'
};

console.clear();

for ([status, className] of Object.entries(obj)) {
    let elems = document.getElementById(className).querySelectorAll(".aui-lozenge>H5>a");
    console.log(`${status} ${elems.length}: ` + [...elems].map(a => a.textContent.match(/\d{10}/)[0]).join(" "));
}