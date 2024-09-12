<template>
  <main class="main">
    <ul class="main__list">
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle-item="toggleItem"
        @update-item="updateItem"
        @remove-item="removeItem"
      />
    </ul>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IItem } from "../shared/interfaces";
import Item from "./Item.vue";

export default defineComponent({
  components: { Item },
  props: {
    items: {
      type: Array as PropType<IItem[]>,
    },
  },
  methods: {
    toggleItem(id: string) {
      this.$emit("toggleItem", id);
    },
    updateItem(id: string, text: string) {
      this.$emit("updateItem", id, text);
    },
    removeItem(id: string) {
      this.$emit("removeItem", id);
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
.main__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
