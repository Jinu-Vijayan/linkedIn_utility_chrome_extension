
chrome.tabs.onUpdated.addListener((tabId,tab)=>{

    if(tab.status === 'complete'){
        console.log(tab.status);
        chrome.tabs.sendMessage(tabId,{
            type: "NEW"
        })
    }

    if(tab.url && tab.url.includes("linkedin.com") && !tab.url.includes("my-items")){
        console.log("initiate speech recongition")
    }

})