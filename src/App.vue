<template>
  <Header />
  <Filters :active-filter="activeFilter" @set-filter="setFilter" />
  <List
    :items="filteredItems"
    @toggle-item="toggleItem"
    @update-item="updateItem"
    @remove-item="removeItem"
  />
  <AddItem v-if="activeFilter !== 'Done'" @add-item="addItem" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Filters from "./components/Filters.vue";
import List from "./components/List.vue";
import AddItem from "./components/AddItem.vue";
import { IItem, TFilter } from "./shared/interfaces";

export default defineComponent({
  components: { Header, Filters, List, AddItem },
  data() {
    return {
      items: [] as IItem[],
      activeFilter: "All" as TFilter,
    };
  },
  mounted() {
    const savedItems = localStorage.getItem("items");
    if (savedItems) this.items = JSON.parse(savedItems);
  },
  watch: {
    items: {
      handler(items) {
        localStorage.setItem("items", JSON.stringify(items));
      },
      deep: true, // Учитывать изменения внутри объектов и массивов
    },
  },
  computed: {
    filteredItems(): IItem[] {
      switch (this.activeFilter) {
        case "Active":
          return this.items.filter((item) => !item.completed);
        case "Done":
          return this.items.filter((item) => item.completed);
        case "All":
        default:
          return this.items;
      }
    },
  },
  methods: {
    addItem(item: IItem) {
      this.items.push(item);
    },
    toggleItem(id: string) {
      const target = this.items.find((item: IItem) => item.id === id);
      if (target) target.completed = !target.completed;
    },
    removeItem(id: string) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    updateItem(id: string, text: string) {
      const target = this.items.find((item: IItem) => item.id === id);
      if (target) target.text = text;
    },
    setFilter(filter: TFilter) {
      this.activeFilter = filter;
    },
  },
});
</script>

<style scoped></style>
