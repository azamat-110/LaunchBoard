<script setup>
import CourseCard from "@/components/CourseCard.vue";
import CategoryBtn from "@/components/CategoryBtn.vue";
import {useLaunches} from "@/stores/store.js";
import {onMounted, ref, computed, nextTick, watch} from "vue";
import Loader from "@/components/Loader.vue";
import draggable from 'vuedraggable';

const store = useLaunches();
const selectedCategoryId = ref(null);
const isDragging = ref(false);
const isInitialized = ref(false);
const localLaunches = ref([]);

function initializeLocalLaunches() {
  if (store.launches && store.launches.length > 0) {
    localLaunches.value = JSON.parse(JSON.stringify(store.launches));
    isInitialized.value = true;
  }
}

watch(() => store.launches, (newLaunches) => {
  if (newLaunches && newLaunches.length > 0 && !isDragging.value) {
    localLaunches.value = JSON.parse(JSON.stringify(newLaunches));
  }
});

watch(() => localLaunches.value, (newLocalLaunches) => {
  if (isInitialized.value && !isDragging.value) {
    store.launches = [...newLocalLaunches];
  }
});

function onDragStart() {
  isDragging.value = true;
}

function onDragEnd() {
  isDragging.value = false;
}

onMounted(async () => {
  await store.loadLaunches();
  await nextTick();
  initializeLocalLaunches();
  await nextTick();
});

function toggleCategory(id) {
  selectedCategoryId.value = selectedCategoryId.value === id ? null : id;
}

const uniqueCategories = computed(() => {
  const seen = new Map();
  for (const launch of localLaunches.value) {
    for (const cat of launch.categories) {
      if (!seen.has(cat.id)) seen.set(cat.id, cat);
    }
  }
  return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
});

</script>

<template>
  <Loader v-if=" localLaunches.length === 0"/>
  <div class="launch-page" v-else>
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
      <draggable
          v-model="localLaunches"
          item-key="id"
          class="kanban"
          ghost-class="drag-ghost"
          chosen-class="drag-chosen"
          animation="200"
          @start="onDragStart"
          @end="onDragEnd"
          handle=".course-card"
      >
        <template #item="{ element }">
          <div
              v-show="!selectedCategoryId || element.categories.some(cat => cat.id === selectedCategoryId)"
              class="card-wrapper"
          >
            <CourseCard :launch="element"/>
          </div>
        </template>
      </draggable>
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
    flex-wrap: wrap;
    padding-right: 20px;
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

  &:active {
    cursor: grabbing;
  }
}

.kanban {
  display: flex;
  gap: 20px;
  min-width: max-content;
  padding-bottom: 20px;
}

.card-wrapper {
  transition: all ease;
  user-select: none;
}

.drag-ghost {
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.drag-chosen {
  transform: scale(1.05);
  z-index: 10;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
</style>