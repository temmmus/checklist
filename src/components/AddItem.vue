<template>
  <section class="add-item" data-testid="add-item">
    <form class="add-item__form" @submit.prevent="addItem">
      <button
        :class="{ 'add-item__button': true, 'button-disabled': !itemText }"
        :disabled="!itemText"
        aria-label="add item button"
      ></button>
      <textarea
        ref="textArea"
        class="add-item__input"
        aria-label="add item input"
        placeholder="Add item"
        :maxlength="inputLength"
        v-model="itemText"
        @keydown="handleKeyDown"
        @input="autoResizeTextArea"
      />
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { INPUT_LENGTH } from "../shared/constants";
import { IItem } from "../shared/interfaces";

export default defineComponent({
  name: "AddItem",
  props: {
    inputLength: {
      type: Number,
      default: INPUT_LENGTH,
    },
  },
  emits: ["addItem"],
  setup(_, { emit }) {
    const itemText = ref<string>("");
    const textArea = ref<HTMLTextAreaElement | null>(null);

    const addItem = () => {
      if (!itemText.value.trim()) return;

      const newItem: IItem = {
        id: Date.now().toString(),
        text: itemText.value.trim(),
        completed: false,
      };

      emit("addItem", newItem);
      itemText.value = "";

      if (textArea.value) textArea.value.style.height = "50px"; // reset height
    };

    const autoResizeTextArea = (event: Event) => {
      const target = event.target as HTMLTextAreaElement;
      target.style.height = "50px"; // reset height
      target.style.height = `${target.scrollHeight}px`; // set new height
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && event.shiftKey) return; // line break by Shift+Enter
      if (event.key === "Enter") {
        event.preventDefault();
        addItem(); // add item by Enter
      }
    };

    return {
      itemText,
      textArea,
      addItem,
      autoResizeTextArea,
      handleKeyDown,
    };
  },
});
</script>

<style scoped>
.add-item {
  height: auto;
  display: flex;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.add-item:focus-within {
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
}

.add-item__form {
  display: grid;
  grid-template-columns: 1rem 1rem 1fr;
  gap: 1rem;
}

.add-item__button {
  grid-column: 2;
}

.add-item__button:after {
  color: yellow;
  content: "\002B";
  cursor: pointer;
}

.button-disabled:after {
  color: #808080;
  cursor: default;
}

.add-item__input {
  grid-column: 3;
  width: 100%;
  height: 50px;
  padding-top: 12px;
  padding-bottom: 10px;
  box-sizing: border-box;
}
</style>
