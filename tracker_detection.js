//This code will be embedded in every page the browser loads
//every time a page loads, the even below will be called


window.onload = () => {
    // trackers can be found in many ways, the most common is script with a link to some javascript code on the tracking website, such as facebook, twitter and more.
    // other trackers can be found in img tags such as facebook's tracker
    const scripts = document.getElementsByTagName("script") //all scripts tags
    const imgs = document.getElementsByTagName("img") //all image tags

    const tags = [...scripts, ...imgs] //combine both arrays

    const active_trackers = {
        facebook: false,
        google_analytics: false,
        twitter: false,
        scorecard: false,
        taboola: false
    }

    //iterate each of the tags, and see if it's source is one of the known tracker sources.
    //if it is, mark it as true in the active trackers object
    tags.forEach(t => {
        if (t.src.includes('twitter.com')) {
            active_trackers.twitter = true
            console.log(t)
        }
        else if (t.src.includes('google-analytics.com')) {
            active_trackers.google_analytics = true
            console.log(t)

        } else if (t.src.includes('connect.facebook.net') || t.src.includes('facebook.com/tr')) {
            active_trackers.facebook = true
            console.log(t)

        } else if (t.src.includes('taboola.com')) {
            active_trackers.taboola = true
            console.log(t)

        } else if (t.src.includes('scorecardresearch.com') || t.src.includes('scoreresearch.com')) {
            active_trackers.scorecard = true
            console.log(t)

        }

    })

    //after the loop is done, send the tracking information from the current website to the extension background listener.
    chrome.runtime.sendMessage({
        subject: 'collectTrackerInfo',
        host: window.location.host,
        active_trackers
    })
}