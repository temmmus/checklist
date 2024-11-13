<template>
  <li
    :id="'item-' + item.id"
    class="item"
    :class="{ 'item--done': item.completed }"
    @mouseover="isFocused = true"
    @mouseleave="isFocused = false"
  >
    <i class="fa fa-grip-vertical drag-handle" aria-hidden="true" v-if="isFocused"></i>
    <input class="item__checkbox" type="checkbox" :checked="item.completed" @click="toggleItem" />
    <textarea
      ref="textArea"
      class="item__input"
      placeholder="Item text"
      :maxlength="inputLength"
      v-model="item.text"
      @touchstart="
        isFocused = true;
        focusInput();
      "
      @touchend="isFocused = false"
      @blur="trimText"
      @input="updateItem"
      @keydown="handleKeyDown"
    />
    <button class="item__remove-button" v-if="isFocused" @click.stop="removeItem"></button>
  </li>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, PropType, ref } from "vue";
import { INPUT_LENGTH } from "../shared/constants";
import { IItem } from "../shared/interfaces";

export default defineComponent({
  name: "Item",
  props: {
    item: {
      type: Object as PropType<IItem>,
      required: true,
    },
  },
  data() {
    return {
      isFocused: false,
      inputLength: INPUT_LENGTH,
    };
  },
  setup() {
    const textArea = ref<HTMLTextAreaElement | null>(null);

    const focusInput = () => {
      if (textArea.value) textArea.value.focus();
    };

    const autoResizeTextArea = () => {
      nextTick(() => {
        if (textArea.value) {
          textArea.value.style.height = "55px"; // reset height
          textArea.value.style.height = `${textArea.value.scrollHeight}px`; // set new height
        }
      });
    };

    onMounted(() => {
      autoResizeTextArea();
    });

    return {
      textArea,
      focusInput,
      autoResizeTextArea,
    };
  },
  methods: {
    toggleItem() {
      this.$emit("toggleItem", this.item.id);
    },
    updateItem(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("updateItem", this.item.id, target.value);
      this.autoResizeTextArea();
    },
    trimText() {
      this.item.text = this.item.text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "")
        .join("\n");
      this.$emit("updateItem", this.item.id, this.item.text);
      this.autoResizeTextArea();
    },
    removeItem() {
      this.$emit("removeItem", this.item.id);
    },
    handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        this.$emit("addItemAfter", this.item.id);
      }
    },
    removeFocus() {
      this.isFocused = false;
    },
  },
  emits: {
    toggleItem: (id: string) => typeof id === "string",
    updateItem: (id: string, text: string) => typeof id === "string" && typeof text === "string",
    removeItem: (id: string) => typeof id === "string",
    addItemAfter: (id: string) => typeof id === "string",
  },
});
</script>

<style scoped>
.item {
  height: auto;
  display: grid;
  grid-template-columns: 1rem 1rem 1fr 1rem;
  column-gap: 1rem;
  align-items: center;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.item:focus,
.item:focus-within {
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
}

.item__input {
  grid-column: 3;
  width: 100%;
  height: 50px;
  padding-top: 12px;
  padding-bottom: 10px;
  box-sizing: border-box;
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
  cursor: pointer;
}
.item__remove-button:after {
  content: "\00d7";
}
</style>
