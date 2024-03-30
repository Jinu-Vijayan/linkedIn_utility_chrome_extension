let ulHeader = document.querySelector(".global-nav__primary-items")

const aViewPost = document.createElement("a");
const liViewPost = document.createElement("li");
const spanViewPost = document.createElement("span");
const divOuter = document.createElement("div");
const divInner = document.createElement("div");
const image = document.createElement("img");

liViewPost.classList.add("global-nav__primary-item")

aViewPost.setAttribute("target" , "_blank");
aViewPost.setAttribute("href","https://www.linkedin.com/my-items/saved-posts/");
aViewPost.classList.add("app-aware-link", "global-nav__primary-link");

spanViewPost.classList.add("t-12", "break-words", "block", "t-black--light", "t-normal", "global-nav__primary-link-text")
spanViewPost.innerHTML = "saved";

divOuter.classList.add("ivm-image-view-model", "global-nav__icon-ivm");
divInner.classList.add("ivm-view-attr__img-wrapper", "display-flex");
image.setAttribute("src",chrome.runtime.getURL("images/floppy_disk.png"));
image.setAttribute("id","image_saved")

divInner.appendChild(image);
divOuter.appendChild(divInner);
aViewPost.appendChild(divOuter);
aViewPost.appendChild(spanViewPost);
liViewPost.appendChild(aViewPost);
ulHeader.appendChild(liViewPost);

document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event){
    if(event.shiftKey && event.altKey && event.code === "KeyO"){
        aViewPost.click();
    }
}

const speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.lang = "en-in";
speechRecognition.start();

speechRecognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript;

    console.log(event);

    if(transcript.trim().toLowerCase().includes("open post")){
        aViewPost.click();
    }
}

speechRecognition.onend = () => {
    speechRecognition.start();
}