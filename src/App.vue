<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="app-layout">
    <Sidebar/>
    <main class="page-content">
      <router-view/>
    </main>
  </div>

</template>

<style scoped>
.app-layout {
  display: flex;
  padding: 20px;
}

.page-content{
  max-width: 1920px;
  width: 100%;
}

</style>
