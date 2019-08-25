/* eslint-disable */
import axios from 'axios'

export default {
  getAnnouncements() {
    // get page
    let page = document.getElementById('PLPageTitle').innerText
    page = page.trim()
    let url = "https://navsea.navy.deps.mil/wc/surinhd/td/private/techrigor/_api/web/lists/getbytitle('Announcements')/items?"
    url += "$select=Title,TeaserText,SliderImage,Page"
    url += "&$filter=(Page eq '" + page + "') or (Page eq 'All')"
    url += "&$top=5&$orderby=Modified desc"

    return axios
      .get(url, {
        headers: {
          accept: 'application/json;odata=verbose'
        }
      })
      .then(function(response) {
        let results = response.data.d.results
        return results
      })
      .catch(function(error) {
        console.log('SearchService Error Getting Results: ' + error)
      })
  }
}