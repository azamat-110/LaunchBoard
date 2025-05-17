<template>
  <div>
    <nav class="mobile-nav">
      <router-link to="/launches" active-class="active">Запуски</router-link>
      <router-link to="/about" active-class="active">О себе</router-link>
    </nav>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.mobile-nav {
  display: none;
}

@media (max-width: 768px) {
  .mobile-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #F9FAF5;
    border-top: 1px solid #ccc;
    z-index: 1000;

    a {
      text-decoration: none;
      color: #333;
      font-family: Inter, sans-serif;
      font-size: 16px;
    }
  }
}
</style>