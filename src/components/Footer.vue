<script setup>
import { formatPhone } from '@/utils/format';

defineProps({
  phone: String,
});

import SocialsLink from '@/components/SocialsLink.vue'

const socialsModules = import.meta.glob('@/assets/social*.svg', { 
    eager: true,
    import: 'default',
    query: '?url'
})

const socials = Object.entries(socialsModules).map(([path, icon]) => {
  const key = path.match(/social(\w+)\.svg$/i)?.[1].toLowerCase()
  return { key, icon, link: '#' }
}).filter(Boolean)
</script>

<template>
  <footer>
    <div class="mainContent">
      <div class="logoAndSocials">
        <div class="logoContainer">
          <img src="/logo.svg" alt="Логотип CoDo" />
          <p>Школа<br />программирования</p>
        </div>
        <div class="socials">
          <SocialsLink
            v-for="social in socials"
            :key="social.key"
            :icon="social.icon"
            :link="social.link"
          />
        </div>
      </div>
      <div class="linksAndContacts">
        <div class="links">
            <a href="#">Чему вы научитесь</a>
            <a href="#">Процесс обучения</a>
            <a href="#">Стоимость</a>
            <a href="#">Контакты</a>
            <a href="#">Регистрация</a>
        </div>
        <div class="contacts">
            <a type="tel" :href="'tel:' + phone" class="phone">{{ formatPhone(phone) }}</a>
            <a href="mailto:info@code.ru">info@code.ru</a>
        </div>
      </div>
    </div>
    <div class="runningContent">
      <p class="runningText">© 2023 — Все права защищены</p>
      <div class="runningLinks">
        <a href="#" class="runningText">Пользовательское соглашение</a>
        <a href="#" class="runningText">Политика конфиденциальности</a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

footer {
    padding-top: 60px;
}

.mainContent {
    display: flex;
    justify-content: space-between;
}

.logoAndSocials {
    display: flex;
    flex-direction: column;
    gap: 40px;
    flex: 1.5;
}

.logoContainer {
    display: flex;
    align-items: center;
    gap: 10px;

    img {
        width: 96px;
        height: 38px;
    }

    p {
        color: $text-grey-color;
        font-size: 16px;
        line-height: 19px;
    }
}

.socials {
    display: flex;
    align-items: center;
    gap: 16px;
}

.linksAndContacts {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding-right: 30px;

    .links {
        display: flex;
        flex-direction: column;
        gap: 25px;
        padding-top: 4px;

        a {
            font-size: 13px;
            line-height: 104%;
        }
    }

    .contacts {
        display: flex;
        flex-direction: column;
        gap: 3px;

        .phone {
            @include link-style($primary-color);
        }
    }
}

.runningContent {
    border-top: 1px solid rgba(216, 216, 216, 1);
    padding: 28px 0 26px 0;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;

    .runningText {
        color: $text-grey-color;
        font-size: $font-size-m;
        line-height: 23px;
    }

    .runningLinks {
        display: flex;
        gap: 64px;

        a {
            @include link-style($text-grey-color);
        }
    }
}

@media screen and (max-width: 1024px) {
    .logoContainer {
      p {
        font-size: 15px;
      }
    }

    .runningLinks {
      a {
        color: $accent-color!important;
      }
    }
}

@media screen and (max-width: 670px) {
    footer {
      padding-top: 30px;
    }

    .mainContent {
      flex-direction: column;
      gap: 43px;
      place-items: center;
    }

    .logoAndSocials {
      gap: 23px;
      align-items: center;
    }

    .logoContainer {
      gap: 8px;

      p {
        font-size: 15px;
      }
    }

    .linksAndContacts {
      padding: 0;
      flex-direction: column;
      gap: 43px;

      .links {
        padding-top: 0;
        align-items: center;
      }
    }

    .contacts {
      gap: 4px;
    }

    .runningContent {
      padding: 25px 0 27px 0;
      flex-direction: column;
      gap: 13px;
      place-items: center;

      .runningLinks {
        flex-direction: column;
        gap: 6px;
        align-items: center;
      }
    }
}
</style>
