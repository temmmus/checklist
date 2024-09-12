<template>
  <aside class="add-item">
    <form class="add-item__form" @submit.prevent="addItem">
      <button class="add-item__button" :disabled="!itemText"></button>
      <input
        class="add-item__input"
        placeholder="Add new item"
        :maxlength="inputLength"
        v-model="itemText"
      />
    </form>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { INPUT_LENGTH } from "../shared/constants";
import { IItem } from "../shared/interfaces";

export default defineComponent({
  data() {
    return {
      itemText: "",
      inputLength: INPUT_LENGTH,
    };
  },
  methods: {
    addItem() {
      this.$emit("addItem", {
        id: Date.now().toString(),
        text: this.itemText,
        completed: false,
      });
      this.itemText = "";
    },
  },
  emits: {
    addItem: (item: IItem) => item,
  },
});
</script>

<style scoped>
.add-item {
  margin-top: 1rem;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}

.add-item:focus-within {
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
}

.add-item__form {
  height: 2rem;
  display: grid;
  grid-template-columns: 1rem auto;
  column-gap: 0.5rem;
}

.add-item__button:after {
  color: yellow;
  content: "\002B";
}
</style>
