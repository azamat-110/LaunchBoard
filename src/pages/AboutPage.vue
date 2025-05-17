<script setup>

</script>

<template>
  <div class="about-page">
    <h2 class="about-page__title">Обо мне</h2>
    <div class="line"></div>
    <div class="profile-section">
      <div class="profile-section__image">
        <img src="../assets/images/profile.png" alt="profile">
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
        <p>Меня зовут Алексей, и я — страстный исследователь технологий и инноваций. С самого детства меня увлекали
          компьютеры, и я решил превратить эту страсть в профессию. Мой путь в мире разработки начался с изучения
          программирования и дизайна, и с каждым годом я все больше увлекаюсь новыми подходами и инструментами.

          Когда я не работаю над проектами, мне нравится путешествовать, фотографировать и наслаждаться природой.
          Вдохновение для новых идей часто приходит во время прогулок на свежем воздухе или общения с коллегами и
          друзьями.

          Моя цель — создавать качественные и полезные продукты, которые помогают людям решать повседневные задачи и
          открывают новые возможности. Я всегда открыт для сотрудничества и новых вызовов, ведь каждый проект — это шанс
          учиться и расти.

        </p>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.about-page {

  &__title {
    margin: 0;
    font-size: 24px;
    font-family: Inter, serif;
    padding: 48px 0 20px 20px;
  }
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;

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

</style>