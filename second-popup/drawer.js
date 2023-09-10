const textarea = document.getElementById("textarea");
const textareaContainer = document.getElementById("textareae-container");
const rattingContainer = document.getElementById("ratting-container");
const nextButton = document.getElementById("next-btn");
const alert = document.getElementById("alert");
const skipBtn = document.getElementById("skip");
const drawerButton = document.getElementById("drawer-btn");
const drawerItems = document.getElementById("drawer-items");
const feedbackElement = document.getElementById("feedback");
const content = document.querySelectorAll(".content");
const vectorWrapper = document.getElementById("vector-wrapper");
let feedback = null;
let oneTimeClicked = false;
let activeButton = null;
let activeButtonValue = null;
let isSkipedFirstTime = false;

for (let i = 0; i < 11; i++) {
  const button = document.createElement("button");
  button.textContent = i;
  button.classList.add("drawer-btn");
  button.addEventListener("click", function () {
    activeButtonValue = i;
    if (activeButton) {
      activeButton.classList.remove("drawer-btn-active");
    }
    button.classList.add("drawer-btn-active");
    activeButton = button;
    nextButton.classList.remove("btn-inactive");
    nextButton.classList.add("btn-active");
  });
  drawerItems.appendChild(button);
}

function handleReset() {
  oneTimeClicked = false;
  isSkipedFirstTime = false;
  activeButtonValue = null;
  feedback = null;
  nextButton.innerHTML = "Next";
  nextButton.classList.add("btn-inactive");
  alert.classList.add("hide");
  rattingContainer.classList.remove("hide");
  nextButton.classList.remove("btn-active");
  alert.classList.remove("alert");
  skipBtn.classList.remove("hide");
  textareaContainer.classList.add("hide");
  textarea.value = "";
  !activeButton ? "" : activeButton.classList.remove("drawer-btn-active");
}

function expandDrawer() {
  let drawer = document.getElementById("drawer-box");
  if (drawer.classList.contains("expand")) {
    drawer.classList.remove("expand");
    vectorWrapper.classList.remove("hide");
    const slideElement = document.querySelector(".slide-img");
    feedbackElement.removeChild(slideElement);
  } else {
    drawer.classList.add("expand");
    const imgTag = document.createElement("img");
    imgTag.src = "./assets/feedback-icon.png";
    imgTag.classList.add("slide-img");
    feedbackElement.append(imgTag);
    vectorWrapper.classList.add("hide");
  }
  setTimeout(() => {
    handleReset();
  }, 300);
}

textarea.addEventListener("input", handleValueChange);
function handleValueChange(event) {
  const value = event.target.value;
  if (value) {
    nextButton.classList.add("btn-active");
    nextButton.classList.remove("btn-inactive");
    feedback = value;
  } else {
    nextButton.classList.remove("btn-active");
    nextButton.classList.add("btn-inactive");
  }
}

function handleNext() {
  if (nextButton.innerHTML === "Close") {
    expandDrawer();
  } else if (!oneTimeClicked) {
    rattingContainer.classList.add("hide");
    textareaContainer.classList.remove("hide");
    textareaContainer.classList.add("textarea-container");
    nextButton.classList.remove("btn-active");
    nextButton.classList.add("btn-inactive");
    oneTimeClicked = true;
  } else {
    alert.classList.remove("hide");
    skipBtn.classList.add("hide");
    alert.classList.add("alert");
    textareaContainer.classList.add("hide");
    nextButton.classList.add("btn-active");
    nextButton.innerHTML = "Close";
    console.log({ ratting: activeButtonValue, feedback });
    setTimeout(() => {
      expandDrawer();
    }, 3000);
  }
}

function handleSkip() {
  if (!isSkipedFirstTime) {
    if (!oneTimeClicked) {
      activeButtonValue = null;
    } else {
      feedback = null;
    }
    handleNext();
    isSkipedFirstTime = true;
  }
}
