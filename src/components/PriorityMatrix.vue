<template>
  <div class="matrix">
    <div class="matrix-grid">
      <div class="matrix-grid-content">
        <div
          v-for="importance in importances"
          :key="importance"
          class="matrix-row"
        >
          <div v-for="urgency in urgencies" :key="urgency" class="matrix-col">
            <div
              :class="['matrix-cell', getPriorityValue(importance, urgency)]"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="matrix-labels">
      <div class="matrix-importance-label">
        <small class="text-muted">Importance</small>
      </div>
      <div class="matrix-urgency-label">
        <small class="text-muted">Urgency</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";
import { Importance, Urgency } from "../interfaces/Task";

const props = defineProps({
  importance: {
    type: Number as PropType<Importance>,
    required: true,
  },
  urgency: {
    type: Number as PropType<Urgency>,
    required: true,
  },
});

const importances = computed(() => [
  Importance.High,
  Importance.Medium,
  Importance.Low,
]);
const urgencies = computed(() => [Urgency.Low, Urgency.Medium, Urgency.High]);

const getPriorityValue = (importance: Importance, urgency: Urgency): string => {
  if (importance === props.importance && urgency === props.urgency) {
    const numbers = ["two", "three", "four", "five", "six"];
    const priority = importance + urgency;
    return numbers[priority - 2];
  } else {
    return "";
  }
};
</script>

<style scoped>
.matrix {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.matrix-grid {
  position: relative;
}
.matrix-labels {
  font-style: italic;
  user-select: none;
}
.matrix-importance-label {
  position: absolute;
  top: 25%;
  left: -12%;
  writing-mode: vertical-rl;
}
.matrix-urgency-label {
  position: absolute;
  bottom: -18px;
  left: 31%;
}
.matrix-grid-content {
  display: flex;
  flex-direction: column;
}
.matrix-row {
  display: flex;
}
.matrix-col {
  display: flex;
  justify-content: center;
}
.matrix-cell {
  width: 50px;
  height: 50px;
  border: 2px solid #777;
  border-radius: 10px;
  box-shadow: 2px 2px #333;
}

.matrix-cell.active {
  background-color: #007bff;
}

.matrix-cell.two {
  background-image: linear-gradient(to bottom right, cyan, blue);
  box-shadow: 1px 1px 10px darkblue;
}
.matrix-cell.three {
  background-image: linear-gradient(to bottom right, yellowgreen, green);
  box-shadow: 0px 0px 10px darkgreen;
}
.matrix-cell.four {
  background-image: linear-gradient(to bottom right, yellow, rgb(255, 230, 0));
  box-shadow: 0px 0px 10px darkgoldenrod;
}
.matrix-cell.five {
  background-image: linear-gradient(to bottom right, orange, darkorange);
  box-shadow: 0px 0px 10px rgb(255, 111, 0);
}
.matrix-cell.six {
  background-image: linear-gradient(to bottom right, darkorange, red);
  box-shadow: 0px 0px 10px darkred;
}
</style>
