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
export default {
  name: 'Announcements',
  data: function() {
    return {
      announcements: [
        {
          title: 'Early Model Railroading',
          teasertext:
            'Most early models for the toy market were powered by clockwork and controlled by levers on the locomotive. Although this made control crude the models were large and robust enough that handling the controls was practical. Various manufacturers introduced slowing and stopping tracks that could trigger levers on the locomotive and allow station stops.',
          image: 'https://picsum.photos/id/197/400/400'
        },
        {
          title: 'More Early Model Railroading',
          teasertext:
            'Early electrical models used a three-rail system with the wheels resting on a metal track with metal sleepers that conducted power and a middle rail which provided power to a skid under the locomotive. This made sense at the time as models were metal and conductive. Modern plastics were not available and insulation was a problem. In addition the notion of accurate models had yet to evolve and toy trains and track were crude tinplate. A variation on the three-rail system, Trix Twin, allowed two trains to be independently controlled on one track, before the advent of Digital Command Control.',
          image: 'https://picsum.photos/id/204/400/400'
        },
        {
          title: 'Two Rail Power',
          teasertext:
            'As accuracy became important some systems adopted two-rail power in which the wheels were isolated from each other and the rails carried the positive and negative supply with the right rail carrying the positive potential.Other systems such as Märklin instead used fine metal studs to replace the central rail, allowing existing three-rail models to use more realistic track.',
          image: 'https://picsum.photos/id/220/400/400'
        },
        {
          title: 'Overhead Power',
          teasertext:
            'Where the model is of an electric locomotive, it may be supplied by overhead lines, like the full-size locomotive. Before Digital Command Control became available, this was one way of controlling two trains separately on the same track. The electric-outline model would be supplied by the overhead wire and the other model could be supplied by one of the running rails. The other running rail would act as a common return.',
          image: 'https://picsum.photos/id/227/400/400'
        },
        {
          title: 'Live Steam For Outdoors',
          teasertext:
            'Engines powered by live steam are often built in large outdoor gauges of 5 inches (130 mm) and 7 1⁄2 inches (190 mm), are also available in Gauge 1, G scale, 16 mm scale and can be found in O and OO/HO. Hornby Railways produce live steam locomotives in OO, based on designs first arrived at by an amateur modeller. Other modellers have built live steam models in HO/OO, OO9 and N, and there is one in Z in Australia.',
          image: 'https://picsum.photos/id/233/400/400'
        }
      ],
      slide: 0,
      sliding: null
    }
  },
  methods: {
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
.carousel {
  width: 100%;
}
.carousel-inner {
  height: 400px;
}
.carousel-item {
  height: 400px;
}
.div-image {
  height: 400px;
  width: 400px;
  display: inline-block;
}
.div-body {
  height: 400px;
  width: calc(100% - 400px);
  display: inline-block;
}
.card {
  height: 400px;
}
.card-text {
  color: black;
  font-size: 13px;
}
.carousel-caption {
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
.icon {
  color: white;
}
.icon-active {
  color: red;
}
</style>
