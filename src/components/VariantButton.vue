<template>
  <button :class="buttonClass" @click="onClick" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  name: "VariantButton",
  props: {
    variant: {
      type: String as PropType<
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning"
        | "info"
        | "light"
        | "dark"
      >,
      required: true,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String as PropType<"sm" | "md" | "lg">,
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
  },
  setup(props) {
    const buttonClass = computed(() => {
      return `btn btn-${props.outline ? "outline-" : ""}${props.variant} btn-${
        props.size
      }`;
    });

    return {
      buttonClass,
    };
  },
});
</script>

<style>
/* No scoped styles here */
</style>
