chrome.commands.onCommand.addListener(function(command) {
    if (command === "_execute_browser_action") {
        // Send a message to the content script
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, {action: "open_popup"});
        // });
        chrome.tabs.sendMessage({action: "open_popup"});
    }
});