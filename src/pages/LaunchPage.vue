<script setup>
import CourseCard from "@/components/CourseCard.vue";
import CategoryBtn from "@/components/CategoryBtn.vue";
import {useLaunches} from "@/stores/store.js";
import {onMounted, ref, computed} from "vue";
import Loader from "@/components/Loader.vue";

const store = useLaunches();

const selectedCategoryId = ref(null);
const kanban = ref(null);

onMounted(async () => {
  await store.loadLaunches();

});

function toggleCategory(id) {
  selectedCategoryId.value = selectedCategoryId.value === id ? null : id;
}


const filteredLaunches = computed(() => {
  if (!selectedCategoryId.value) return store.launches;
  return store.launches.filter(launch =>
      launch.categories.some(cat => cat.id === selectedCategoryId.value)
  );
});

const uniqueCategories = computed(() => {
  const seen = new Map();
  for (const launch of store.launches) {
    for (const cat of launch.categories) {
      if (!seen.has(cat.id)) seen.set(cat.id, cat);
    }
  }
  return Array.from(seen.values());
});

</script>

<template>
  <Loader v-if="!store.launches.length"/>
  <div  class="launch-page" v-else>
    <h1 class="launch-page__title">Запуски</h1>
    <div class="line"></div>
    <div class="categories">
      <h2 class="categories__title">Категории</h2>
      <div class="categories__list">
        <CategoryBtn
            v-for="category in uniqueCategories"
            :key="category.id"
            :label="category.name"
            :size="'medium'"
            :clickable="true"
            @click="toggleCategory(category.id)"
            :class="{ active: selectedCategoryId === category.id }"
            :bgColor="'#E0E0E0'"
            :activeBg="selectedCategoryId === category.id ? category.color : false"
        />
      </div>
    </div>
    <div class="line"></div>
    <div class="courses kanban-wrapper">
      <div class="kanban" ref="kanban">
        <CourseCard v-for="launch in filteredLaunches" :key="launch.id" :launch="launch"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.launch-page {

  &__title {
    font-size: 24px;
    font-family: Inter, serif;
    margin: 20px;

  }
}

.categories {
  width: 100%;
  display: flex;
  align-items: center;

  &__title {
    font-size: 24px;
    font-family: Inter, serif;
    padding: 23px 15px 23px 20px;
    margin: 0;
  }

  &__list {
    display: flex;
    gap: 15px;
  }
}

.courses {
  padding: 20px;

}

.courses::-webkit-scrollbar {
  display: none;
}

.line {
  width: 100%;
  height: 1px;
  background: #CCCCCC;
}

.kanban-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
  cursor: grab;
}

.kanban-wrapper:active {
  cursor: grabbing;
}

.kanban {
  display: flex;
  gap: 20px;
  min-width: max-content;
}


</style>