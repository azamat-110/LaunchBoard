<script setup>
import CategoryBtn from "@/components/CategoryBtn.vue";
import {useLaunches} from "@/stores/store.js";
import {onMounted, toRaw} from "vue";

const props = defineProps({
  launch: Object,
})

const store = useLaunches();

onMounted(async () => {
  await store.loadLaunches();
});

function formatDate(dateStr) {
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function formatDays(input) {
  const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  if (Array.isArray(input)) {
    const raw = Array.isArray(input) ? input : toRaw(input);
    return raw.map(d => days[d - 1]).join(', ');
  }
}

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  return `${hours} : ${minutes}`;
}

function groupLessonsByDate(openLessons) {
  const result = {};

  const sortedOpenLessons = [...openLessons].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (dateA.getTime() !== dateB.getTime()) return dateB - dateA;
    return a.time.localeCompare(b.time);
  })

  for (let lesson of sortedOpenLessons) {
    if (!result[lesson.date]) {
      result[lesson.date] = [];
    }
    result[lesson.date].push(lesson.time);
  }
  return Object.entries(result).map(([date, times]) => ({
    date, times
  }));
}

function getWeekDay(dateStr) {
  const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
  const dayIndex = new Date(dateStr).getDay();
  return days[dayIndex];
}

function sortedGroups(groups) {
  return [...groups].sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
    return a.study_time.localeCompare(b.study_time);
  });
}

</script>

<template>
  <div class="course-card" v-if="launch.groups[0]">
    <div class="course-header">
      <h2 class="course-header__title">{{ launch.name }}</h2>
      <CategoryBtn
          :size="'small'"
          :label="launch.categories[0].name"
          :clickable="false"
          :bgColor="launch.categories[0].color"/>
    </div>

    <div class="schedule-section">
      <div class="start-group">
        <h3 class="start-group__title">Старт групп</h3>

        <div class="starts">
          <div class="start-group__date">
            <span class="date">{{ formatDate(launch.groups[0]?.start_date) }}</span>
            <span class="days">{{ formatDays(launch.groups[0]?.days) }} </span>
          </div>
          <div class="time-slots">
            <div class="time-slot" v-for="group in sortedGroups(launch.groups)" :key="group.id">
              {{ formatTime(group.study_time) }}
            </div>
          </div>
        </div>

      </div>
      <div class="open-lessons">
        <h3 class="open-lessons__title">Открытые уроки</h3>
        <div class="lesson" v-for="lessonGroup in groupLessonsByDate(launch.open_lessons)" :key="lessonGroup.date">
          <div class="open-lessons__date">
            <span class="date">{{ formatDate(lessonGroup.date) ? formatDate(lessonGroup.date) : '' }}</span>
            <span class="days">{{ getWeekDay(lessonGroup.date) }}</span>
          </div>
          <div class="time-slots">
            <div class="time-slot" v-for="time in lessonGroup.times" :key="time">{{ formatTime(time) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.course-card {
  min-width: 350px;
  overflow-y: auto;
}

.course-header {
  display: flex;
  align-items: center;
  gap: 10px;

  &__title {
    font-size: 16px;
    font-family: Inter, serif;
    color: #606060;
  }
}

.start-group {
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: #ffffff;
  border-radius: 20px 20px 0 0;

  &__title {
    margin: 0;
    font-size: 16px;
    font-family: Inter, serif;
  }

  &__date {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: Inter, serif;
    color: #616161;
    padding: 10px 0;
  }
}

.time-slots {
  background: #F9FAF5;
  border-radius: 20px;
  border: 1px solid #F0F0F0;
}

.time-slot {
  font-size: 16px;
  font-family: Inter, serif;
  color: #383838;
  padding: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid #F0F0F0;
  }
}

.open-lessons {
  @extend .start-group;
  background: #EEECDC;
  border-radius: 0 0 20px 20px;

  &__title {
    @extend .start-group__title;
  }

  &__date {
    @extend .start-group__date;
  }
}

@media (max-width: 767px) {
  .course-card {
    overflow-y: visible;
  }
}
</style>