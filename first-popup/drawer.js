const textarea = document.getElementById("textarea");
const textareaContainer = document.getElementById("textareae-container");
const rattingContainer = document.getElementById("ratting-container");
const nextButton = document.getElementById("next-btn");
const alert = document.getElementById("alert");
const skipBtn = document.getElementById("skip");
const feedbackElement = document.getElementById("feedback");
const content = document.querySelectorAll(".content");
const vectorWrapper = document.getElementById("vector-wrapper");
let ratting = null;
let feedback = null;
let oneTimeClicked = false;
let activeIcon = null;
let isSkipedFirstTime = false;

function handleReset() {
  activeIcon = null;
  content.forEach((item) => {
    item.classList.remove("active");
  });
  oneTimeClicked = false;
  ratting = null;
  feedback = null;
  isSkipedFirstTime = false;
  nextButton.innerHTML = "Next";
  nextButton.classList.add("btn-inactive");
  alert.classList.add("hide");
  rattingContainer.classList.remove("hide");
  nextButton.classList.remove("btn-active");
  alert.classList.remove("alert");
  skipBtn.classList.remove("hide");
  textareaContainer.classList.add("hide");
  textarea.value = "";
}

function expandDrawer() {
  const animateImages = document.querySelectorAll(".icon-wrapper");
  let drawer = document.getElementById("drawer-box");
  if (drawer.classList.contains("expand")) {
    drawer.classList.remove("expand");
    animateImages.forEach((image) => {
      image.classList.remove("animate-image");
    });
    vectorWrapper.classList.remove("hide");
    const slideElement = document.querySelector(".slide-img");
    feedbackElement.removeChild(slideElement);
  } else {
    drawer.classList.add("expand");
    animateImages.forEach((image, index) => {
      image.classList.add("animate-image");
      image.style.animationDelay = `${index * 0.1}s`;
    });
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

function handleClickOnImage(value) {
  const expressionIcons = document.querySelectorAll(".content");
  expressionIcons.forEach((icon) => {
    icon.classList.remove("active");
  });
  let contentElement = null;
  contentElement = document.querySelector(`.content-${value.toLowerCase()}`);
  if (contentElement) {
    contentElement.classList.add("active");
    activeIcon = contentElement;
  }
  ratting = value;
  if (activeIcon) {
    nextButton.classList.add("btn-active");
  } else {
    nextButton.classList.remove("btn-active");
  }
}

textarea.addEventListener("input", handleValueChange);
function handleValueChange(event) {
  const value = event.target.value;
  if (value) {
    nextButton.classList.add("btn-active");
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
    console.log({ ratting, feedback });
    setTimeout(() => {
      expandDrawer();
    }, 3000);
  }
}
function handleSkip() {
  if (!isSkipedFirstTime) {
    handleNext();
    isSkipedFirstTime = true;
  }
}
