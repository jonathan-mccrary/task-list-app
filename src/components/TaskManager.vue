<template>
  <div class="card page-border">
    <div class="card-header page-header">Task Priority Manager</div>
    <div class="card-body page-body">
      <div class="row mb-2">
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
      <div class="row mb-2">
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
              <option :value="Importance.NoSelection">--Importance--</option>
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
              <option :value="Urgency.NoSelection">--Urgency--</option>
              <option :value="Urgency.High">High</option>
              <option :value="Urgency.Medium">Medium</option>
              <option :value="Urgency.Low">Low</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12">
          <div class="btn-group" style="float: right">
            <VariantButton
              :variant="'primary'"
              :onClick="addTask"
              :disabled="!enableAddTask"
              :size="'lg'"
            >
              Add Task
            </VariantButton>
            <VariantButton
              :variant="'dark'"
              :onClick="sortTasks"
              :disabled="!enableSortTasks"
              :size="'lg'"
            >
              Sort Tasks
            </VariantButton>
            <VariantButton
              :variant="'success'"
              :onClick="removeCompleted"
              :disabled="!enableRemoveCompleted"
              :size="'lg'"
            >
              Remove Completed
            </VariantButton>
          </div>
        </div>
      </div>
      <div
        class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mb-2"
        v-if="showTasks"
      >
        <TaskItem
          v-for="task in state.tasks"
          :key="task.id"
          :task="task"
          @remove-task="removeTask"
          @update-task="updateTask"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
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
    const state = reactive({
      tasks: ref<Task[]>([]),
    });
    //const tasks = ref<Task[]>([]);
    const newTaskTitle = ref("");
    const newTaskImportance = ref<Importance>(Importance.NoSelection);
    const newTaskUrgency = ref<Urgency>(Urgency.NoSelection);

    const addTask = () => {
      if (
        newTaskTitle.value.trim() &&
        newTaskImportance.value != Importance.NoSelection &&
        newTaskUrgency.value != Urgency.NoSelection
      ) {
        state.tasks.push({
          id: Date.now(),
          title: newTaskTitle.value.trim(),
          urgency: newTaskUrgency.value,
          done: false,
          importance: newTaskImportance.value,
          createdDatetime: new Date(),
          priority: newTaskUrgency.value + newTaskImportance.value,
        });
        newTaskTitle.value = "";
        newTaskImportance.value = Importance.NoSelection;
        newTaskUrgency.value = Urgency.NoSelection;
      }
    };

    const removeCompleted = () => {
      state.tasks = state.tasks.filter((task) => !task.done);
    };

    const updateTask = (updatedTask: Task) => {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = { ...updatedTask };
      }
    };

    const removeTask = (taskId: number) => {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    };

    const sortTasks = () => {
      state.tasks = state.tasks.sort((a, b) => {
        return b.importance + b.urgency - (a.importance + a.urgency);
      });
    };

    const enableAddTask = computed(
      () =>
        newTaskTitle.value.trim() &&
        newTaskImportance.value != Importance.NoSelection &&
        newTaskUrgency.value != Urgency.NoSelection
    );

    const showTasks = computed(() => {
      return state.tasks.length > 0;
    });

    const enableSortTasks = computed(() => {
      return state.tasks.length > 1;
    });

    const enableRemoveCompleted = computed(() => {
      return state.tasks.length > 0 && state.tasks.some((task) => task.done);
    });

    return {
      state,
      newTaskTitle,
      newTaskImportance,
      newTaskUrgency,
      addTask,
      removeCompleted,
      updateTask,
      removeTask,
      sortTasks,
      enableAddTask,
      enableRemoveCompleted,
      showTasks,
      enableSortTasks,
      Importance,
      Urgency,
    };
  },
});
</script>

<style scoped>
.page-border {
  border-color: #123456;
  border-radius: 8px;
}
.page-header {
  background-color: #123456;
  color: #eee;
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
}

.page-body {
  background-color: #7e8bab;
  border-color: #123456;
}

.input-group-text {
  background-color: #d0e8ff;
}
</style>
