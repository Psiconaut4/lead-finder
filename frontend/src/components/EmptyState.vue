<template>
  <div class="empty-state-container">
    <div class="empty-state-content">
      <div class="empty-icon">📊</div>
      <h2 class="empty-title">Digite para começar a análise</h2>
      <p class="empty-description">
        Busque um tipo de negócio e uma cidade para descobrir se vale a pena abrir seu negócio naquela região.
      </p>
      <div class="empty-tips">
        <h3>💡 Dicas:</h3>
        <ul>
          <li>Busque por especificidades: "barbearia", "pizzaria", "consultório odontológico"</li>
          <li>Escolha cidades e regiões específicas</li>
          <li>Analise múltiplas regiões para comparar</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyState'
};
</script>

<style scoped>
.empty-state-container {
  padding: 4rem 2rem;
  text-align: center;
  animation: slideInUp 0.8s ease-out;
}

.empty-state-content {
  max-width: 500px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 2rem;
  display: inline-block;
  opacity: 0.9;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.empty-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.empty-description {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.empty-tips {
  background: linear-gradient(135deg, #f0f9ff 0%, #eff6ff 100%);
  border: 1px solid #bae6fd;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: left;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

.empty-tips h3 {
  font-size: 1rem;
  color: #0c4a6e;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

.empty-tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-tips li {
  color: #0c4a6e;
  font-weight: 500;
  font-size: 0.95rem;
  padding-left: 1.5rem;
  position: relative;
}

.empty-tips li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #0891b2;
  font-weight: 700;
}

@media (max-width: 640px) {
  .empty-state-container {
    padding: 2rem 1rem;
  }

  .empty-icon {
    font-size: 3rem;
  }

  .empty-title {
    font-size: 1.5rem;
  }
}
</style>
