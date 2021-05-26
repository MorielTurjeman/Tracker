//This object holds the default tracking history object
//we use this to initialize the extension on install and update
//and we return this value if the data is not present.
const default_history = {
  facebook: [],
  google_analytics: [],
  twitter: [],
  scorecard: [],
  taboola: []
}

//the code below uses chrome.storage services to store two types of date
//history => holds all the tracking history of our known trackers.
//current => holds the data of the current website

chrome.runtime.onMessage.addListener(function (msg, sndr, resp) {
  //the message handler can receive one of three message types
  //   *collectTrackerInfo -> this means the embedded code (the one in tracker_detection.js) sent us the current tracking information
  //   *showSpecificTrackerInfo -> the code in the extension popup (popup.js) requested the tracking history of some tracker
  //   *showCurrentWebsite -> the code in the extension popup (popup.js) requested the list of trackers active on the current site


  switch (msg.subject) {
    case 'collectTrackerInfo':
      {
        const { subject, host, active_trackers } = msg
        chrome.storage.local.set({current: active_trackers})
        chrome.storage.local.get('history', history => {
          if (Object.keys(history).length == 0)
            history = { history: default_history}
          
          //for each known tracker, if it is active, and not yet recorded, add it to history
          Object.keys(active_trackers).forEach(k => {if (active_trackers[k] && !history.history[k].find(item => host === item))  history.history[k].push(host)})
          chrome.storage.local.set(history)
        })
        break;
      }
    case 'showSpecificTrackerInfo':
      {
        const { subject, tracker } = msg
        chrome.storage.local.get('history', history => {
          let trackingHistory = Object.keys(history).length != 0 ? history.history : default_history
          resp({
            websites: trackingHistory[tracker],
            tracker_name: tracker
          })

        })
        break;
      }
    case 'showCurrentWebsite':
      {
        chrome.storage.local.get('current', res => resp(res.current))
        break;
      }
  }
  
  return true
})

chrome.runtime.onInstalled.addListener(details => {
  if (details.reason == "install" || details.reason == "update") {
    chrome.storage.local.set({history: default_history})
  }

})