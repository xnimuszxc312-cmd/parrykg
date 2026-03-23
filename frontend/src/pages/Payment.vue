<template>
  <div class="payment fade-in">
    <div class="payment-container">
      <div class="payment-form-section">
        <h2>Создать платеж</h2>
        <p class="subtitle">Заполните детали платежа</p>

        <form @submit.prevent="handlePayment" class="payment-form">
          <div class="form-group">
            <label>Сумма (в USD)</label>
            <div class="input-group">
              <span class="currency">$</span>
              <input 
                v-model.number="amount"
                type="number" 
                placeholder="0.00"
                step="0.01"
                min="0.50"
                required
              />
            </div>
            <small>Минимум: $0.50</small>
          </div>

          <div class="form-group">
            <label>Валюта</label>
            <select v-model="currency">
              <option value="usd">USD - Доллар США</option>
              <option value="eur">EUR - Евро</option>
              <option value="gbp">GBP - Британский фунт</option>
              <option value="rub">RUB - Российский рубль</option>
            </select>
          </div>

          <div class="form-group">
            <label>Описание платежа</label>
            <textarea 
              v-model="description"
              placeholder="Например: Подписка на месяц"
              rows="3"
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Обработка...' : 'Создать платеж' }}
          </button>
        </form>

        <div v-if="error" class="error-message">
          ❌ {{ error }}
        </div>

        <div v-if="success" class="success-message">
          ✅ Платеж создан успешно!
        </div>
      </div>

      <div class="payment-summary">
        <h3>Сводка платежа</h3>
        <div class="summary-item">
          <span>Сумма:</span>
          <span class="summary-value">${{ (amount || 0).toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span>Валюта:</span>
          <span class="summary-value">{{ currency.toUpperCase() }}</span>
        </div>
        <div class="summary-item">
          <span>Статус:</span>
          <span class="summary-value" :style="{ color: statusColor }">
            {{ status || 'Готов к платежу' }}
          </span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-item total">
          <span>Итого:</span>
          <span class="summary-value">${{ (amount || 0).toFixed(2) }} {{ currency.toUpperCase() }}</span>
        </div>

        <div class="payment-info">
          <p>🔒 Ваш платеж защищен с использованием SSL шифрования и обработан через Stripe.</p>
        </div>
      </div>
    </div>

    <div v-if="paymentDetails" class="payment-details">
      <h3>Детали платежа</h3>
      <div class="details-grid">
        <div class="detail-item">
          <label>ID платежа:</label>
          <code>{{ paymentDetails.paymentIntentId }}</code>
        </div>
        <div class="detail-item">
          <label>Client Secret:</label>
          <code>{{ paymentDetails.clientSecret.substring(0, 20) }}...</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const amount = ref(10)
const currency = ref('usd')
const description = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)
const status = ref('')
const statusColor = ref('')
const paymentDetails = ref(null)

const handlePayment = async () => {
  if (amount.value < 0.50) {
    error.value = 'Минимальная сумма - $0.50'
    return
  }

  loading.value = true
  error.value = ''
  success.value = false
  status.value = 'Обработка...'
  statusColor.value = '#FFD93D'

  try {
    const token = localStorage.getItem('token')
    const response = await axios.post('/api/payment/create-intent', {
      amount: Math.round(amount.value * 100),
      currency: currency.value,
      description: description.value || `Платеж ${amount.value} ${currency.value.toUpperCase()}`
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    paymentDetails.value = response.data
    success.value = true
    status.value = 'Ожидает оплаты'
    statusColor.value = '#FFD93D'

    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (err) {
    error.value = err.response?.data?.error || 'Ошибка при создании платежа'
    status.value = 'Ошибка'
    statusColor.value = '#FF6B6B'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.payment {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.payment-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.payment-form-section {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.payment-form-section h2 {
  font-size: 28px;
  margin-bottom: 10px;
  color: var(--dark);
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

.form-group small {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.input-group {
  display: flex;
  align-items: center;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  background: #FAFAFA;
}

.currency {
  padding: 0 16px;
  font-weight: 600;
  color: var(--primary);
}

.input-group input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 14px 0;
  font-size: 16px;
}

.input-group input:focus {
  outline: none;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 14px 16px;
  border: 2px solid #E8E8E8;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  outline: none;
}

button {
  width: 100%;
  margin-top: 20px;
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

.payment-summary {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.payment-summary h3 {
  font-size: 24px;
  margin-bottom: 30px;
  color: var(--dark);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  color: #666;
}

.summary-value {
  font-weight: 600;
  color: var(--dark);
}

.summary-divider {
  height: 1px;
  background: #E8E8E8;
  margin: 20px 0;
}

.summary-item.total {
  font-size: 18px;
  color: var(--dark);
  padding: 16px 0;
  border-top: 2px solid #E8E8E8;
}

.payment-info {
  background: #F8F9FA;
  padding: 16px;
  border-radius: 8px;
  margin-top: 24px;
  font-size: 14px;
  color: #666;
}

.payment-details {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.payment-details h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--dark);
}

.details-grid {
  display: grid;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item label {
  font-weight: 600;
  color: var(--dark);
  font-size: 14px;
}

.detail-item code {
  background: #F8F9FA;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  color: var(--primary);
  font-size: 12px;
  word-break: break-all;
}

@media (max-width: 968px) {
  .payment-container {
    grid-template-columns: 1fr;
  }

  .payment-summary {
    position: static;
  }
}
</style>
