<template>
  <div id="app1" class="container-fluid vh-100 d-flex flex-column">
    <TaskManager />
  </div>
</template>

<script setup lang="ts">
import TaskManager from "./components/TaskManager.vue";
</script>

<style>
html {
  background-color: #000;
}
body {
  font-family: "Trebuchet MS", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #091b2c !important;
}

#app1 {
  height: 100%;
  margin: 0;
  background: #535c69;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 800px;
  max-width: 920px;
  overflow: auto;
}
</style>
