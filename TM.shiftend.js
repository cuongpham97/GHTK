const backLogTab = document.querySelector(".back-log").parentNode;

async function delay(time) {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

async function openAllCollapses() {
    backLogTab.classList.add("show");
    backLogTab.style.display = "block";
}

async function displayAllBackLogFields() {
    let loadMoreLink;

    do {
        loadMoreLink = backLogTab.querySelector('a[href="javascript:void(0)"]');
        if (loadMoreLink) {
            loadMoreLink.click();
            await delay(500);
        }
    } while (loadMoreLink);
}

async function createElementEvent(element, event) {
    return new Promise((resolve, _reject) => {
        element.addEventListener(event, () => {
            resolve(true);
        });

        element.dispatchEvent(new Event(event));
    });
}

async function confirmBackLogReasons() {
   let confirmButtons = [...backLogTab.getElementsByTagName('button')].filter(button => button.textContent === 'OK. Đúng\n          ');

   for (button of confirmButtons) {
      await createElementEvent(button, 'click');
      await delay(300);
   }  
}

async function task() {
    await openAllCollapses();
    await delay(500);	

    await displayAllBackLogFields();
    await delay(500);

    await confirmBackLogReasons();
    alert("Xong");
}

task();
