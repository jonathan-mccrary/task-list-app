<template>
  <div class="col">
    <div class="card">
      <div class="card-header">{{ localTask.title }}</div>
      <div class="card-body">
        <div class="btn-group d-flex justify-content-center">
          <div class="btn-group">
            <VariantButton
              :variant="localTask.done ? 'secondary' : 'success'"
              size="sm"
              @click="toggleDone"
            >
              {{ localTask.done ? "Not Done" : "Mark Done" }}
            </VariantButton>
            <VariantButton variant="danger" size="sm" @click="removeTask"
              >Remove</VariantButton
            >
          </div>
        </div>
        <div class="d-flex">
          <div class="btn-group-vertical me-2 mt-2 mb-4">
            <VariantButton
              variant="danger"
              :outline="true"
              size="sm"
              @click="increaseImportance"
              :disabled="!canRaiseImportance"
            >
              ↑ I
            </VariantButton>
            <VariantButton
              variant="success"
              :outline="true"
              size="sm"
              @click="decreaseImportance"
              :disabled="!canLowerImportance"
            >
              I ↓
            </VariantButton>
          </div>
          <div class="mb-3 p-2">
            <PriorityMatrix
              :importance="localTask.importance"
              :urgency="localTask.urgency"
            />
          </div>
        </div>
        <div class="btn-group d-flex justify-content-center ms-5 mb-1">
          <VariantButton
            variant="success"
            :outline="true"
            size="sm"
            @click="decreaseUrgency"
            :disabled="!canLowerUrgency"
          >
            ← U
          </VariantButton>
          <VariantButton
            variant="danger"
            :outline="true"
            size="sm"
            @click="increaseUrgency"
            :disabled="!canRaiseUrgency"
          >
            U →
          </VariantButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task, Importance, Urgency } from "../interfaces/Task";
import VariantButton from "./VariantButton.vue";
import PriorityMatrix from "./PriorityMatrix.vue";

export default defineComponent({
  name: "TaskItem",
  components: {
    VariantButton,
    PriorityMatrix,
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
      importances: [Importance.High, Importance.Medium, Importance.Low],
      urgencies: [Urgency.Low, Urgency.Medium, Urgency.High],
    };
  },
  computed: {
    canRaiseImportance(): boolean {
      return this.localTask.importance !== Importance.High;
    },
    canLowerImportance(): boolean {
      return this.localTask.importance !== Importance.Low;
    },
    canRaiseUrgency(): boolean {
      return this.localTask.urgency !== Urgency.High;
    },
    canLowerUrgency(): boolean {
      return this.localTask.urgency !== Urgency.Low;
    },
    priority(): number {
      return this.localTask.importance + this.localTask.urgency;
    },
  },
  methods: {
    removeTask() {
      this.$emit("remove-task", this.localTask.id);
    },
    increaseImportance() {
      if (this.localTask.importance === Importance.Low)
        this.localTask.importance = Importance.Medium;
      else if (this.localTask.importance === Importance.Medium)
        this.localTask.importance = Importance.High;
      this.emitUpdateTask();
    },
    decreaseImportance() {
      if (this.localTask.importance === Importance.High)
        this.localTask.importance = Importance.Medium;
      else if (this.localTask.importance === Importance.Medium)
        this.localTask.importance = Importance.Low;
      this.emitUpdateTask();
    },
    increaseUrgency() {
      if (this.localTask.urgency === Urgency.Low)
        this.localTask.urgency = Urgency.Medium;
      else if (this.localTask.urgency === Urgency.Medium)
        this.localTask.urgency = Urgency.High;
      this.emitUpdateTask();
    },
    decreaseUrgency() {
      if (this.localTask.urgency === Urgency.High)
        this.localTask.urgency = Urgency.Medium;
      else if (this.localTask.urgency === Urgency.Medium)
        this.localTask.urgency = Urgency.Low;
      this.emitUpdateTask();
    },
    toggleDone() {
      this.localTask.done = !this.localTask.done;
      this.emitUpdateTask();
    },
    emitUpdateTask() {
      this.$emit("update-task", this.localTask);
    },
  },
});
</script>

<style scoped>
.vertical {
  writing-mode: vertical-rl;
}
</style>
