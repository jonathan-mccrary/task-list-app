<template>
  <div class="col">
    <div class="card task">
      <div class="card-header task-title">{{ localTask.title }}</div>
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
import { defineComponent, PropType, computed, ref } from "vue";
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
  emits: ["remove-task", "update-task"],
  setup(props, emits) {
    const localTask = ref<Task>({ ...props.task });
    const importances = [Importance.High, Importance.Medium, Importance.Low];
    const urgencies = [Urgency.Low, Urgency.Medium, Urgency.High];

    const canRaiseImportance = computed(
      () =>
        !localTask.value.done && localTask.value.importance !== Importance.High
    );
    const canLowerImportance = computed(
      () =>
        !localTask.value.done && localTask.value.importance !== Importance.Low
    );
    const canRaiseUrgency = computed(
      () => !localTask.value.done && localTask.value.urgency !== Urgency.High
    );
    const canLowerUrgency = computed(
      () => !localTask.value.done && localTask.value.urgency !== Urgency.Low
    );
    const priority = computed(
      () => localTask.value.importance + localTask.value.urgency
    );

    const removeTask = () => {
      emits.emit("remove-task", localTask.value.id);
    };

    const increaseImportance = () => {
      if (localTask.value.importance === Importance.Low)
        localTask.value.importance = Importance.Medium;
      else if (localTask.value.importance === Importance.Medium)
        localTask.value.importance = Importance.High;
      emitUpdateTask();
    };

    const decreaseImportance = () => {
      if (localTask.value.importance === Importance.High)
        localTask.value.importance = Importance.Medium;
      else if (localTask.value.importance === Importance.Medium)
        localTask.value.importance = Importance.Low;
      emitUpdateTask();
    };

    const increaseUrgency = () => {
      if (localTask.value.urgency === Urgency.Low)
        localTask.value.urgency = Urgency.Medium;
      else if (localTask.value.urgency === Urgency.Medium)
        localTask.value.urgency = Urgency.High;
      emitUpdateTask();
    };

    const decreaseUrgency = () => {
      if (localTask.value.urgency === Urgency.High)
        localTask.value.urgency = Urgency.Medium;
      else if (localTask.value.urgency === Urgency.Medium)
        localTask.value.urgency = Urgency.Low;
      emitUpdateTask();
    };

    const toggleDone = () => {
      localTask.value.done = !localTask.value.done;

      emitUpdateTask();
    };

    const emitUpdateTask = () => {
      const updatedTask = { ...localTask.value };
      emits.emit("update-task", updatedTask);
    };

    return {
      localTask,
      importances,
      urgencies,
      canRaiseImportance,
      canLowerImportance,
      canRaiseUrgency,
      canLowerUrgency,
      priority,
      removeTask,
      increaseImportance,
      decreaseImportance,
      increaseUrgency,
      decreaseUrgency,
      toggleDone,
    };
  },
});
</script>

<style scoped>
.task {
  box-shadow: 0px 0px 10px white;
  background-color: #d0e8ff;
}
.task-title {
  background-color: #123456;
  color: #fff;
}
</style>
