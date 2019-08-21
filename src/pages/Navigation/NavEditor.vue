<template>
  <div>
    <!-- <tree id="NavTree" :tree-data="tree"></tree> -->
    <tree id="NavTree" :nodes="tree"></tree>
  </div>
</template>

<script>
import Tree from './components/Tree'
export default {
  components: {
    Tree: Tree
  },
  data: function() {
    return {
      tree: [
        {
          id: 'ABCDEF00-1234-4321-ABCD-ABCDEF000001',
          expandable: true,
          text: 'Root 1',
          link: 'www.google.com',
          state: {
            checked: false,
            expanded: true,
            selected: true
          },
          nodes: [
            {
              id: 'ABCDEF00-1234-4321-ABCD-ABCDEF000003',
              expandable: true,
              text: 'Child 1',
              nodes: [
                {
                  id: 'ABCDEF00-1234-4321-ABCD-ABCDEF000004',
                  link: 'www.starwars.com',
                  expandable: true,
                  text: 'Grandchild 1'
                },
                {
                  id: 'ABCDEF00-1234-4321-ABCD-ABCDEF000005',
                  expandable: true,
                  text: 'Grandchild 2'
                }
              ]
            },
            {
              id: 6,
              expandable: true,
              text: 'Child 2'
            }
          ]
        },
        {
          id: 'ABCDEF00-1234-4321-ABCD-ABCDEF000002',
          expandable: true,
          text: 'Root 2'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
