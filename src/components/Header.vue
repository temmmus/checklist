<template>
  <header class="header">
    <h1 class="header__title">
      TOD<span
        class="header__letter"
        @mousedown="startLongPress"
        @mouseup="stopLongPress"
        @mouseleave="stopLongPress"
        @touchstart="startLongPress"
        @touchend="stopLongPress"
        @touchcancel="stopLongPress"
        >O</span
      >
    </h1>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      longPressTimeout: undefined as number | undefined,
    };
  },
  emits: { clearList: null },
  methods: {
    startLongPress() {
      this.longPressTimeout = setTimeout(() => {
        this.clearList();
      }, 1000);
    },
    stopLongPress() {
      clearTimeout(this.longPressTimeout);
      this.longPressTimeout = undefined;
    },
    clearList() {
      this.$emit("clearList");
    },
  },
  beforeDestroy() {
    clearTimeout(this.longPressTimeout);
  },
});
</script>

<style scoped>
.header__letter {
  color: yellow;
}
</style>
