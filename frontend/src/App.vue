<template>
  <div class="app">
    <nav class="navbar">
      <div class="navbar-container">
        <router-link to="/" class="logo">
          <strong>❤ Parrykg</strong>
        </router-link>
        <div class="nav-links">
          <router-link 
            v-if="!isLoggedIn" 
            to="/login" 
            class="nav-link"
          >
            Вход
          </router-link>
          <router-link 
            v-if="!isLoggedIn" 
            to="/register" 
            class="nav-link nav-register"
          >
            Регистрация
          </router-link>
          <div v-if="isLoggedIn" class="user-menu">
            <span class="user-email">{{ userEmail }}</span>
            <button @click="logout" class="btn-logout">Выход</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2026 Parrykg. Все права защищены.</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const userEmail = ref('')

onMounted(() => {
  const token = localStorage.getItem('token')
  const email = localStorage.getItem('email')
  if (token) {
    isLoggedIn.value = true
    userEmail.value = email
  }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  isLoggedIn.value = false
  router.push('/')
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 24px;
  align-items: center;
}

.nav-link {
  color: var(--dark);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-register {
  background: linear-gradient(135deg, var(--primary), #FF8E8E);
  color: white !important;
  padding: 8px 16px;
  border-radius: 6px;
}

.user-menu {
  display: flex;
  gap: 16px;
  align-items: center;
}

.user-email {
  color: #666;
  font-size: 14px;
}

.btn-logout {
  background: var(--danger);
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-logout:hover {
  background: #FF5252;
  transform: translateY(-2px);
}

.main-content {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 40px 32px;
}

.footer {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  padding: 24px;
  margin-top: auto;
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 12px 16px;
  }

  .nav-links {
    gap: 12px;
  }

  .main-content {
    padding: 20px 16px;
  }
}
</style>
