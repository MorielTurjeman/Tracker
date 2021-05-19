function getSpecificTracker(trackerName) {
  chrome.runtime.sendMessage({subject: "showSpecificTrackerInfo", tracker: trackerName}, (res) => {
    console.log(res)
  })
}

function getTrackersInWebsite() {
  chrome.runtime.sendMessage({subject: "showCurrentWebsite"}, (res) => {
    console.log(res)
  })
}

function showTrackerInfo() {
  getSpecificTracker(document.getElementById('selectedTracker').selected)
  

