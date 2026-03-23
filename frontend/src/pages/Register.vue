<template>
  <div class="register fade-in">
    <div class="register-container">
      <div class="register-illustration">
        <div class="illustration-content">
          <div class="icon">✨</div>
          <p>Присоединяйтесь к нашему сообществу</p>
        </div>
      </div>

      <div class="register-box">
        <h2>Регистрация</h2>
        <p class="subtitle">Создайте новый аккаунт</p>

        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label>Имя пользователя</label>
            <input 
              v-model="username"
              type="text" 
              placeholder="Ваше имя"
              required
            />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input 
              v-model="email"
              type="email" 
              placeholder="your@email.com"
              required
            />
          </div>

          <div class="form-group">
            <label>Пароль</label>
            <input 
              v-model="password"
              type="password" 
              placeholder="••••••••"
              required
            />
          </div>

          <div class="form-group">
            <label>Подтвердить пароль</label>
            <input 
              v-model="confirmPassword"
              type="password" 
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn btn-secondary" :disabled="loading">
            {{ loading ? 'Загрузка...' : 'Создать аккаунт' }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div v-if="success" class="success-message">
          Аккаунт создан успешно! Перенаправление...
        </div>

        <p class="form-footer">
          У вас уже есть аккаунт?
          <router-link to="/login">Войти</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  loading.value = true
  error.value = ''
  success.value = false

  try {
    await axios.post('/api/auth/register', {
      username: username.value,
      email: email.value,
      password: password.value
    })

    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.register-container {
  display: flex;
  gap: 40px;
  max-width: 900px;
  width: 100%;
}

.register-illustration {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.illustration-content {
  text-align: center;
}

.illustration-content .icon {
  font-size: 80px;
  margin-bottom: 20px;
  display: block;
}

.illustration-content p {
  font-size: 18px;
  color: #666;
}

.register-box {
  flex: 1;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.register-box h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.subtitle {
  color: #999;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--dark);
}

.form-group input {
  padding: 14px 16px;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-group input:focus {
  border-color: var(--secondary);
  box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
}

button {
  width: 100%;
  margin-top: 10px;
}

.error-message {
  background: #FFE8E8;
  color: var(--danger);
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
}

.success-message {
  background: #E8F5E9;
  color: var(--success);
  padding: 12px 16px;
  border-radius: 8px;
  margin-top: 20px;
  text-align: center;
}

.form-footer {
  text-align: center;
  margin-top: 24px;
  color: #666;
}

.form-footer a {
  color: var(--secondary);
  text-decoration: none;
  font-weight: 600;
}

.form-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .register-container {
    flex-direction: column;
    gap: 20px;
  }

  .register-box {
    padding: 30px;
  }

  .register-illustration {
    display: none;
  }
}
</style>
