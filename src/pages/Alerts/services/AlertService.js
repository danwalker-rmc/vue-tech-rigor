/* eslint-disable */
import axios from 'axios'

export default {
  async getAlerts() {
    // get page
    let page = document.getElementById('PLPageTitle').innerText
    page = page.trim()
    let url = "https://navsea.navy.deps.mil/wc/surinhd/td/private/techrigor/_api/web/lists/getbytitle('Alerts')/items?"
    url += "$select=AlertType,AlertText,AlertIntro,AlertBody,ButtonText,Page"
    url += "&$filter=(Page eq '" + page + "') or (Page eq 'All')"
    url += "&$top=5&$orderby=Modified desc"

    try {
        const response = await axios
            .get(url, {
                headers: {
                    accept: 'application/json;odata=verbose'
                }
            });
        let results = response.data.d.results;
        return results;
    }
    catch (error) {
        console.log('AlertService Error Getting Alerts: ' + error);
    }
  }
}