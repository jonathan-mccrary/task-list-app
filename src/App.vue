<template>
  <div id="app1" class="container-fluid vh-100 d-flex flex-column">
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskList from "./components/TaskList.vue";

export default defineComponent({
  name: "App",
  components: {
    TaskList,
  },
});
</script>

<style>
html {
  background-color: #000;
}
body {
  font-family: Arial, sans-serif;
  background: #000;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#app1 {
  height: 100%;
  margin: 0;
  background: #eee;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 1200px;
}

input[type="text"] {
  padding: 10px;
  font-size: 16px;
  width: 70%;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3a9d70;
} */

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

input[type="checkbox"] {
  margin-right: 10px;
}

.done {
  text-decoration: line-through;
}
</style>
