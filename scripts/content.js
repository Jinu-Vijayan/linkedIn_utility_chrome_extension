(()=>{

    console.log("runnig in this tab")

    function loadHandler(){

        if(document.querySelector("#chrome_extension_saved_post")){
            console.log("button already exists")
            return;
        }

        console.log("button is being created")

        let ulHeader = document.querySelector(".global-nav__primary-items");

        const liViewPost = document.createElement("li");
        
        console.log("ul", ulHeader)
        
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
        
        const speechRecognition = new webkitSpeechRecognition();
        speechRecognition.continuous = true;
        speechRecognition.lang = "en-in";
        speechRecognition.start();

        speechRecognition.onresult = (event) => {
            let transcript = event.results[event.resultIndex][0].transcript;
        
            console.log(event, transcript);
        
            if(transcript.trim().toLowerCase().includes("open post")){
                aViewPost.click();
            }
        }

        speechRecognition.onstart = () => {
            console.log("starting the recording")
        }
            
        speechRecognition.onend = () => {
            speechRecognition.start();
        }
    }

    chrome.runtime.onMessage.addListener((message)=>{
        const {type} = message
        if(type === "NEW"){

            setTimeout(()=>{
                
                loadHandler();

            },2000)

            console.log("new message recieved")
        }
    })
    

})()