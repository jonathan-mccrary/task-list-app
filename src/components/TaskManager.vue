<template>
  <div class="card">
    <h3 class="card-header">Task Priority Manager</h3>
    <div class="row m-2">
      <div class="col-12">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">Title</span>
          <input
            id="newTaskTitle"
            type="text"
            v-model="newTaskTitle"
            class="form-control"
          />
        </div>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-6">
        <div class="input-group input-group">
          <span class="input-group-text" id="basic-addon1">
            <small>Importance</small>
          </span>
          <select
            id="newTaskImportance"
            v-model="newTaskImportance"
            class="form-select"
          >
            <option :value="Importance.High">High</option>
            <option :value="Importance.Medium">Medium</option>
            <option :value="Importance.Low">Low</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="input-group">
          <span class="input-group-text" id="basic-addon1">
            <small>Urgency</small>
          </span>
          <select
            id="newTaskUrgency"
            v-model="newTaskUrgency"
            class="form-select"
          >
            <option :value="Urgency.High">High</option>
            <option :value="Urgency.Medium">Medium</option>
            <option :value="Urgency.Low">Low</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row m-2">
      <div class="col-12">
        <div class="btn-group">
          <VariantButton
            :variant="'primary'"
            :onClick="addTask"
            :disabled="isAddTaskDisabled"
          >
            Add Task
          </VariantButton>
          <VariantButton
            :variant="'info'"
            :onClick="sortTasks"
            :disabled="!showSortTasks"
          >
            Sort Tasks
          </VariantButton>
          <VariantButton
            :variant="'success'"
            :onClick="removeCompleted"
            :disabled="!showRemoveCompleted"
          >
            Remove Completed
          </VariantButton>
        </div>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 m-2"
      v-if="showTasks"
    >
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @remove-task="removeTask"
        @update-task="updateTask"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { Task, Importance, Urgency } from "../interfaces/Task";
import TaskItem from "./TaskItem.vue";
import VariantButton from "./VariantButton.vue";

export default defineComponent({
  name: "TaskManager",
  components: {
    TaskItem,
    VariantButton,
  },
  setup() {
    const tasks = ref<Task[]>([]);
    const newTaskTitle = ref("");
    // const newTaskDescription = ref("");
    const newTaskImportance = ref<Importance>(Importance.Medium);
    const newTaskUrgency = ref<Urgency>(Urgency.Medium);

    const isAddTaskDisabled = computed(
      () => !newTaskTitle.value.trim() //|| !newTaskDescription.value.trim()
    );

    const addTask = () => {
      if (newTaskTitle.value.trim()) {
        //&& newTaskDescription.value.trim()
        tasks.value.push({
          id: Date.now(),
          title: newTaskTitle.value.trim(),
          //description: newTaskDescription.value.trim(),
          urgency: newTaskUrgency.value,
          done: false,
          importance: newTaskImportance.value,
          createdDatetime: new Date(),
          priority: newTaskUrgency.value + newTaskImportance.value,
        });
        newTaskTitle.value = "";
        //newTaskDescription.value = "";
        newTaskImportance.value = Importance.Medium;
        newTaskUrgency.value = Urgency.Medium;
      }
    };

    const removeCompleted = () => {
      tasks.value = tasks.value.filter((task) => !task.done);
    };

    const updateTask = (updatedTask: Task) => {
      const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        tasks.value[index] = { ...updatedTask };
      }
    };

    const removeTask = (taskId: number) => {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
    };

    const sortTasks = () => {
      tasks.value = tasks.value.sort((a, b) => {
        // eslint-disable-next-line prettier/prettier
        return (b.importance + b.urgency) - (a.importance + a.urgency);
      });
    };

    const showTasks = computed(() => {
      return tasks.value.length > 0;
    });

    const showSortTasks = computed(() => {
      return tasks.value.length > 1;
    });

    const showRemoveCompleted = computed(() => {
      return tasks.value.length > 0 && tasks.value.some((task) => task.done);
    });

    return {
      tasks,
      newTaskTitle,
      newTaskImportance,
      newTaskUrgency,
      addTask,
      removeCompleted,
      updateTask,
      removeTask,
      sortTasks,
      isAddTaskDisabled,
      showRemoveCompleted,
      showTasks,
      showSortTasks,
      Importance,
      Urgency,
    };
  },
});
</script>
