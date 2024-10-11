<template>
  <nav class="filters" data-testid="filters">
    <button
      v-for="filter in filters"
      :key="filter"
      class="filters__button"
      :class="{ 'filters__button--active': activeFilter === filter }"
      @click="setFilter(filter)"
    >
      {{ filter }}
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TFilter } from "../shared/interfaces";

interface IData {
  filters: TFilter[];
}

export default defineComponent({
  props: {
    activeFilter: {
      type: String as PropType<TFilter>,
      required: true,
    },
  },
  data(): IData {
    return {
      filters: ["All", "Active", "Done"],
    };
  },
  methods: {
    setFilter(filter: TFilter) {
      this.$emit("setFilter", filter);
    },
  },
  emits: {
    setFilter: (filter: TFilter) => filter,
  },
});
</script>

<style scoped>
.filters {
  padding: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.filters__button {
  color: #808080;
  border: none;
  border-bottom: 2px solid transparent;
  transition: color 0.5s, border-bottom 0.5s;
}
.filters__button:hover {
  color: yellow;
  cursor: pointer;
}

.filters__button--active {
  color: yellow;
  border-bottom: 2px solid yellow;
}
</style>
