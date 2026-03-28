<template>
  <div class="next-steps-container">
    <div class="section-header">
      <div class="header-icon">📋</div>
      <h2 class="section-title">Próximos Passos</h2>
      <p class="section-subtitle">Como proceder com sua análise</p>
    </div>

    <div class="steps-list">
      <div
        v-for="(step, idx) in steps"
        :key="`step-${idx}`"
        class="step-item"
        :style="{ animationDelay: `${idx * 0.1}s` }"
      >
        <div class="step-number">{{ idx + 1 }}</div>
        <p class="step-text">{{ step }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NextStepsSection',
  props: {
    steps: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
.next-steps-container {
  margin-bottom: 2rem;
  animation: slideInUp 0.8s ease-out 0.4s both;
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

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.step-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 1.5rem;
  background: linear-gradient(135deg, #f5f9ff 0%, #eff6ff 100%);
  border: 1px solid #dbeafe;
  border-radius: 1rem;
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

.step-item:hover {
  transform: translateX(8px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.15);
  border-color: #bfdbfe;
  background: linear-gradient(135deg, #f0f7ff 0%, #e7f1ff 100%);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
  color: white;
  border-radius: 50%;
  font-weight: 900;
  font-size: 1.25rem;
  flex-shrink: 0;
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
}

.step-text {
  color: #1e3a8a;
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

  .step-item {
    gap: 1rem;
    padding: 1rem;
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>
