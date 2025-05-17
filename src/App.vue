<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="app-layout">
    <Sidebar/>
    <main class="page-content">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </main>
  </div>

</template>

<style scoped>
.app-layout {
  display: flex;
  max-width: 100vw;
}

.page-content{
  padding: 20px 0;
  flex: 1;
  width: calc(100vw - 400px);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}

</style>
