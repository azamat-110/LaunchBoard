<script setup></script>

<template>
  <div class="sidebar">
    <div class="sidebar__logo">PROWEB</div>
    <nav class="nav">
      <router-link class="nav__link" to="/launches" active-class="nav__link-active">
        <img src="../assets/images/launchesLogo.svg" alt="launchesLogo">
        Запуски
      </router-link>
      <router-link class="nav__link " to="/about" active-class="nav__link-active">
        <img src="../assets/images/aboutLogo.svg" alt="">
        О себе
      </router-link>
    </nav>

  </div>
</template>


<style lang="scss" scoped>
.sidebar {
  min-width: 400px;
  border-right: 1px solid #CCCCCC;
  height: 100vh;
  padding: 20px;

  &__logo {
    font-size: 30px;
    font-weight: bold;
    font-family: Roboto, serif;
  }
}

.nav {
  display: flex;
  flex-direction: column;
  padding-top: 70px;

  &__link {
    display: flex;
    align-items: center;
    gap: 15px;
    font-family: Inter, serif;
    font-size: 18px;
    color: #000000;
    padding: 20px 0 20px 15px;
    border-radius: 10px;
    transition: ease .5s;
    
    &-active{
      background: #EEECDC;
    }
  }
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}

</style>