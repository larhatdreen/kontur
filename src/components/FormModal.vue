<script setup>
import { reactive, watch, ref } from 'vue'
import { formatPhoneNumberInput } from '@/utils/format'

import cta from '@/assets/arrowCTA.svg'

const props = defineProps({
    isOpen: Boolean
})

const emit = defineEmits(['close'])

const form = reactive({ name: '', phone: '', email: '', message: '' })
const errors = reactive({ name: '', phone: '', email: '' })
const rawPhone = ref('')

const handlePhoneInput = () => {
  const result = formatPhoneNumberInput(form.phone);
  form.phone = result.formatted; // Отображение пользователю
  rawPhone.value = result.raw;   // Номер для передачи
};

const handleEmailInput = () => {
  const allowedPattern = /^[a-zA-Z0-9@._-]*$/;

  if (!allowedPattern.test(form.email)) {
    form.email = form.email
      .split('')
      .filter(char => /[a-zA-Z0-9@._-]/.test(char))
      .join('');
    errors.email = 'Разрешены только английские буквы, цифры и символы @._-';
  } else {
    errors.email = '';
  }
};

const submit = () => {
    errors.name = form.name ? '' : 'Обязательно'
    errors.phone = /^(\+7|8)\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(form.phone) ? '' : 'Неверно набран телефон'
    errors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? '' : 'Неверный email';
  if (!errors.email) {
    const allowedPattern = /^[a-zA-Z0-9@._-]+$/;
    errors.email = allowedPattern.test(form.email) ? '' : 'Email должен содержать только английские буквы, цифры и символы @._-';
  }

    if (!Object.values(errors).some(error => error)) {
    console.log('Отправлена форма', { ...form, phone: rawPhone.value });
    emit('close');
    }
}

watch(() => props.isOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
})
</script>

<template>
    <transition name="fade">
        <div v-if="isOpen" class="modalOverlay" @click.self="emit('close')">
            <div class="modalContent">
                <h2>Заказать звонок</h2>
                <form @submit.prevent="submit">
                    <div class="formGroup">
                        <label for="name">Имя</label>
                        <input 
                            id="name" 
                            v-model="form.name" 
                            placeholder="Ваше имя" 
                            :class="{ error: errors.name }"
                            @focus="errors.name = ''" 
                        />
                        <span v-if="errors.name" class="errorMessage">{{ errors.name }}</span>
                    </div>
                    <div class="formGroup">
                        <label for="phone">Телефон</label>
                        <input 
                            id="phone" 
                            v-model="form.phone" 
                            placeholder="+7 XXX - XXX - XX - XX"
                            :class="{ error: errors.phone }" 
                            @focus="errors.phone = ''" 
                            @input="handlePhoneInput" 
                        />
                        <span v-if="errors.phone" class="errorMessage">{{ errors.phone }}</span>
                    </div>
                    <div class="formGroup">
                        <label for="email">Email</label>
                        <input 
                            id="email" 
                            v-model="form.email" 
                            placeholder="mail@site.com"
                            :class="{ error: errors.email }" 
                            @focus="errors.email = ''" 
                            @input="handleEmailInput"
                        />
                        <span v-if="errors.email" class="errorMessage">{{ errors.email }}</span>
                    </div>
                    <div class="formGroup">
                        <label for="message">Сообщение</label>
                        <textarea id="message" v-model="form.message" placeholder="Ваше сообщение ..."></textarea>
                    </div>
                    <button type="submit" class="submitBtn">
                        <p>Отправить</p>
                        <img :src="cta" alt="Заказать звонок" class="cta" />
                    </button>
                </form>
                <button class="closeIcon" @click="emit('close')"><div /><div /></button>
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.modalOverlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: grid;
  place-items: center;
  padding: 20px; 
}

.modalContent {
  background: #fff;
  box-sizing: border-box;
  padding: clamp(30px, 5vw, 80px) clamp(20px, 5vw, 54px); 
  border-radius: 20px;
  width: min(90%, 635px);
  max-height: 90vh; 
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 46px);
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: clamp(24px, 3vw, 32px); 
  line-height: 1.2;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 2vw, 24px);
}

.formGroup {
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 1.5vw, 16px); 

  label {
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    font-size: clamp(14px, 2vw, 16px); 
  }

  input,
  textarea {
    width: 100%;
    padding: clamp(16px, 3vw, 28px) clamp(16px, 3vw, 30px); 
    border: 1px solid rgba(159, 159, 159, 1);
    border-radius: 10px;
    box-sizing: border-box;
    font-size: clamp(14px, 2vw, $font-size-m);
    line-height: 1.2;

    &:focus {
      outline: none;
      border-color: $accent-color;
    }
  }

  textarea {
    height: 120px;
    resize: none;
  }

  .error {
    border-color: red;
  }

  .errorMessage {
    color: red;
    font-size: clamp(10px, 2vw, 12px); 
    margin-top: 5px;
    display: block;
  }
}

.submitBtn {
  background: $accent-color;
  border-radius: 82px;
  width: min(100%, 265px);
  height: clamp(50px, 8vw, 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  p {
    color: #fff;
    font-size: clamp(16px, 2.5vw, 20px); 
  }

  .cta {
    position: absolute;
    width: clamp(12px, 2vw, 15px); 
    height: clamp(12px, 2vw, 15px); 
    transform: translateY(2px);
    right: clamp(20px, 5vw, 40px); 
  }

  &:hover {
    background: $primary-color;
  }
}

.closeIcon {
    cursor: pointer;
    position: absolute;
    background: none;
    width: 60px;
    height: 60px;
    right: 0;
    top: 0;
    display: grid;
    place-items: center;

  div {
        position: absolute;
        height: 2px;
        width: 20px;
        background: rgba(188, 188, 188, 1);

        &:first-child {
            transform: rotate(45deg);
        }
        &:last-child {
            transform: rotate(-45deg);
        }
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .modalContent {
    width: 95%;
    max-height: 95vh;
    padding: 25px 20px;
  }
  
  .submitBtn {
    width: 100%;
  }
}
</style>