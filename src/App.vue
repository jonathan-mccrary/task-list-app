<template>
  <div id="app1" class="container-fluid vh-100 d-flex flex-column">
    <TaskManager />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskManager from "./components/TaskManager.vue";

export default defineComponent({
  name: "App",
  components: {
    TaskManager,
  },
});
</script>

<style>
html {
  background-color: #000;
}
body {
  font-family: Helvetica, sans-serif;
  /* margin: 0;
  padding: 20px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333 !important;
}

#app1 {
  height: 100%;
  margin: 0;
  background: #777;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 800px;
  max-width: 920px;
  overflow: auto;
}
</style>
