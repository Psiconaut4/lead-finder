<template>
  <div class="opportunities-container">
    <div class="section-header">
      <div class="header-icon">🚀</div>
      <h2 class="section-title">Oportunidades</h2>
      <p class="section-subtitle">Vantagens que você pode aproveitar</p>
    </div>

    <div class="opportunities-grid">
      <div
        v-for="(opportunity, idx) in opportunities"
        :key="`opp-${idx}`"
        class="opportunity-item"
        :style="{ animationDelay: `${idx * 0.1}s` }"
      >
        <div class="opportunity-icon">✨</div>
        <p class="opportunity-text">{{ opportunity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpportunitiesSection',
  props: {
    opportunities: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.opportunities-container {
  margin-bottom: 2rem;
  animation: slideInUp 0.8s ease-out 0.3s both;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.header-icon {
  font-size: 2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.section-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #1f2937;
  letter-spacing: -0.5px;
}

.section-subtitle {
  font-size: 0.9rem;
  color: #6b7280;
  margin-left: auto;
  font-weight: 500;
}

.opportunities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.opportunity-item {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  border: 1px solid #bbf7d0;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.opportunity-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(16, 185, 129, 0.15);
  border-color: #86efac;
  background: linear-gradient(135deg, #f0fdf4 0%, #e6ffed 100%);
}

.opportunity-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  line-height: 1.5;
}

.opportunity-text {
  color: #15803d;
  font-weight: 600;
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
}

@media (max-width: 768px) {
  .section-header {
    flex-wrap: wrap;
  }

  .section-subtitle {
    margin-left: 0;
    width: 100%;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .opportunities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
