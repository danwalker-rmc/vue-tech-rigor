<template>
  <div class="p-0">
    <div class="row p-0" v-for="(alert, index) in alerts" :key="alert">
      <b-alert show :variant="alert.type">
        <strong>{{ alert.intro }}:</strong>&nbsp;
        {{ alert.text }}
        <a class="btn" :class="getclass(alert.type, 'btn')" @click="showme('ModalCenter_' + index)">{{ alert.button }}</a>
      </b-alert>
      <b-modal :id="'ModalCenter_' + index" title="More Information" centered size="lg" :header-bg-variant="alert.type">
        <div class="d-block text-center" v-html="alert.body"></div>
        <div slot="modal-footer">
          <b-button class="mt-3 float-right" :variant="alert.type" block @click="hideme('ModalCenter_' + index)">Close</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import AlertService from './services/AlertService.js'
import { isNullOrUndefined } from 'util'

export default {
  name: 'Alerts',
  data: function() {
    return {
      loaded: false,
      alerts: [],
      page: null
    }
  },
  created: function() {
    this.getAlerts()
  },
  mounted: function() {
    this.$options.interval = setInterval(this.getAlerts, 90000)
  },
  methods: {
    getAlerts: function() {
      this.alerts = []
      var vm = this
      if (!this.loaded && isNullOrUndefined(document.getElementById('PLPageTitle')) !== true) {
        let page = document.getElementById('PLPageTitle').innerText
        page = page.trim()
        if (page !== null) {
          // clearInterval(this.$options.interval)
          AlertService.getAlerts()
            .then(response => {
              if (response.length > 0) {
                vm.loaded = true
                vm.drawAlerts(response)
              }
            })
            .catch(error => {
              console.log('There was an error getting alerts: ', error)
            })
        }
      } else {
        console.log('LOOKING FOR PAGE')
      }
    },
    getclass: function(type, f) {
      return ' ' + f + '-' + type
    },
    drawAlerts: function(j) {
      for (let i = 0; i < j.length; i++) {
        this.alerts.push({
          type: j[i]['AlertType'],
          text: j[i]['AlertText'],
          intro: j[i]['AlertIntro'],
          body: j[i]['AlertBody'],
          button: j[i]['ButtonText']
        })
      }
      this.loaded = false // reset for page reloads
    },
    showme: function(id) {
      this.$bvModal.show(id)
    },
    hideme: function(id) {
      this.$bvModal.hide(id)
    },
    beforeDestroy() {
      clearInterval(this.$options.interval)
    }
  }
}
</script>

<style lang="scss">
.modal-footer {
  font-size: 14px;
}

#Alerts .alert {
  position: relative;
  padding: 0.25rem 0.25rem;
  margin-bottom: 0.5rem;
  border: 1px solid transparent;
  width: 100%;
  font-size: 16px;
  line-height: 36px;
}

#Alerts a.btn {
  float: right;
}
</style>
