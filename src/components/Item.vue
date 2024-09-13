<template>
  <li
    class="item"
    :class="{ 'item--done': item.completed }"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <input class="item__checkbox" type="checkbox" :checked="item.completed" @click="toggleItem" />
    <input
      class="item__text"
      type="text"
      :maxlength="inputLength"
      :value="item.text"
      @input="updateItem"
    />
    <button class="item__remove-button" v-if="isHovered" @click.stop="removeItem"></button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { INPUT_LENGTH } from "../shared/constants";
import { IItem } from "../shared/interfaces";

export default defineComponent({
  data() {
    return {
      isHovered: false,
      inputLength: INPUT_LENGTH,
    };
  },
  props: {
    item: {
      type: Object as PropType<IItem>,
      required: true,
    },
  },
  methods: {
    toggleItem() {
      this.$emit("toggleItem", this.item.id);
    },
    updateItem(e: Event) {
      const target = e.target as HTMLInputElement;
      this.$emit("updateItem", this.item.id, target.value);
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
  grid-template-columns: 1rem auto 1rem;
  column-gap: 1rem;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}
.item:focus-within {
  border-top: 1px solid #808080;
  border-bottom: 1px solid #808080;
}

.item--done .item__text {
  color: #808080;
  text-decoration: line-through 0.01rem solid;
}

.item__checkbox {
  transform: scale(1.4);
  accent-color: #808080;
  cursor: pointer;
}

.item__remove-button:after {
  content: "\00d7";
}
</style>
