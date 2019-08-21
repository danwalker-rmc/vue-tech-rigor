<template>
  <div>
    <li class="node" :data-id="node.id" :style="styles.row">
      <div class="row_data" :style="styles.row.child" @click="toggleEvent('selected', node, 'node', $event)">
        <span @click.stop="options.events.expanded.state == true && node.nodes != undefined && node.nodes.length > 0 && toggleEvent('expanded', node)">
          <span v-for="(count, index) in depth" class="tree-indent" v-bind:key="index"></span>
          <font-awesome-icon fas icon="folder-minus" class="icon" v-if="expanded == true"> </font-awesome-icon>
          <font-awesome-icon fas icon="folder-plus" class="icon" v-else-if="expanded == false && node.nodes != undefined && node.nodes.length > 0"> </font-awesome-icon>
          <span v-else-if="node.nodes == undefined" class="small-tree-indent"> </span>
        </span>
        <span data-toggle="tooltip" data-placement="top" :title="node.definition" class="capitalize" v-bind:class="{ selected: selected }" :style="selected ? styles.text.active.style : styles.text.style" @click.stop="options.events.editableName.state && toggleEvent('editableName', node)">
          <a class="node-link" v-if="node.link && node.link.length > 0" :href="node.link" target="_blank">{{ node.text }}</a>
          <span v-else>{{ node.text }}</span>
        </span>
        <span v-if="options.addNode.state == true && node.expandable == true" @click.stop="options.addNode.fn(node)" class="ml-1">
          <font-awesome-icon far icon="plus-square" class="icon"></font-awesome-icon>
        </span>
        <span v-if="options.editNode.state == true" :id="getId('edit', node.id)" @click.stop="options.editNode.fn(node)" class="ml-1">
          <font-awesome-icon far icon="edit" class="icon"></font-awesome-icon>
        </span>
        <span v-if="options.deleteNode.state == true" :id="getId('delete', node.id)" @click.stop="options.deleteNode.fn(node)" class="ml-1">
          <font-awesome-icon far icon="trash-alt" class="icon"></font-awesome-icon>
        </span>
        <span v-if="options.showTags == true && node.tags">
          <span v-if="node.tags[0] != undefined && node.tags[0] != null && node.tags[0]" class="badge">
            {{ node.tags[0] }}
          </span>
        </span>
        <span class="goober">
          <b-modal v-bind:id="getId('modal', node.id)" v-bind:ref="getRef('modal', node.id)" static centered title="Edit Node" @shown="modalShown(node.id)">
            <b-input-group prepend="Text" class="mb-2">
              <b-form-input v-model="node.text"></b-form-input>
            </b-input-group>
            <b-input-group prepend="Link" class="mb-2">
              <b-form-input v-model="node.link"></b-form-input>
            </b-input-group>
            <b-input-group prepend="ToolTip" class="mb-2">
              <b-form-input v-model="node.tooltip"></b-form-input>
            </b-input-group>
            <b-form-checkbox v-model="node.expandable" name="cbxExpandable" value="true" unchecked-value="false" class="mb-2">
              Expandable (Can have child elements)
            </b-form-checkbox>
          </b-modal>
        </span>
      </div>
      <ul v-if="expanded">
        <template v-for="child in node.nodes">
          <node :custom-options="customOptions" :custom-styles="customStyles" :depth="depth + 1" :key="child.id" :node="child" :parent-node="node" v-on:emitNodeChecked="emitNodeChecked" v-on:emitNodeExpanded="emitNodeExpanded" v-on:emitNodeSelected="emitNodeSelected"> </node>
        </template>
      </ul>
    </li>
  </div>
</template>

<script>
;(function() {
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

  Math.uuid = function(len, radix) {
    var chars = CHARS,
      uuid = [],
      i
    radix = radix || chars.length

    if (len) {
      for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
    } else {
      var r
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
      uuid[14] = '4'
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16)
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
        }
      }
    }
    return uuid.join('')
  }

  Math.uuidFast = function() {
    var chars = CHARS,
      uuid = new Array(36),
      rnd = 0,
      r
    for (var i = 0; i < 36; i++) {
      if (i == 8 || i == 13 || i == 18 || i == 23) {
        uuid[i] = '-'
      } else if (i == 14) {
        uuid[i] = '4'
      } else {
        if (rnd <= 0x02) rnd = (0x2000000 + Math.random() * 0x1000000) | 0
        r = rnd & 0xf
        rnd = rnd >> 4
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r]
      }
    }
    return uuid.join('')
  }

  Math.uuidCompact = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
})()

var that = null

export default {
  name: 'node',
  props: {
    node: Object,
    depth: Number,
    customOptions: Object,
    customStyles: Object,
    parentNode: Object
  },
  data: function() {
    return {
      styles: {
        row: {
          width: '500px',
          cursor: 'pointer',
          'list-style-type': 'none',
          child: {
            height: '25px',
            'font-size': '13px'
          }
        },
        text: {
          style: {},
          active: {
            style: {
              'font-weight': 'bold',
              color: '#2ECC71'
            }
          }
        }
      },
      options: {
        events: {
          expanded: {
            state: true,
            fn: this.toggleExpanded
          },
          selected: {
            state: false,
            fn: this.toggleSelected
          },
          checked: {
            state: false,
            fn: this.toggleChecked
          },
          editableName: {
            state: false,
            fn: null,
            calledEvent: null
          }
        },
        addNode: { state: true, fn: this.addNode },
        editNode: { state: true, fn: this.editNode },
        deleteNode: { state: true, fn: null },
        showTags: false
      },
      checked: false,
      expanded: false,
      selected: false,
      addedNodeId: null,
      selectedNode: null,
      selectedModal: null,
      showingModal: false,
      modal: null,
      tries: 0
    }
  },
  watch: {
    checked: function() {
      this.node.state.checked = this.checked
    },
    expanded: function() {
      this.node.state.expanded = this.expanded
    },
    selected: function() {
      this.node.state.selected = this.selected
    },
    showModal: function() {
      /* console.log('SHOWMODAL CHANGED ' + this.addedNodeId)
      if (this.addedNodeId !== null && this.showModal === true) {
        this.showModal = false
        let ref = 'modal_' + this.addedNodeId
        console.log('REF: ' + ref)
        this.$refs[ref].show()
      } */
    }
  },
  updated: function() {
    console.log('UPDATED')
    /* var vm = this
    this.$nextTick(function() {
      if (vm.showModal === true) {
        console.log(vm.modal)
        window.setTimeout(function() {
          vm.$refs['modal_' + vm.addedNodeId].show()
          vm.showModal = false
        }, 3000)
      }
    }) */
  },
  mounted: function() {
    that = this
    this.copyOptions(this.customOptions, this.options)
    this.copyOptions(this.customStyles, this.styles)
    if (this.node.state) {
      this.checked = this.node.state.checked
      this.expanded = this.node.state.expanded
      this.selected = this.node.state.selected
    } else {
      this.node.state = { checked: false, expanded: false, selected: false }
    }
  },
  methods: {
    getRef: function(text, id) {
      return text + '_' + id
    },
    getId: function(text, id) {
      return text + '_' + id
    },
    addNode: function(selectedNode) {
      this.selectedNode = selectedNode
      // are there already child nodes
      if (this.selectedNode.nodes && this.selectedNode.nodes.length > 0) {
        // add a new node to the existing nodes array
        let id = Math.uuid()
        this.selectedNode.nodes.push({
          id: id,
          expandable: true,
          text: 'New Nav Link',
          link: 'enter link here',
          state: {
            expanded: false,
            selected: true
          },
          nodes: []
        })
        let r = 'modal_' + id
        console.log('ADDED MODAL: ' + r)
        that.selectedModal = r
        // this.showModal = true
        that.$options.interval = setInterval(that.showModal, 2000)
        // this.showModal(r)
      } else {
        // create new nodes array with a new node
      }
    },
    editNode: function(selectedNode) {
      this.$refs['modal_' + selectedNode.id].show()
    },
    showModal: function() {
      // var vm = this
      console.log('SHOWMODAL: ' + that.selectedModal)
      if (!that.showingModal) {
        console.log('LOOKING FOR REF...')
        if (that.$refs[that.selectedModal] !== null && that.$refs[that.selectedModal] !== undefined) {
          console.log('FOUND REF AND IT IS GOOD')
          clearInterval(that.$options.interval)
          // this.$refs[this.selectedModal].show()
        }
      } /* else {
        that.tries += 1
        console.log(that.tries)
      } */
    },
    modalShown: function(id) {
      this.showingModal = true
      clearInterval(this.$options.interval)
    },
    getFolderIcon: function(expanded) {
      let f = 'fa-folder'
      if (expanded) {
        f += '-open'
      }
      return f
    },
    toggleEvent: function(eventType, node) {
      if (eventType == 'editableName' && this.options.events['editableName'].calledEvent) {
        this.toggleEvent(this.options.events['editableName'].calledEvent, node)
      } else if (this.options.events[eventType].state == true) {
        const fnName = this.options.events[eventType].fn
        fnName(node, this)
      }
    },
    toggleExpanded: function(node, instance) {
      this.expanded = !this.expanded
      this.node.state.expanded = this.expanded
      this.$nextTick(function() {
        this.$emit('emitNodeExpanded', node, this.expanded)
      })
    },
    toggleSelected: function(node, instance) {
      this.selected = !this.selected
      this.node.state.selected = this.selected
      this.$emit('emitNodeSelected', node)
    },
    toggleChecked: function(node, instance) {
      this.checked = !this.checked
      this.node.state.checked = this.checked
      this.$nextTick(function() {
        this.callNodesChecked(this.checked)
        this.$emit('emitNodeChecked', node)
      })
    },
    emitNodeSelected: function(nodeSelected) {
      // redirect the event toward the Tree component
      this.$emit('emitNodeSelected', nodeSelected)
    },
    emitNodeExpanded: function(node, state) {
      // redirect the event toward the Tree component
      this.$emit('emitNodeExpanded', node, state)
    },
    emitNodeChecked: function(nodeChecked) {
      // redirect the event toward the Tree component
      this.$emit('emitNodeChecked', nodeChecked)
    },
    recCallNodes: function(state, event, nodes) {
      const _this = this
      nodes.forEach(function(node) {
        if (!node.state) node.state = { checked: false, expanded: false, selected: false }
        node.state[event] = state
        if (node.nodes) {
          _this.recCallNodes(state, event, node.nodes)
        }
      })
    },
    callNodesChecked: function(state) {
      this.checked = state
      for (let i = 0; i < this.$children.length; i++) {
        this.$children[i].callNodesChecked(state)
      }
      if (this.$children.length == 0 && this.node.nodes && this.node.nodes.length > 0) {
        this.recCallNodes(state, 'checked', this.node.nodes)
      }
    },
    callNodesDeselect: function() {
      this.selected = false
      this.node.state.selected = this.selected
      for (let i = 0; i < this.$children.length; i++) {
        this.$children[i].callNodesDeselect()
      }
      if (this.$children.length == 0 && this.node.nodes && this.node.nodes.length > 0) {
        this.recCallNodes(false, 'selected', this.node.nodes)
      }
    },
    callSpecificChild: function(arrIds, fname, args) {
      for (let i = 0; i < this.$children.length; i++) {
        let currentNodeId = this.$children[i].$props.node.id
        if (arrIds.find(x => x == currentNodeId)) {
          this.$children[i][fname](args)
          return false
        }
      }
    },
    callNodeChecked: function(args) {
      const arrIds = args.arrIds
      const value = args.value
      if (arrIds[arrIds.length - 1] == this.node.id) {
        this.checked = value
        this.callNodesChecked(this.checked)
      } else {
        this.expanded = true
        this.$nextTick(function() {
          this.callSpecificChild(arrIds, 'callNodeChecked', args)
        })
      }
    },
    callNodeSelected: function(args) {
      const arrIds = args.arrIds
      const value = args.value
      if (arrIds[arrIds.length - 1] == this.node.id) {
        this.selected = value
      } else {
        this.expanded = true
        this.$nextTick(function() {
          this.callSpecificChild(arrIds, 'callNodeSelected', args)
        })
      }
    },
    callNodeExpanded: function(args) {
      const arrIds = args.arrIds
      const value = args.value
      if (value == false && this.expanded == false) return
      if (arrIds[arrIds.length - 1] != this.node.id) {
        this.expanded = true
        this.$nextTick(function() {
          this.callSpecificChild(arrIds, 'callNodeExpanded', args)
        })
      } else {
        this.expanded = value
      }
    },
    copyOptions: function(src, dst) {
      for (var key in src) {
        if (!dst[key]) {
          dst[key] = src[key]
        } else if (typeof src[key] == 'object') {
          this.copyOptions(src[key], dst[key])
        } else {
          dst[key] = src[key]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-indent {
  margin: 0 10px;
  display: inline-block;
}
.small-tree-indent {
  margin: 0 3px;
  display: inline-block;
}
.icon-hover {
  visibility: hidden;
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
.row_data:hover .icon-hover {
  visibility: visible;
  opacity: 1;
}
.capitalize {
  text-transform: capitalize;
}
.badge {
  font-size: 12px;
  font-weight: normal;
}
li {
  list-style: none;
}
.icon_margin {
  margin: 0 5px 0 0;
}
.icon_parent {
  background: transparent;
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin: 0 2px 0 0;
  i {
    font-size: 16px;
    line-height: 10px;
  }
  &:last-child {
    margin: 0;
  }
}
/* .expanded_icon {
  font-size: 16px;
  transform: translateY(-5%) rotate(0deg);
  transition: all ease 0.2s;
  &.expanded {
    transform: translateY(-5%) rotate(90deg);
  }
} */
</style>
