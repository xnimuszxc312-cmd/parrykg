<template>
  <div class="dashboard fade-in">
    <div class="dashboard-header">
      <h1>Панель управления</h1>
      <p>Добро пожаловать, {{ userEmail }}!</p>
    </div>

    <div class="dashboard-grid">
      <div class="dashboard-card">
        <div class="card-icon">💰</div>
        <h3>Баланс</h3>
        <p class="card-value">$0.00</p>
        <p class="card-subtitle">Доступные средства</p>
      </div>

      <div class="dashboard-card">
        <div class="card-icon">📊</div>
        <h3>Транзакции</h3>
        <p class="card-value">0</p>
        <p class="card-subtitle">Всего платежей</p>
      </div>

      <div class="dashboard-card">
        <div class="card-icon">✅</div>
        <h3>Статус</h3>
        <p class="card-value" style="color: var(--success);">Активен</p>
        <p class="card-subtitle">Аккаунт активен</p>
      </div>

      <div class="dashboard-card">
        <div class="card-icon">🔔</div>
        <h3>Уведомления</h3>
        <p class="card-value">3</p>
        <p class="card-subtitle">Новых сообщений</p>
      </div>
    </div>

    <div class="dashboard-actions">
      <h2>Быстрые действия</h2>
      <div class="actions-grid">
        <router-link to="/payment" class="action-button primary">
          <span class="action-icon">💳</span>
          <span>Создать платеж</span>
        </router-link>
        <button class="action-button secondary">
          <span class="action-icon">📤</span>
          <span>Вывести средства</span>
        </button>
        <button class="action-button secondary">
          <span class="action-icon">📋</span>
          <span>История</span>
        </button>
        <button class="action-button secondary">
          <span class="action-icon">⚙️</span>
          <span>Настройки</span>
        </button>
      </div>
    </div>

    <div class="recent-transactions">
      <h2>Последние транзакции</h2>
      <div class="empty-state">
        <p>📭 Нет транзакций</p>
        <router-link to="/payment" class="btn btn-primary">
          Создать первый платеж
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const userEmail = ref('')

onMounted(() => {
  userEmail.value = localStorage.getItem('email') || 'Пользователь'
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.dashboard-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 40px;
  border-radius: 20px;
  text-align: center;
}

.dashboard-header h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: white;
}

.dashboard-header p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.dashboard-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.dashboard-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.dashboard-card h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--dark);
}

.card-value {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 5px;
}

.card-subtitle {
  font-size: 13px;
  color: #999;
}

.dashboard-actions {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dashboard-actions h2 {
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--dark);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.action-button.primary {
  background: linear-gradient(135deg, var(--primary), #FF8E8E);
  color: white;
}

.action-button.primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.3);
}

.action-button.secondary {
  background: linear-gradient(135deg, var(--secondary), #45B7AA);
  color: white;
}

.action-button.secondary:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(78, 205, 196, 0.3);
}

.action-icon {
  font-size: 20px;
}

.recent-transactions {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.recent-transactions h2 {
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--dark);
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: #F8F9FA;
  border-radius: 12px;
}

.empty-state p {
  font-size: 18px;
  color: #999;
  margin-bottom: 20px;
}

.empty-state a {
  text-decoration: none;
}

@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-header {
    padding: 30px;
  }

  .dashboard-header h1 {
    font-size: 28px;
  }
}
</style>
