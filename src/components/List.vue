<template>
  <main class="main">
    <draggable
      :list="items"
      :handle="'.drag-handle'"
      item-key="id"
      @end="onReorderItems"
      tag="ul"
      class="main__list"
    >
      <template #item="{ element }">
        <Item
          v-if="filteredItems.includes(element)"
          :key="element.id"
          :item="element"
          :ref="'item-' + element.id"
          @toggle-item="toggleItem"
          @update-item="updateItem"
          @remove-item="removeItem"
        />
      </template>
    </draggable>
  </main>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import draggable from "vuedraggable";
import { IItem, IItemInstance } from "../shared/interfaces";
import Item from "./Item.vue";

interface IReorderEvent {
  oldIndex: number;
  newIndex: number;
  item: IItem;
}

export default defineComponent({
  components: { draggable, Item },
  props: {
    items: {
      type: Array as PropType<IItem[]>,
      required: true,
    },
    filteredItems: {
      type: Array as PropType<IItem[]>,
      required: true,
    },
  },
  methods: {
    toggleItem(id: string) {
      this.$emit("toggleItem", id);
    },
    updateItem(id: string, text: string) {
      this.$emit("updateItem", id, text);
      if (!text.length) this.removeItem(id);
    },
    removeItem(id: string) {
      this.$emit("removeItem", id);
      const index = this.items.findIndex((item) => item.id === id);

      this.$nextTick(() => {
        const itemRefs = this.items.map((item) => this.$refs["item-" + item.id]) as IItemInstance[];

        if (itemRefs.length > 0) {
          const previousIndex = index - 1;
          if (previousIndex >= 0 && itemRefs[previousIndex]) {
            itemRefs[previousIndex].$refs.textInput.focus();
          }
        }
      });
    },
    onReorderItems(event: IReorderEvent) {
      this.$emit("reorderItems", event);
    },
  },
  emits: {
    toggleItem: (id: string) => typeof id === "string",
    updateItem: (id: string, text: string) => typeof id === "string" && typeof text === "string",
    removeItem: (id: string) => typeof id === "string",
    reorderItems: (event: IReorderEvent) => {
      return (
        event &&
        typeof event.oldIndex === "number" &&
        typeof event.newIndex === "number" &&
        event.item !== undefined
      );
    },
  },
});
</script>

<style scoped></style>
