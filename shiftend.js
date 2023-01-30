const REASON = {
  'all': 'Đang chờ xuất',
  'tồn >6h': 'Đang chờ xuất',
  'tồn >1 ngày': 'Thiếu hàng trong phiên kiểm bao',
  'tồn >2 ngày': 'Thiếu hàng trong phiên kiểm bao',
  'tồn >3 ngày': 'Thiếu hàng trong phiên kiểm bao'
};

function createElementEvent(element, event) {
  return new Promise((resolve, _reject) => {
    element.addEventListener(event, () => {
      resolve(true);
    });

    element.dispatchEvent(new Event(event));
  });
}

async function delay(time) {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

function openMenuCollapse(element) {
  element.classList.add("show");
  element.style.display = "block";
}

async function displayAllInputFields(parentElement) {
  do {
    var loadMoreLink = parentElement.querySelector('a[href="javascript:void(0)"]');

    if (loadMoreLink) {
      await createElementEvent(loadMoreLink, 'click');
    }
  } while (loadMoreLink && loadMoreLink.style.visibility == 'visible');
}

async function showAllBackLogCollapses() {
  const backLog = document.querySelector(".back-log").parentNode;
  openMenuCollapse(backLog);

  const collapses = [...backLog.querySelectorAll('[data-toggle="collapse"]')];

  for (e of collapses) {
    if (!e.nextElementSibling.classList.contains('show')) {
      await createElementEvent(e, 'click');
      await delay(300);
    }

    await displayAllInputFields(e.nextElementSibling);
  }
}

async function changeSwitchInputValue(input, text) {
  const multiselect = input.querySelector('.multiselect');
  if (!multiselect || !multiselect.classList.contains('in-valid')) {
    console.log('Bỏ qua một trường đã có giá trị', input);
    
    return;
  }

  await createElementEvent(multiselect, 'focus');

  //Select option
  const options = input.querySelectorAll('.multiselect__option');
  const optionsText = [...options].map(opt => opt.textContent.trim());

  if (optionsText.indexOf(text) !== -1 && text !== 'Khác') {
    await createElementEvent(options[optionsText.indexOf(text)], 'click');
    await delay(300);

    return;
  }

  await createElementEvent(options[optionsText.indexOf('Khác')], 'click');

  const inputReason = input.querySelector(".inputReason");
  inputReason.value = text;
  await createElementEvent(inputReason, "input");
  await createElementEvent(inputReason, "focusout");
  await delay(300);
}

async function fillBackLogReasons() {
  const backLog = document.querySelector(".back-log").parentNode;
  const switchInputs = backLog.querySelectorAll('.switch-input');

  for (input of switchInputs) {
    let backLogHeader = input.parentNode.parentNode.parentNode.querySelector('.text-header').textContent;

    let reason = REASON['all'];
    for (let backLogTime in REASON) {
      if (backLogHeader.includes(backLogTime)) {
        reason = REASON[backLogTime];
      }
    }

    await changeSwitchInputValue(input, reason);
  }
}

async function verifyLayouts() {
  const verifyLayout = document.querySelector(".verify-layout").parentNode;
  openMenuCollapse(verifyLayout);

  const switchInputs = verifyLayout.getElementsByClassName("switch-input");
  for (input of switchInputs) {
    await changeSwitchInputValue(input, "Đạt");
  }
}

async function task() {
  await showAllBackLogCollapses();
  await fillBackLogReasons();
  
  await verifyLayouts();

  alert('Xong!');
}

task();
