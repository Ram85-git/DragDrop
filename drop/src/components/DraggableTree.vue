<!-- DraggableTree.vue -->
<template>
  <h1>Dragging and Dropping</h1>
  
  <!-- <div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
    <div class="drag-el" draggable="true" @dragstart="startDrag($event, 1)">
      Parent 1
    </div>
    <div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
         <div class="title_area">{{ item.title }}</div> 
    </div>
  </div>
  <div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
    <div class="drag-el" draggable="true" @dragstart="startDrag($event, 2)">
      Parent 2
    </div>
    <div v-for="item in getList(2)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
      
      <div class="title_area">{{ item.title }}</div> 
    </div>
  </div> -->
  <div class="tree_structure" style="width:446px; height:611px; overflow: auto;">
    <Tree :value="treeData" :onDrop="onDrop"  edgeScroll style="width:400px; "></Tree>
  </div>

</template>
  
<script>
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Draggable} from 'he-tree-vue'
export default {
  components: {Tree: Tree.mixPlugins([Draggable])},
  data() {
    return {
      treeData: [{text: 'node 1' , 
      children: [
      {text: 'node 1-1'},
      {text: 'node 1-2'}
      ]}, 
      {text: 'node 2', 
      children: [ 
      {text: 'node 2-1'},
      {text: 'node 2-2'}]}, {text: 'node 3',
      children: [
      {text: 'node 3-1'},
      {text: 'node 3-2'}]},
       {text: 'node 4'}, 
       {text: 'node 5'}, 
       {text: 'node 6'}]
    }
  },
  methods: {
    onDrop(dragData, dropData, type) {
  if (type === 'inner') {
    if (!dropData.children) {
      dropData.children = [dragData];
    } else if (dropData.children.length < 2) {
      dropData.children.push(dragData);
    }
  } else if (type === 'before' || type === 'after') {
    const parent = dropData.parent;
    const index = parent.children.indexOf(dropData);

    if (index !== -1) {
      const targetChildren = parent.children;
      const targetIndex = targetChildren.indexOf(dropData);
      
      if (!dropData.children) {
        dropData.children = [];
      }

      if (type === 'before') {
        targetChildren.splice(targetIndex, 0, dragData);
      } else if (type === 'after') {
        targetChildren.splice(targetIndex + 1, 0, dragData);
      }

      if (targetChildren.length > 2) {
        const newRoot = targetChildren.shift();
        newRoot.parent = null;
      }
    }
  }
}
  }

}
// import { ref } from 'vue'
// export default {
//   name: `DraggableTree`,

//   setup() {
//     const items = ref([
//       { id: 0, title: 'Item A', list: 1 },
//       { id: 1, title: 'Item B', list: 1 },
//       { id: 2, title: 'Item C', list: 2 },
//       { id: 3, title: 'Item D', list: 2 },
//     ])

//     const getList = (list) => {
//       return items.value.filter((item) => item.list === list);
//     }

//     const startDrag = (event, parentID) => {
//       console.log(parentID)
      // event.dataTransfer.dropEffect = 'move'
      // event.dataTransfer.effectAllowed = 'move'
      // event.dataTransfer.setData('parentID', parentID)
//       event.dataTransfer.dropEffect = 'move';
//       event.dataTransfer.effectAllowed = 'move';

//       if (typeof parentID === 'number') {
//         event.dataTransfer.setData('parentId', parentID);
//         event.dataTransfer.setData('childItemId', ''); 
//       } else {
//         event.dataTransfer.setData('parentId', '');
//         event.dataTransfer.setData('childItemId', parentID.id.toString());
//       }

//     }



//     const onDrop = (event, list) => {
//       const parentId = event.dataTransfer.getData('parentId');
//       const childItemId = event.dataTransfer.getData('childItemId');

//       if (parentId && childItemId) {
//         const parentItem = items.value.find((item) => item.id === Number(parentId));
//         const childItem = items.value.find((item) => item.id === Number(childItemId));

//         if (parentItem && childItem) {
//           parentItem.list = list;
//           childItem.list = list;
//           return;
//         }
//       }

//       const itemID = event.dataTransfer.getData('itemID');
//       const item = items.value.find((item) => item.id === Number(itemID));
//       item.list = list;
//     };

//     return {
//       getList,
//       onDrop,
//       startDrag,
//     }


//   }
// }

</script>
  
<style scoped>
.tree_structure{
  border: 1px solid green;
  padding: 10px;
  margin: auto;
  margin-top: 10px;
}
/* .tree{
  border: 1px solid green;
} */
/* .title_area{
  border: 1px solid yellow;
}
.drop-zone {
  width: 20%;
  margin: 50px auto;

  background-color: #ecf0f1;
  padding: 10px;
  min-height: 10px;
}

.drag-el {
  background-color: blue;
  color: white;
  padding: 5px;
  margin-bottom: 10px;
}

.drag-el:nth-last-of-type(1) {
  margin-bottom: 0;
} */
</style>  