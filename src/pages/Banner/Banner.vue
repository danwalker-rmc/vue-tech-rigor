<template>
  <b-container fluid class="banner px-0">
    <b-form role="search" class="searchform mx-auto">
      <b-input-group>
        <b-form-input class="searchinput mx-auto" id="TRSearchBox" @input="suggestme" v-model="searchinput"></b-form-input>
        <b-input-group-append>
          <b-button variant="outline-light">
            <font-awesome-icon fas icon="search" class="icon searchicon" @click="searchme"></font-awesome-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'Banner',
  data: function() {
    return {
      searchinput: ''
    }
  },
  methods: {
    suggestme: function() {
      if (this.searchinput.length >= 3) {
        console.log('SUGGESTIONS FOR ' + this.searchinput)
        this.$jQuery('input[title="Search..."]').val(this.searchinput)
      }
    },
    searchme: function() {
      console.log('SEARCHING FOR ' + this.searchinput)
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
  height: 250px;
  background-color: #000000;
  background-image: url('/wc/surinhd/td/private/techrigor/SiteAssets/html/layout/static/images/nebulae5.png');
  background-repeat: repeat-x;
  display: flex;
  align-items: center;
}
.searchform {
  width: 600px;
  height: 30px;
}
.searchinput {
  font-size: 26px;
}
</style>
