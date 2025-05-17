<script setup>
import CourseCard from "@/components/CourseCard.vue";
import CategoryBtn from "@/components/CategoryBtn.vue";
import Loader from "@/components/Loader.vue";
import {onMounted, ref, computed, nextTick} from "vue";
import draggable from 'vuedraggable';
import {useLaunches} from "@/stores/store.js";

const store = useLaunches();
const selectedCategoryId = ref(null);
const localLaunches = ref([]);
const categoryOrder = ['Маркетинг', '3D Графика', 'Программирование', 'Медиа', 'Компьютерная грамотность'];
const isMobile = computed(() => window.innerWidth <= 768);

function initializeLocalLaunches() {
  if (store.launches && store.launches.length > 0) {
    localLaunches.value = JSON.parse(JSON.stringify(store.launches));
  }
}

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
  return Array.from(seen.values()).sort((a, b) =>
      categoryOrder.indexOf(a.name) - categoryOrder.indexOf(b.name)
  );
});

onMounted(async () => {
  await store.loadLaunches();
  console.log(store.launches);
  initializeLocalLaunches();
  await nextTick();

  const kanbanWrapper = document.querySelector('.kanban-wrapper');
  if (kanbanWrapper) {
    kanbanWrapper.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        kanbanWrapper.scrollLeft += e.deltaY;
      }
    });
  }
});

</script>

<template>
  <Loader v-if="!localLaunches.length"/>
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
            @click="toggleCategory(category.id)"
            :bgColor="'#E0E0E0'"
            :activeBg="selectedCategoryId === category.id ? category.color : false"
        />
      </div>
    </div>
    <div class="line"></div>
    <div class="courses kanban-wrapper">
      <draggable
          :list="localLaunches"
          item-key="id"
          class="kanban"
          ghost-class="drag-ghost"
          chosen-class="drag-chosen"
          animation="200"
          :disabled="isMobile"
          handle=".course-card"
      >
        <template #item="{ element }">
          <div
              v-if="(!selectedCategoryId ||
              element.categories.some(cat => cat.id === selectedCategoryId)) &&
              element.groups.length"
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
.launch-page__title {
  font-size: 24px;
  font-family: Inter, serif;
  margin: 20px;
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
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 20px;
    white-space: nowrap;
    scrollbar-width: none;
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
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.kanban {
  display: flex;
  gap: 20px;
  min-width: max-content;
}

.card-wrapper {
  user-select: none;
  overflow-y: auto;
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