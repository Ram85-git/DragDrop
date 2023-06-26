<!-- DraggableTree.vue -->
<template>
    <div>
      <div class="tree">
        <div class="node" v-for="node in nodes" :key="node.nodeID" :draggable="true" @dragstart="onDragStart(node)">
          {{ node.nodeLabel }}
        </div>
      </div>
      <div class="drop-zone" @dragover="onDragOver" @drop="onDrop"></div>
    </div>
  </template>
  
  <script>
  import { nodes } from "@/data";
  
  export default {
    data() {
      return {
        nodes: [...nodes],
      };
    },
    methods: {
      onDragStart(node) {
        event.dataTransfer.setData("text/plain", node.nodeID);
      },
      onDragOver(event) {
        event.preventDefault();
      },
      onDrop(event) {
        event.preventDefault();
        const nodeID = parseInt(event.dataTransfer.getData("text/plain"));
        // Implement the logic to update the node's parentID based on the drop zone
        // Update the nodes array with the modified node data
        // Refresh the component to reflect the changes
      },
    },
  };
  </script>
  
  <style scoped>
  .tree {
    display: flex;
  }
  
  .node {
    padding: 10px;
    margin-right: 10px;
    background-color: #f0f0f0;
  }
  
  .drop-zone {
    width: 100px;
    height: 20px;
    background-color: #ccc;
  }
  </style>
  