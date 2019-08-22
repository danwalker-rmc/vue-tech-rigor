/* eslint-disable */
import axios from 'axios'

export default {
  getSearchResults(qry) {
    var results = []
    function getPagedResults(url) {
      if (url === null) {
        url = "https://navsea.navy.deps.mil/wc/surinhd/td/private/techrigor/_api/search/query?querytext='"
        url += qry + "'"
        // url += "&rowlimit=10"
        url += "&sourceid='edf8cb77-cc3e-4650-abc0-e418d230957a'"
      }

      return axios
        .get(url, {
          headers: {
            accept: 'application/json;odata=verbose'
          }
        })
        .then(function(response) {
          console.log("SearchService Response")
          // concat the data to a temporary variable
          results = results.concat(response.data.d.results)
          // recursively load projects if there is a next result
          if (response.data.d.__next) {
            url = response.data.d.__next
            return getPagedResults(url)
          } else {
            console.log(results.length)
            return results
          }
        })
        .catch(function(error) {
          console.log('SearchService Error Getting Results: ' + error)
        })
      
    }
    return getPagedResults(null)
  }
}