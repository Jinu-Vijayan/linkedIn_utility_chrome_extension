(()=>{


    function loadHandler(){

        if(document.querySelector("#chrome_extension_saved_post")){
            return;
        }


        let ulHeader = document.querySelector(".global-nav__primary-items");

        const liViewPost = document.createElement("li");

        
        liViewPost.setAttribute("id","chrome_extension_saved_post")
        liViewPost.classList.add("global-nav__primary-item")
        
        liViewPost.innerHTML = `<div>
            <a id = "chrome_extension_anchor_tag" target= "_blank" href="https://www.linkedin.com/my-items/saved-posts/" class = "app-aware-link global-nav__primary-link">
                <div class = "ivm-image-view-model global-nav__icon-ivm">
                    <div class = "ivm-view-attr__img-wrapper display-flex">
                        <img id = "image_saved" src = ${chrome.runtime.getURL("images/floppy_disk.png")} />
                    </div>
                </div>
                <span class = "t-12 break-words block t-black--light t-normal global-nav__primary-link-text">saved</span>
            </a>
        </div>`
        
        ulHeader.appendChild(liViewPost);

        document.addEventListener("keydown", handleKeyDown);
        const aViewPost = document.querySelector("#chrome_extension_anchor_tag")

        function handleKeyDown(event){
            if(event.shiftKey && event.altKey && event.code === "KeyO"){
                aViewPost.click();
            }
        }
        
    }

    function startSpeechRecognition(speechRecognition){
        speechRecognition.start();
    }

    function stopSpeechRecognition(speechRecognition){
        speechRecognition.stop();
    }

    const speechRecognition = new webkitSpeechRecognition();
    speechRecognition.continuous = true;
    speechRecognition.lang = "en-in";
    speechRecognition.start();

    speechRecognition.onresult = (event) => {
        let transcript = event.results[event.resultIndex][0].transcript;
    
        console.log(event, transcript);

        const aViewPost = document.querySelector("#chrome_extension_anchor_tag")
    
        if(transcript.trim().toLowerCase().includes("open post")){
            aViewPost.click();
        }
    }

    speechRecognition.onstart = () => {
        console.log("starting the recording")
    }
        
    speechRecognition.onend = () => {
        console.log("stoped listening")
    }


    chrome.runtime.onMessage.addListener((message)=>{

        const {type} = message;

        if(type === "NEW"){

            setTimeout(()=>{
                
                loadHandler();

            },2000)

            console.log("new message recieved")
        }

        if(type === "STOP LISTENING"){
            console.log("stop listening in this tab")
            stopSpeechRecognition(speechRecognition)
        }

        if(type === "START LISTENING"){
            console.log("start listening in this tab")
            startSpeechRecognition(speechRecognition);
        }

    })
    

})()