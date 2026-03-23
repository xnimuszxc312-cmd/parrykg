<template>
  <div class="home fade-in">
    <section class="hero">
      <div class="hero-content">
        <h1>Добро пожаловать в Parrykg</h1>
        <p>Современная платежная система с безопасностью и удобством</p>
        <div class="hero-buttons">
          <router-link v-if="!isLoggedIn" to="/register" class="btn btn-primary">
            Начать сейчас
          </router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="btn btn-secondary">
            Уже есть аккаунт?
          </router-link>
          <router-link v-if="isLoggedIn" to="/dashboard" class="btn btn-primary">
            Перейти в панель
          </router-link>
        </div>
      </div>
      <div class="hero-illustration">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
    </section>

    <section class="features">
      <h2>Почему выбирают Parrykg?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Безопасность</h3>
          <p>Защита данных с использованием новейших технологий шифрования</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Скорость</h3>
          <p>Мгновенная обработка платежей и переводов</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">💎</div>
          <h3>Надежность</h3>
          <p>Стабильная работа 24/7 с 99,9% uptime гарантией</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🌍</div>
          <h3>Глобальность</h3>
          <p>Поддержка международных платежей и множество валют</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>Готовы начать?</h2>
      <p>Присоединяйтесь к тысячам счастливых пользователей</p>
      <router-link v-if="!isLoggedIn" to="/register" class="btn btn-accent">
        Создать аккаунт
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.hero {
  display: flex;
  align-items: center;
  gap: 60px;
  background: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.hero-content h1 {
  font-size: 48px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-content p {
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.hero-buttons a {
  text-decoration: none;
}

.hero-illustration {
  flex: 1;
  position: relative;
  height: 300px;
  min-width: 300px;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, var(--primary), #FF8E8E);
  top: 20px;
  left: 20px;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--secondary), #45B7AA);
  bottom: 40px;
  left: 80px;
  animation-delay: 1s;
}

.shape-3 {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, var(--accent), #FFED4E);
  top: 100px;
  right: 20px;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.features {
  text-align: center;
}

.features h2 {
  font-size: 36px;
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.feature-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.feature-card p {
  font-size: 14px;
  color: #666;
}

.cta {
  background: white;
  padding: 60px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.cta h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

.cta p {
  font-size: 18px;
  margin-bottom: 30px;
  color: #666;
}

.cta a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .hero {
    flex-direction: column;
    padding: 30px;
    gap: 30px;
  }

  .hero-content h1 {
    font-size: 32px;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-illustration {
    min-width: unset;
  }

  .features h2, .cta h2 {
    font-size: 28px;
  }
}
</style>
