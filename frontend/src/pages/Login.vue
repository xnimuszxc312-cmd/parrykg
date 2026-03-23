<template>
  <div class="login fade-in">
    <div class="login-container">
      <div class="login-box">
        <h2>Вход в аккаунт</h2>
        <p class="subtitle">Добро пожаловать обратно!</p>

        <form @submit.prevent="handleLogin">
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

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Загрузка...' : 'Войти' }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <p class="form-footer">
          Еще нет аккаунта?
          <router-link to="/register">Создать</router-link>
        </p>
      </div>

      <div class="login-illustration">
        <div class="illustration-content">
          <div class="icon">🔐</div>
          <p>Ваши данные в полной безопасности</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.post('/api/auth/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', response.data.token)
    localStorage.setItem('email', response.data.user.email)

    router.push('/dashboard')
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка входа'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
}

.login-container {
  display: flex;
  gap: 40px;
  max-width: 900px;
  width: 100%;
}

.login-box {
  flex: 1;
  background: white;
  padding: 50px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
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
  margin-bottom: 24px;
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
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
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

.form-footer {
  text-align: center;
  margin-top: 24px;
  color: #666;
}

.form-footer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
}

.form-footer a:hover {
  text-decoration: underline;
}

.login-illustration {
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

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    gap: 20px;
  }

  .login-box {
    padding: 30px;
  }

  .login-illustration {
    display: none;
  }
}
</style>
