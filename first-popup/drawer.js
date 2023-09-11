const textarea = document.getElementById("textarea");
const textareaContainer = document.getElementById("textareae-container");
const rattingContainer = document.getElementById("ratting-container");
const nextButton = document.getElementById("next-btn");
const alert = document.getElementById("alert");
const skipBtn = document.getElementById("skip");
const feedbackElement = document.getElementById("feedback");
const feedbackMainElement = document.getElementById("feedback-main");
const content = document.querySelectorAll(".content");
const vectorWrapper = document.getElementById("vector-wrapper");
const commentIcon = document.querySelectorAll(".commentIcon");
const buttonContainer = document.querySelector('.btn-container');
const drawerMain = document.getElementById('drawer-main');

let ratting = null;
let feedback = null;
let oneTimeClicked = false;
let activeIcon = null;

function handleReset() {
  activeIcon = null;
  content.forEach((item) => {
    item.classList.remove("active");
  });
  commentIcon.forEach(icon=> {
    icon.classList.remove('icon-active')
  })
  oneTimeClicked = false;
  ratting = null;
  feedback = null;
  feedbackMainElement.classList.remove('hide');
  buttonContainer.classList.add('btn-container');
  buttonContainer.classList.remove('hide');
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
  content.forEach((icon) => {
    icon.classList.remove("active");
  });
  commentIcon.forEach(icon=> {
    icon.classList.remove('icon-active')
  })
  let iconElement = null;
  let contentElement = null;
  contentElement = document.querySelector(`.content-${value.toLowerCase()}`);
  iconElement = document.querySelector(`.icon-${value.toLowerCase()}`);
  if (contentElement && iconElement) {
    contentElement.classList.add("active");
    iconElement.classList.add('icon-active');
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
  if (!oneTimeClicked) {
    rattingContainer.classList.add("hide");
    textareaContainer.classList.remove("hide");
    textareaContainer.classList.add("textarea-container");
    nextButton.classList.remove("btn-active");
    nextButton.classList.add("btn-inactive");
    oneTimeClicked = true;
  } else {
    buttonContainer.classList.add('hide');
    buttonContainer.classList.remove('btn-container');
    alert.classList.remove("hide");
    alert.classList.add("alert");
    textareaContainer.classList.add("hide");
    feedbackMainElement.classList.add("hide");
    console.log({ ratting, feedback });
  }
}
function handleSkip() {
  if (!oneTimeClicked) {
    ratting = null;
  } else {
    feedback = null;
  }
    handleNext();
}
function handleClose() {
  drawerMain.classList.add('hide');
}