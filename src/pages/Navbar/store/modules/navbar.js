/* eslint-disable */
import jquery from 'jquery'

export const namespaced = true

export const state = {
  loaded: false,
  loading: false,
  navigation: [],
  siteactions: []
}

export const mutations = {
  SET_LOADED(state, loaded) {
    state.loaded = loaded
  },
  SET_LOADING(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  getSiteActions({ commit }) {
    console.log('Getting SiteActions')
    commit('SET_LOADING', true)
    try {
      jquery("menu[id*='SiteActions'] ie\\:menuitem").each(function () {
        var text = String(jquery(this).attr('text'))
        var omc = jquery(this).attr('onmenuclick')
        switch (true) {
          case text.indexOf('Ribbon') > 0:
            jquery("#ulsettings_Ribbon").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('with') > 0:
            jquery("#ulsettings_Shared").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('Add a page') >= 0:
            jquery("#ulsettings_AddPage").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('Edit page') >= 0:
            jquery("#ulsettings_EditPage").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('Add an app') >= 0:
            jquery("#ulsettings_AddApp").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('Manager') > 0:
            jquery("#ulsettings_Manager").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('contents') > 0:
            jquery("#ulsettings_Contents").removeClass('hidden').find("a").attr("onclick", omc)
            break
          case text.indexOf('settings') > 0:
            jquery("#ulsettings_Settings").removeClass('hidden').find("a").attr("onclick", omc)
            break

        }
      });
    }
    catch (e) {
      console.log('Error Getting SiteActions')
    }
    commit('SET_LOADING', false)
  }
}