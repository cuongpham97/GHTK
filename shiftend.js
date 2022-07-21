const REASON = "Đang xử lí";
const backLogTab = document.querySelector(".back-log").parentNode;
const verifyLayoutTab = document.querySelector(".verify-layout").parentNode;

async function delay(time) {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function log(text) {
    console.log(text);
}

async function openAllCollapse() {
    backLogTab.classList.add("show");
    backLogTab.style.display = "block";

    verifyLayoutTab.classList.add("show");
    verifyLayoutTab.style.display = "block";
}

async function displayAllBackLogFields() {
    let loadMoreLink;

    do {
        loadMoreLink = backLogTab.querySelector('a[href="javascript:void(0)"]');
        if (loadMoreLink && loadMoreLink.style.visibility == 'visible') {
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

function displaySwitchInputOption(switchInput) {
    let multiselect = switchInput.querySelector(".multiselect");

    multiselect.className = "multiselect multiselect--active in-valid";
    multiselect.querySelector(".multiselect__tags").querySelector(".multiselect__input").style = "width: 100%;";
    multiselect.querySelector(".multiselect__tags").querySelector(".multiselect__placeholder").remove();
    multiselect.querySelector(".multiselect__content-wrapper").style.display = "block";
}

async function selectSwitchInputOption(switchInput, optionText) {
    displaySwitchInputOption(switchInput);

    let options = switchInput
        .querySelector(".multiselect")
        .querySelector(".multiselect__content-wrapper")
        .querySelector(".multiselect__content").children;

    for (option of options) {
        if (option.textContent.trim() === optionText) {
            return new Promise((resolve, _reject) => {
                let elem = option.querySelector(".multiselect__option");

                elem.addEventListener("click", () => resolve(true));
                elem.click();
            });
        }
    }

    return Promise.resolve(false);
}

async function fillSwitchInputValue(switchInput, text) {
    let input = switchInput.querySelector(".inputReason");

    await createElementEvent(input, "click");
    await createElementEvent(input, "focus");

    input.value = text;

    await createElementEvent(input, "change");
    await createElementEvent(input, "input");
    await createElementEvent(input, "focusout");
}

async function fillAllBackLogFields() {
    const switchInputs = backLogTab.getElementsByClassName("switch-input");

    for (switchInput of switchInputs) {
        try {
            await selectSwitchInputOption(switchInput, "Khác");
            await fillSwitchInputValue(switchInput, REASON);
            await delay(300);

        } catch (e) {
            log("Bỏ qua một trường");
        }
    }
}

async function verifyAllLayoutFields() {
    const switchInputs = verifyLayoutTab.getElementsByClassName("switch-input");
    for (switchInput of switchInputs) {
        try {
            await selectSwitchInputOption(switchInput, "Đạt");
            await createElementEvent(switchInput, 'focusout');
            await delay(300);

        } catch (e) {
            log("Bỏ qua một trường");
        }
    }
}

async function task() {
    await openAllCollapse();
    await delay(500);

    await displayAllBackLogFields();
    await delay(500);

    await fillAllBackLogFields();
    await delay(500);

    await verifyAllLayoutFields();
    await delay(500)

    alert("Xong!");
}

task();
