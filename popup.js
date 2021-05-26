function getSpecificTracker(trackerName) {
  let selectedTrackerList = document.getElementById('selectedInfo')
  selectedTrackerList.innerHTML = ""
      
  chrome.runtime.sendMessage({subject: "showSpecificTrackerInfo", tracker: trackerName}, (res) => {
    if (res.websites)
    {

      
      let htmlString = ""

      res.websites.forEach(host => {
        htmlString += `<li class="list-group-item">${host}</li>`
      });

      selectedTrackerList.innerHTML=htmlString
          
    }
  })
}

function getTrackersInWebsite() {
  chrome.runtime.sendMessage({subject: "showCurrentWebsite"}, (res) => {
    if (res) {
      Object.keys(res).forEach(k => {
        if (res[k]) {
          document.getElementById(k).className = "list-group-item list-group-item-success"
        }
        else {
          document.getElementById(k).className = "list-group-item list-group-item-danger"
        }
        
      })
    }
  })
}

function showTrackerInfo() {
  const selectedTracker = document.getElementById('trackerSelector')
  if (selectedTracker != null)
    getSpecificTracker(selectedTracker.value)
}

window.onload = (ev) => {
  const selectedTracker = document.getElementById('trackerSelector')
  if (selectedTracker != null)
  {
    document.getElementById('trackerSelector').onchange = showTrackerInfo;
    getTrackersInWebsite()
  }


}