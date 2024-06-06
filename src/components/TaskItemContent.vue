<template>
  <div>
    <h5 class="card-title">{{ task.title }}</h5>
    <p class="card-text">{{ task.description }}</p>
    <p>Description: {{ task.description }}</p>
    <p>Deadline: {{ task.deadline }}</p>
    <p>Priority: {{ task.priority }}</p>
    <!-- <p>Created Date: {{ task.createdDatetime }}</p> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task } from "../interfaces/Task";

export default defineComponent({
  name: "TaskItemContent",
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
});
</script>
