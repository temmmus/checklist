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
          @add-item-after="addItemAfter"
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
      if (!text.length) {
        this.focusPreviousItem(id);
        this.removeItem(id);
      } else {
        this.$emit("updateItem", id, text);
      }
    },
    removeItem(id: string) {
      this.$emit("removeItem", id);
    },
    addItemAfter(currentItemId: string) {
      const index = this.items.findIndex((item) => item.id === currentItemId);
      const newItem: IItem = {
        id: Date.now().toString(),
        text: "",
        completed: false,
      };

      this.items.splice(index + 1, 0, newItem); // add new item to array

      // set focus to new item
      this.$nextTick(() => {
        const newItemRef = this.$refs[`item-${newItem.id}`] as IItemInstance;
        if (newItemRef) {
          const textArea = newItemRef.$refs.textArea as HTMLTextAreaElement;
          textArea.focus();
        }
      });

      const currentItemRef = this.$refs[`item-${currentItemId}`] as IItemInstance;
      if (currentItemRef) currentItemRef.removeFocus();
    },
    focusPreviousItem(currentItemId: string) {
      const index = this.items.findIndex((item) => item.id === currentItemId);

      if (index > 0) {
        const previousItemId = this.items[index - 1].id;
        const previousItemRef = this.$refs[`item-${previousItemId}`] as IItemInstance;
        const textArea = previousItemRef.$refs.textArea as HTMLTextAreaElement;

        this.$nextTick(() => {
          setTimeout(() => {
            textArea.focus();
            const length = textArea.value.length;
            textArea.setSelectionRange(length, length);
          }, 0); // Minimal timeout for mobile devices
        });
      }
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
