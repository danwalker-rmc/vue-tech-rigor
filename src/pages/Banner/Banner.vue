<template>
  <b-container fluid class="banner px-0">
    <b-form role="search" class="searchform mx-auto">
      <b-input-group>
        <!-- <b-form-input class="searchinput mx-auto" id="TRSearchBox" @input="suggestme" v-model="searchinput"></b-form-input> -->
        <b-form-input class="searchinput mx-auto" id="TRSearchBox" v-model="searchinput"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-light">
            <font-awesome-icon fas icon="search" class="icon searchicon" @click="searchme"></font-awesome-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
      <b-collapse id="results" v-model="showresults">
        <b-list-group ref="searchresults">
          <b-list-group-item v-for="item in results" :key="item">
            <a :href="item.link">{{ item.text }}</a>
          </b-list-group-item>
        </b-list-group>
      </b-collapse>
    </b-form>
  </b-container>
</template>

<script>
import SearchService from './services/SearchService.js'

export default {
  name: 'Banner',
  data: function() {
    return {
      searchinput: '',
      showsuggestions: false,
      showresults: false,
      results: [
        {
          text: 'Google',
          link: 'google.com'
        },
        {
          text: 'Star Wars',
          link: 'starwars.com'
        }
      ]
    }
  },
  methods: {
    suggestme: function() {
      if (this.searchinput.length >= 4) {
        console.log('SUGGESTIONS FOR ' + this.searchinput)
        // go get suggestions using search suggestion api
        SearchService.getSearchResults(this.searchinput)
          .then(response => {
            // are there suggestions?
            console.log('SUGGESTIONS RETURNED ' + response.length)
          })
          .catch(error => {
            // TODO: Let the user know!!
            console.log('There was an error updating milestones: ', error.response)
          })
        // show suggestions
        this.showsuggestions = true
      }
    },
    searchme: function() {
      console.log('SEARCHING FOR ' + this.searchinput)
      SearchService.getSearchResults(this.searchinput)
        .then(response => {
          // are there suggestions?
          console.log('SUGGESTIONS RETURNED ' + response.length)
        })
        .catch(error => {
          // TODO: Let the user know!!
          console.log('There was an error updating milestones: ', error.response)
        })
      // show suggestions
      this.showresults = true
    }
  }
}
</script>

<style lang="scss" scoped>
#HiddenSearch {
  display: flex;
  align-items: center;
  justify-content: center;
}
.banner {
  height: 100px;
  background-color: #000000;
  /* background-image: url('/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/static/images/nebulae5.png');
  background-repeat: repeat-x; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.searchform {
  width: 600px;
  height: 30px;
}
.searchinput {
  font-size: 26px;
}
.list-group-item {
  z-index: 50;
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  margin-bottom: -1px;
  background-color: #fff;
  border: none;
}
</style>
