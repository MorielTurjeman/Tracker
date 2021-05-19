const activeWebsite = { 
  active_trackers = {
    facebook: false,
    google_analytics: false,
    twitter: false,
    scorecard: false,
    taboola: false
  },
  host: ''
}

const trackingHistory = {
  facebook: [],
  google_analytics: [],
  twitter: [],
  scorecard: [],
  taboola: []
}

chrome.runtime.onMessage.addListener((msg, sndr, resp) => 
{
  
  switch (msg.subject) {
    case 'collectTrackerInfo':
      //if we received collectTrackerinfo, the subject contains active tracker in the website
      const {subject, host, active_trackers } = msg
      activeWebsite.host = host
      activeWebsite.active_trackers = active_trackers
      Object.keys(active_trackers).forEach(k => trackingHistory[k].push(host))
      break;
    case 'showSpecificTrackerInfo':
      const {subject, tracker} = msg
      resp({
        tracker: trackingHistory[tracker]
      })
      break;
    case 'showCurrentWebsite':
      resp(activeWebsite)
      break;
  }


})