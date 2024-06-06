<template>
  <div class="accordion-item">
    <h2 class="accordion-header" :id="'heading' + localTask.id">
      <button
        class="accordion-button collapsed"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapse' + localTask.id"
        aria-expanded="false"
        :aria-controls="'collapse' + localTask.id"
      >
        {{ localTask.title }}
      </button>
    </h2>
    <div
      :id="'collapse' + localTask.id"
      class="accordion-collapse collapse"
      :aria-labelledby="'heading' + localTask.id"
      data-bs-parent="#taskAccordion"
    >
      <div class="accordion-body">
        <div class="card">
          <div class="card-body">
            <TaskItemContent :task="localTask" />
            <div class="mt-3">
              <VariantButton
                :variant="'danger'"
                :size="'sm'"
                @click="removeTask"
                class="me-2"
              >
                Remove
              </VariantButton>
              <VariantButton
                :variant="'secondary'"
                :size="'sm'"
                @click="increasePriority"
                :disabled="!canRaisePriority"
                class="me-2"
              >
                ↑
              </VariantButton>
              <VariantButton
                :variant="'secondary'"
                :size="'sm'"
                @click="decreasePriority"
                :disabled="!canLowerPriority"
              >
                ↓
              </VariantButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task, Priority } from "../interfaces/Task";
import VariantButton from "./VariantButton.vue";
import TaskItemContent from "./TaskItemContent.vue";

export default defineComponent({
  name: "TaskItem",
  components: {
    VariantButton,
    TaskItemContent,
  },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  data() {
    return {
      localTask: { ...this.task },
    };
  },
  computed: {
    canRaisePriority(): boolean {
      return this.localTask.priority !== Priority.High;
    },
    canLowerPriority(): boolean {
      return this.localTask.priority !== Priority.Low;
    },
  },
  methods: {
    removeTask() {
      this.$emit("remove-task", this.localTask.id);
    },
    increasePriority() {
      if (this.localTask.priority === Priority.Low)
        this.localTask.priority = Priority.Medium;
      else if (this.localTask.priority === Priority.Medium)
        this.localTask.priority = Priority.High;
      this.emitUpdateTask();
    },
    decreasePriority() {
      if (this.localTask.priority === Priority.High)
        this.localTask.priority = Priority.Medium;
      else if (this.localTask.priority === Priority.Medium)
        this.localTask.priority = Priority.Low;
      this.emitUpdateTask();
    },
    emitUpdateTask() {
      this.$emit("update-task", this.localTask);
    },
  },
});
</script>

<style scoped>
.done {
  color: #777;
  text-decoration: line-through;
}
</style>
