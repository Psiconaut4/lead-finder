<template>
  <div class="search-bar-wrapper">
    <!-- Header Hero -->
    <div class="header-hero">
      <div class="header-content">
        <div class="header-top">
          <span class="badge-new">✨ IA Powered</span>
        </div>
        <h1 class="header-title">Analisador de Concorrência</h1>
        <p class="header-subtitle">Descubra se vale a pena abrir seu negócio nessa região com análise inteligente</p>
      </div>
    </div>

    <!-- Search Container -->
    <div class="search-section">
      <div class="search-container">
        <div class="input-wrapper">
          <div class="input-group">
            <label class="input-label">📍 Tipo de Negócio</label>
            <input
              v-model="keyword"
              placeholder="Ex: barbearia, pizzaria, consultório..."
              @keyup.enter="$emit('search', keyword, city)"
              class="search-input"
            />
          </div>

          <div class="input-group">
            <label class="input-label">🏙️ Cidade</label>
            <input
              v-model="city"
              placeholder="Ex: São Paulo, Rio de Janeiro..."
              @keyup.enter="$emit('search', keyword, city)"
              class="search-input"
            />
          </div>
        </div>

        <button
          @click="$emit('search', keyword, city)"
          :disabled="loading || !keyword || !city"
          class="btn-search"
          :class="{ 'is-loading': loading }"
        >
          <span v-if="!loading" class="btn-content">
            <span class="btn-icon">🔍</span>
            <span class="btn-text">Analisar Mercado</span>
          </span>
          <span v-else class="btn-content">
            <span class="btn-spinner">⏳</span>
            <span class="btn-text">Analisando...</span>
          </span>
        </button>
      </div>

      <div v-if="error" class="error-banner">
        <span class="error-icon">⚠️</span>
        <span class="error-text">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      keyword: '',
      city: ''
    };
  }
};
</script>

<style scoped>
.search-bar-wrapper {
  background: linear-gradient(135deg, #1a1a3e 0%, #0f1c4f 50%, #1a1a3e 100%);
  position: relative;
  overflow: hidden;
}

/* Efeito de fundo decorativo */
.search-bar-wrapper::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
  border-radius: 50%;
  top: -100px;
  right: -100px;
  pointer-events: none;
}

.search-bar-wrapper::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  bottom: -50px;
  left: -100px;
  pointer-events: none;
}

.header-hero {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  padding: 4rem 2rem 2rem;
}

.header-top {
  margin-bottom: 1.5rem;
}

.badge-new {
  display: inline-block;
  background: rgba(255, 255, 255, 0.15);
  color: #22d3ee;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(34, 211, 238, 0.3);
  backdrop-filter: blur(10px);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.header-title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slideInDown 0.8s ease-out;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header-subtitle {
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 300;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.search-section {
  position: relative;
  z-index: 2;
  padding: 3rem 2rem 2rem;
}

.search-container {
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: flex-end;
  animation: slideInUp 0.8s ease-out 0.4s both;
}

.input-wrapper {
  display: flex;
  gap: 1.5rem;
  flex: 1;
  min-width: 400px;
  flex-wrap: wrap;
}

.input-group {
  flex: 1;
  min-width: 180px;
}

.input-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.search-input {
  width: 100%;
  padding: 0.95rem 1.25rem;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.08);
  color: white;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 500;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-input:focus {
  outline: none;
  border-color: rgba(99, 102, 241, 0.8);
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
  transform: translateY(-2px);
}

.btn-search {
  padding: 0.95rem 2rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-text {
  font-size: 0.95rem;
}

.btn-search:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
}

.btn-search:active:not(:disabled) {
  transform: translateY(-1px);
}

.btn-search:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-banner {
  margin-top: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.4);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fca5a5;
  backdrop-filter: blur(5px);
  animation: slideInDown 0.3s ease-out;
}

.error-icon {
  font-size: 1.2rem;
}

.error-text {
  font-weight: 500;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 2.2rem;
  }

  .header-subtitle {
    font-size: 1rem;
  }

  .input-wrapper {
    flex-direction: column;
    min-width: unset;
    width: 100%;
  }

  .search-container {
    flex-direction: column;
    min-width: unset;
  }

  .btn-search {
    width: 100%;
    justify-content: center;
  }
}
</style>
