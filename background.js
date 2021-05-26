const activeWebsite = {
  active_trackers: {
    facebook: false,
    google_analytics: false,
    twitter: false,
    scorecard: false,
    taboola: false
  },
  host: ''
}

const default_history = {
  facebook: [],
  google_analytics: [],
  twitter: [],
  scorecard: [],
  taboola: []
}

chrome.runtime.onMessage.addListener(function (msg, sndr, resp) {

  switch (msg.subject) {
    case 'collectTrackerInfo':
      //if we received collectTrackerinfo, the subject contains active tracker in the website
      {
        const { subject, host, active_trackers } = msg
        chrome.storage.local.set({current: active_trackers})
        chrome.storage.local.get('history', history => {
          if (Object.keys(history).length == 0)
            history = { history: default_history}
          Object.keys(active_trackers).forEach(k => {if (active_trackers[k])  history.history[k].push(host)})
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