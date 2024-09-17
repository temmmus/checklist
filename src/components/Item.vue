<template>
  <li
    class="item"
    :class="{ 'item--done': item.completed }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <i class="fa fa-grip-vertical drag-handle" aria-hidden="true" v-if="isHovered || isFocused"></i>
    <input class="item__checkbox" type="checkbox" :checked="item.completed" @click="toggleItem" />
    <input
      class="item__input"
      type="text"
      :maxlength="inputLength"
      :value="item.text"
      @input="updateItem"
      ref="textInput"
      @touchstart="
        isFocused = true;
        focusInput();
      "
      @touchend="isFocused = false"
    />
    <button
      class="item__remove-button"
      v-if="isHovered || isFocused"
      @click.stop="removeItem"
    ></button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { INPUT_LENGTH } from "../shared/constants";
import { IItem } from "../shared/interfaces";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<IItem>,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
      isFocused: false,
      inputLength: INPUT_LENGTH,
    };
  },
  setup() {
    const textInput = ref<HTMLInputElement | null>(null);

    const focusInput = () => {
      if (textInput.value) textInput.value.focus();
    };

    return {
      textInput,
      focusInput,
    };
  },
  methods: {
    toggleItem() {
      this.$emit("toggleItem", this.item.id);
    },
    updateItem(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("updateItem", this.item.id, target.value.trim());
    },
    removeItem() {
      this.$emit("removeItem", this.item.id);
    },
  },
  emits: {
    toggleItem: (id: string) => typeof id === "string",
    updateItem: (id: string, text: string) => typeof id === "string" && typeof text === "string",
    removeItem: (id: string) => typeof id === "string",
  },
});
</script>

<style scoped>
.item {
  height: 3rem;
  display: grid;
  grid-template-columns: 1rem 1rem 1fr 1rem;
  column-gap: 1rem;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  align-items: center;
}

.item:focus,
.item:focus-within {
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
}

.item__input {
  grid-column: 3;
}
.item--done .item__input {
  color: #808080;
  text-decoration: line-through;
}

.drag-handle {
  grid-column: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}
.drag-handle:active {
  cursor: grabbing;
}

.item__checkbox {
  grid-column: 2;
  width: 1.4rem;
  height: 1.4rem;
  accent-color: #808080;
  cursor: pointer;
}

.item__remove-button {
  grid-column: 4;
}
.item__remove-button:after {
  content: "\00d7";
}
</style>
