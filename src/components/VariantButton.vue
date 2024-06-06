<template>
  <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "VariantButton",
  props: {
    variant: {
      type: String as PropType<"primary" | "secondary" | "danger" | "warning">,
      default: "primary",
    },
    size: {
      type: String as PropType<"sm" | "md" | "lg">,
      default: "md",
    },
    onClick: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  computed: {
    buttonClass(): string[] {
      let btnSize;
      if (this.size === "sm") {
        btnSize = "btn-sm";
      } else {
        btnSize = "btn-lg";
      }
      return ["btn", `btn-${this.variant}`, btnSize];
    },
  },
  methods: {
    handleClick() {
      this.onClick();
    },
  },
});
</script>
