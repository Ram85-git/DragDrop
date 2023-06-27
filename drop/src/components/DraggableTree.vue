<!-- DraggableTree.vue -->
<template>
  <h1>Dragging and Dropping</h1>
  
  <div class="drop-zone" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
    <div class="drag-el" draggable="true" @dragstart="startDrag($event, 1)">
      Parent 1
    </div>
    <div v-for="item in getList(1)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
      {{ item.title }}
    </div>
  </div>
  <div class="drop-zone" @drop="onDrop($event, 2)" @dragenter.prevent @dragover.prevent>
    <div class="drag-el" draggable="true" @dragstart="startDrag($event, 2)">
      Parent 2
    </div>
    <div v-for="item in getList(2)" :key="item.id" class="drag-el" draggable="true" @dragstart="startDrag($event, item)">
      {{ item.title }}
    </div>
  </div>


</template>
  
<script>
import { ref } from 'vue'
export default {
  name: `DraggableTree`,

  setup() {
    const items = ref([
      { id: 0, title: 'Item A', list: 1 },
      { id: 1, title: 'Item B', list: 1 },
      { id: 2, title: 'Item C', list: 2 },
      { id: 3, title: 'Item D', list: 2 },
    ])

    const getList = (list) => {
      return items.value.filter((item) => item.list === list);
    }

    const startDrag = (event, parentID) => {
      console.log(parentID)
      // event.dataTransfer.dropEffect = 'move'
      // event.dataTransfer.effectAllowed = 'move'
      // event.dataTransfer.setData('parentID', parentID)
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';

      if (typeof parentID === 'number') {
        event.dataTransfer.setData('parentId', parentID);
        event.dataTransfer.setData('childItemId', ''); // Set empty childItemId
      } else {
        event.dataTransfer.setData('parentId', '');
        event.dataTransfer.setData('childItemId', parentID.id.toString());
      }

    }



    const onDrop = (event, list) => {
      const parentId = event.dataTransfer.getData('parentId');
      const childItemId = event.dataTransfer.getData('childItemId');

      if (parentId && childItemId) {
        const parentItem = items.value.find((item) => item.id === Number(parentId));
        const childItem = items.value.find((item) => item.id === Number(childItemId));

        if (parentItem && childItem) {
          parentItem.list = list;
          childItem.list = list;
          return;
        }
      }

      const itemID = event.dataTransfer.getData('itemID');
      const item = items.value.find((item) => item.id === Number(itemID));
      item.list = list;
    };

    return {
      getList,
      onDrop,
      startDrag,
    }


  }
}

</script>
  
<style scoped>
.drop-zone {
  width: 50%;
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
}
</style>  