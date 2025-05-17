<script setup>
</script>

<template>
  <div class="about-page">
    <h2 class="about-page__title">Обо мне</h2>
    <div class="line"></div>
    <div class="profile-section">
      <div class="profile-section__image">
        <img src="../assets/images/profile.JPG" alt="profile">
      </div>
      <div class="profile-section__info">
        <h3 class="profile-section__info-title">Турсунбаев Азамат Равшанович</h3>
        <p class="profile-section__info-details">20 лет | 25 ноабря 2004 год</p>
        <p class="profile-section__info-location">г. Ташкент, Шайхантахурский р-н.</p>
      </div>
    </div>
    <div class="info-section">
      <h4 class="info-section__title">Информация</h4>
      <div class="info-section__bio">
        <p>Меня зовут Азамат. Учусь в Ташкентском университете информационных технологий по направлению компьютерного
          инжиниринга. Именно во время учёбы появился интерес к веб-разработке и программированию в целом.
        </p>
        <p>
          Пока нет опыта коммерческой работы, но есть несколько учебных проектов на стеке Vue.js и JavaScript. Один из
          них — сайт для детской больницы, где мной была разработана собственная база данных, написан сервер и
          реализовано взаимодействие с фронтендом.
        </p>
        <p>

          Активно учусь, пробую новые технологии и стремлюсь развиваться как фронтенд-разработчик.
        </p>

      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.about-page__title {
  margin: 0;
  font-size: 24px;
  font-family: Inter, serif;
  padding: 48px 0 20px 20px;
}


.profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;

  &__image img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;;
  }

  &__info {
    display: flex;
    flex-direction: column;

    &-title {
      font-size: 30px;
      font-family: Inter, serif;
      margin: 0;
      padding-bottom: 10px;
    }

    & p {
      margin: 0;
      padding-top: 5px;
      font-size: 20px;
      font-family: Inter, serif;
    }
  }
}

.info-section {
  display: flex;
  flex-direction: column;
  padding: 20px;

  &__title {
    margin: 0;
    font-size: 26px;
    font-family: Inter, serif;
  }

  &__bio {

    & p {
      margin: 0;
      padding-top: 20px;
      font-size: 20px;
      font-family: Inter, serif;
    }
  }
}


.line {
  width: 100%;
  height: 1px;
  background: #CCCCCC;
}

@media (max-width: 768px) {
  .profile-section {
    flex-direction: column;
    align-items: center;
    padding: 10px;

    &__image img {
      width: 150px;
      height: 150px;
    }

    &__info {
      align-items: center;
      text-align: center;
      margin-top: 15px;

      &-title {
        font-size: 24px;
      }

      & p {
        font-size: 16px;
        padding-top: 3px;
      }
    }
  }

  .about-page__title {
    padding: 24px 10px 10px 10px;
    font-size: 20px;
  }

  .info-section {
    padding: 10px;

    &__title {
      font-size: 22px;
    }

    &__bio p {
      font-size: 16px;
      padding-top: 15px;
    }
  }
}


</style>