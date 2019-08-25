<template>
  <div class="p-0">
    <b-row class="ml-0 mr-0">
      <b-navbar toggleable="md" type="dark" variant="dark" class="fullnavbar">
        <b-navbar-brand href="#">What's New</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-button-toolbar key-nav aria-label="Toolbar">
                <b-button-group class="mx-1">
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-double-left" class="icon" @click="slideme('first', '')"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-left" class="icon" @click="slideme('prev', '')"></font-awesome-icon></b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 0)" @click="slideme('goto', 0)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 1)" @click="slideme('goto', 1)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 2)" @click="slideme('goto', 2)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 3)" @click="slideme('goto', 3)"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="circle" :class="getclass('icon', 4)" @click="slideme('goto', 4)"></font-awesome-icon></b-button>
                </b-button-group>
                <b-button-group class="mx-1">
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-right" class="icon" @click="slideme('next', '')"></font-awesome-icon></b-button>
                  <b-button class="annbtn"><font-awesome-icon fas icon="angle-double-right" class="icon" @click="slideme('last', '')"></font-awesome-icon></b-button>
                </b-button-group>
              </b-button-toolbar>
              <b-dropdown no-caret right>
                <template slot="button-content" class="annbtn">
                  <font-awesome-icon fas icon="cog" class="icon"></font-awesome-icon>
                </template>
                <b-dropdown-item href="/wc/surinhd/td/private/techrigor/Lists/Announcements/AllItems.aspx">All Items</b-dropdown-item>
                <b-dropdown-item href="/wc/surinhd/td/private/techrigor/Lists/Announcements/NewForm.aspx">New Item</b-dropdown-item>
              </b-dropdown>
            </b-nav-form>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-row>
    <b-row class="ml-0 mr-0">
      <b-carousel id="carousel" v-model="slide" :interval="4000" background="#ffffff" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
        <b-carousel-slide v-for="item in announcements" :key="item">
          <b-card no-body class="overflow-hidden">
            <b-row no-gutters>
              <div class="div-image">
                <b-card-img :src="item.image" class="rounded-0"></b-card-img>
              </div>
              <div class="div-body">
                <b-card-body :title="item.title">
                  <b-card-text>
                    {{ item.teasertext }}
                  </b-card-text>
                </b-card-body>
              </div>
            </b-row>
          </b-card>
        </b-carousel-slide>
      </b-carousel>
    </b-row>
  </div>
</template>

<script>
import AnnouncementService from './services/AnnouncementService.js'
import { isNullOrUndefined } from 'util'

export default {
  name: 'Announcements',
  data: function() {
    return {
      loaded: false,
      announcements: [],
      page: null,
      slide: 0,
      sliding: null
    }
  },
  mounted: function() {
    this.$options.interval = setInterval(this.getAnnouncements, 2000)
  },
  methods: {
    getAnnouncements: function() {
      var vm = this
      if (!this.loaded && isNullOrUndefined(document.getElementById('PLPageTitle')) !== true) {
        let page = document.getElementById('PLPageTitle').innerText
        page = page.trim()
        // console.log('PAGE: ' + page)
        if (page !== null) {
          // console.log(page + ', ' + page.length)
          clearInterval(this.$options.interval)
          AnnouncementService.getAnnouncements()
            .then(response => {
              console.log('ANNOUNCEMENTS RETURNED ' + response.length)
              if (response.length > 0) {
                vm.loaded = true
                vm.drawAnnouncements(response)
              }
            })
            .catch(error => {
              console.log('There was an error getting announcements: ', error)
            })
        }
      } else {
        console.log('LOOKING FOR PAGE')
      }
    },
    getclass: function(type, data) {
      // for this type = icon for now but can be expanded later if needed
      // data for now is just the index
      let c = 'icon'
      switch (type) {
        case 'icon':
          // determine the current slide and act accordingly
          switch (true) {
            case this.slide === data:
              c += ' icon-active'
              break
          }
          break
      }
      return c
    },
    slideme: function(action, slide) {
      switch (action) {
        case 'prev':
          if (this.slide === 0) {
            this.slide = 4
          } else {
            this.slide = this.slide - 1
          }
          break

        case 'next':
          if (this.slide === 4) {
            this.slide = 0
          } else {
            this.slide = this.slide + 1
          }
          break

        case 'first':
          this.slide = 0
          break

        case 'last':
          this.slide = this.announcements.length - 1
          break

        case 'goto':
          this.slide = slide
          break
      }
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    drawAnnouncements: function(j) {
      console.log('DRAWING ANNOUNCEMENTS')
      for (let i = 0; i < j.length; i++) {
        this.announcements.push({
          title: j[i]['Title'],
          teasertext: j[i]['TeaserText'],
          image: j[i]['SliderImage']['Url']
        })
      }
      this.loaded = false // reset for page reloads
    },
    beforeDestroy() {
      clearInterval(this.$options.interval)
    }
  }
}
</script>

<style lang="scss">
.fullnavbar {
  width: 100%;
  background-color: black !important;
}
#Announcements .btn-secondary,
.annbtn {
  min-width: 25px !important;
  background-color: black !important;
  border: none;
}
#Announcements .carousel {
  width: 100%;
}
#Announcements .carousel-inner {
  height: 400px;
}
#Announcements .carousel-item {
  height: 400px;
}
#Announcements .div-image {
  height: 400px;
  width: 400px;
  display: inline-block;
}
#Announcements .div-body {
  height: 400px;
  width: calc(100% - 400px);
  display: inline-block;
}
#Announcements .card {
  height: 400px;
}
#Announcements .card-text {
  color: black;
  font-size: 13px;
}
#Announcements .carousel-caption {
  position: absolute;
  right: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  z-index: 10;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  color: #fff;
  text-align: center;
}
#Announcements .icon {
  color: white;
}
#Announcements .icon-active {
  color: red;
}
</style>
