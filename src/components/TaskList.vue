<template>
  <div class="card h-100">
    <div class="card-header">Task List</div>
    <div class="input-group mb-3">
      <!-- <input
        type="text"
        v-model="newTask"
        @keyup.enter="addTask"
        class="form-control"
        placeholder="Add new task"
      /> -->
      <input
        type="text"
        v-model="newTaskTitle"
        class="form-control"
        placeholder="Title"
      />
      <input
        type="text"
        v-model="newTaskDescription"
        class="form-control"
        placeholder="Description"
      />
      <select v-model="newTaskPriority" class="form-select">
        <option :value="Priority.High">High</option>
        <option :value="Priority.Medium">Medium</option>
        <option :value="Priority.Low">Low</option>
      </select>
      <select v-model="newTaskCategory" class="form-select">
        <option :value="Category.Home">Home</option>
        <option :value="Category.Work">Work</option>
        <option :value="Category.Other">Other</option>
      </select>
      <VueDatePicker
        v-model="newTaskDeadline"
        class="form-control"
      ></VueDatePicker>
      <VariantButton
        :variant="'primary'"
        :onClick="addTask"
        :disabled="isAddTaskDisabled"
        >Add</VariantButton
      >
    </div>
    <div class="accordion" id="taskAccordion">
      <TaskItem
        v-for="task in sortedTasks"
        :key="task.id"
        :task="task"
        @remove-task="removeTask"
        @update-task="updateTask"
      />
    </div>
    <div class="input-group">
      <VariantButton
        :variant="'warning'"
        :onClick="removeCompleted"
        class="mt-3"
      >
        Remove Completed
      </VariantButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { Task, Priority, Category } from "../interfaces/Task";
import TaskItem from "./TaskItem.vue";
import VariantButton from "./VariantButton.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  name: "TaskList",
  components: {
    TaskItem,
    VariantButton,
    VueDatePicker,
  },
  setup() {
    const tasks = ref<Task[]>([]);
    //const newTask = ref("");
    const newTaskTitle = ref("");
    const newTaskDescription = ref("");
    const newTaskPriority = ref<Priority>(Priority.Medium);
    const newTaskCategory = ref<Category>(Category.Home);
    const newTaskDeadline = ref<Date>(new Date());

    // Computed property to check if the newTask input field is empty
    const isAddTaskDisabled = computed(() => {
      return !newTaskTitle.value.trim();
    });

    // Add task method
    const addTask = () => {
      if (newTaskTitle.value.trim()) {
        tasks.value.push({
          id: Date.now(),
          title: newTaskTitle.value.trim(), // Set default title
          category: newTaskCategory.value, // Set default category
          description: newTaskDescription.value.trim(), // Set default description
          deadline: newTaskDeadline.value, // Set default deadline
          // text: newTask.value.trim(),
          done: false,
          priority: newTaskPriority.value,
          createdDatetime: new Date(),
        });

        newTaskTitle.value = "";
        newTaskDescription.value = "";
        newTaskPriority.value = Priority.Medium;
      }
    };

    const removeTask = (id: number) => {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    };

    const removeCompleted = () => {
      tasks.value = tasks.value.filter((task) => !task.done);
    };

    const updateTask = (updatedTask: Task) => {
      const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
    };

    const sortedTasks = computed(() => {
      const priorityOrder = {
        [Priority.High]: 1,
        [Priority.Medium]: 2,
        [Priority.Low]: 3,
      };
      return tasks.value.slice().sort((a, b) => {
        if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
          return b.createdDatetime.getTime() - a.createdDatetime.getTime();
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
    });

    return {
      tasks,
      // newTask,
      newTaskTitle,
      newTaskDescription,
      newTaskPriority,
      newTaskCategory,
      newTaskDeadline,
      isAddTaskDisabled,
      addTask,
      removeTask,
      removeCompleted,
      updateTask,
      sortedTasks,
      Priority,
      Category,
    };
  },
});
</script>
