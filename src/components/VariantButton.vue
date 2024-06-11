<template>
  <button :class="buttonClass" @click="onClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed, defineProps, PropType } from "vue";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
type ButtonSize = "sm" | "md" | "lg";

const props = defineProps({
  variant: {
    type: String as PropType<ButtonVariant>,
    required: true,
  },
  outline: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: "md",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function as PropType<(event: Event) => void>,
    required: true,
  },
});

const buttonClass = computed(() => {
  return `btn btn-${props.outline ? "outline-" : ""}${props.variant} btn-${
    props.size
  }`;
});
</script>
