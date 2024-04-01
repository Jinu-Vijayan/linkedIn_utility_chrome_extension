
chrome.tabs.onUpdated.addListener((tabId,tab)=>{

    if(tab.status === 'complete'){
        console.log(tab.status);
        chrome.tabs.sendMessage(tabId,{
            type: "NEW"
        })

        const inActiveQuery = {active: false};
        const activeQuery = {active : true};

        const gettingInActiveTab = chrome.tabs.query(inActiveQuery);
        const gettingActiveTab = chrome.tabs.query(activeQuery);

        gettingInActiveTab.then((tabs)=>{

            const inActiveLinkedInTabs = tabs.filter((elem)=>{
                if(elem.url.includes("linkedin.com")){
                    return true;
                }
                return false;
            })

            stopSpeechRecognition(inActiveLinkedInTabs);

        })


        gettingActiveTab.then((tabs)=>{

            const tabId = tabs[0].id;

            console.log("start listening", tabId)

            chrome.tabs.sendMessage(tabId,{
                type : "START LISTENING"
            })

        })

    }

})

function stopSpeechRecognition(inActiveLinkedInTabs){
    
    inActiveLinkedInTabs.forEach((tab)=>{

        console.log("stop listening",tab.id)

        chrome.tabs.sendMessage(tab.id,{
            type : "STOP LISTENING"
        })

    })
}