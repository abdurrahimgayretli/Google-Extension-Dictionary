/*var contextMenuItem = {
    "id": "addWord",
    "title": "AddWord",
    "contexts":["selection"]
};
chrome.contextMenus.create(contextMenuItem);
var newWord = [];
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == "addWord" && clickData.selectionText){
        chrome.storage.sync.get('words',function(budget){
            
            newWord = [clickData.selectionText];
            chrome.storage.sync.set({'words': newWord});
        })        
    }
})*/
var alerttime =  0;
var contTime = 0.0;
var word1 = [];
var word2 = [];
var a = 0;

function getTime(){
    chrome.storage.sync.get('word1',function(budget){
        if(budget.word1 != null){
            word1 = word1.concat(budget.word1);
        }
        
    });
    chrome.storage.sync.get('alerttime',function(budget){
        if(budget.alerttime > 0){
            alerttime = parseFloat(budget.alerttime);
        }	
    });
    chrome.storage.sync.get('word2',function(budget){
        if(budget.word2 != null){
            word2 = word2.concat(budget.word2);
        }
    });
    chrome.storage.sync.get('a',function(budget){
        if(budget.a > 0){
            a = budget.a
        }		
    });
    chrome.storage.sync.get('contTime',function(budget){
        if(budget.contTime > 0){
            contTime = budget.contTime
        }		
    });
    if(alerttime != contTime){
        chrome.alarms.clear("drink water");
        function createAlarm(){
            if(word1 != null && alerttime !=0){
                chrome.alarms.create("drink water",{periodInMinutes:alerttime});
            }
        }
        createAlarm()
        contTime = alerttime;
        chrome.storage.sync.set({'contTime': contTime});
    }
}
setInterval(getTime,1*1000);

chrome.alarms.onAlarm.addListener(function(){
    chrome.storage.sync.get('a',function(budget){
        if(budget.a > 0){
            a = budget.a
        }		
    });
    chrome.notifications.create("notif",{
        type: "basic",
        iconUrl: "x2.png",
        title: "dictionary",
        message: word2[a] + ' = ' + word1[a]
    },function(){
        a = a + 1;
        if(word1.length == a){
            a = 0;
        }
        chrome.storage.sync.set({'a': a});


    })
});
