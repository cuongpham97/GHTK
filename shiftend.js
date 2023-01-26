const REASON = {
  'all': 'Đang chờ xuất'
  // 'tồn >1 ngày': 'Thiếu hàng trong phiên kiểm bao',
  // 'tồn >2 ngày': 'Thiếu hàng trong phiên kiểm bao',
  // 'tồn >3 ngày': 'Thiếu hàng trong phiên kiểm bao'
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
      await loadMoreLink.click();
      await delay(1000);
    }
  } while (loadMoreLink && loadMoreLink.style.visibility == 'visible');
}

async function showAllBackLogCollapses() {
  const backLog = document.querySelector(".back-log").parentNode;
  openMenuCollapse(backLog);

  const children = [...backLog.querySelectorAll('[data-toggle="collapse"]')];

  await Promise.all(children.map(
    e => e.nextElementSibling.classList.contains('show')
      ? Promise.resolve()
      : createElementEvent(e, 'click')
  ));

  await Promise.all(children.map(e => displayAllInputFields(e.nextElementSibling)));
}

async function changeSwitchInputValue(input, text) {
  // Display options
  const multiselect = input.querySelector('.multiselect');
  if (!multiselect) {
    console.log('Bỏ qua 1 trường');
    return;
  }

  multiselect.className = 'multiselect multiselect--active in-valid';
  multiselect.querySelector('.multiselect__tags').querySelector('.multiselect__input').style = 'width: 100%;';
  multiselect.querySelector('.multiselect__content-wrapper').style.display = 'block';

  // Select option
  const options = input.querySelectorAll('.multiselect__option');
  const optionsText = [...options].map(o => o.textContent.trim());

  if (optionsText.indexOf(text) !== -1 && text !== 'Khác') {
    await createElementEvent(options[optionsText.indexOf(text)], 'click');

    multiselect.querySelector('.multiselect__tags').querySelector('.multiselect__input').style = 'width: 0;';
    multiselect.querySelector('.multiselect__content-wrapper').style.display = 'none';

    await delay(300);

    return;
  }

  index = optionsText.indexOf('Khác');
  await createElementEvent(options[index], 'click');

  const inputReason = input.querySelector(".inputReason");
  await createElementEvent(inputReason, "click");
  await createElementEvent(inputReason, "focus");
  inputReason.value = text;
  await createElementEvent(inputReason, "change");
  await createElementEvent(inputReason, "input");
  await createElementEvent(inputReason, "focusout");

  await delay(300);
}

async function fillBackLogReasons() {
  const backLog = document.querySelector(".back-log").parentNode;
  const switchInputs = backLog.querySelectorAll('.switch-input');

  for (input of switchInputs) {
    let reason = REASON['all'];

    //TODO:

    await changeSwitchInputValue(input, reason);
  }
}

async function task() {
  await showAllBackLogCollapses();
  await fillBackLogReasons();
  alert('Xong!');
}

task();
