<template>
  <div class="viability-card" :class="`viability-${category}`">
    <div class="viability-content">
      <div class="viability-left">
        <div class="score-circle">
          <svg class="progress-ring" viewBox="0 0 120 120">
            <circle
              class="progress-ring-circle"
              cx="60"
              cy="60"
              r="54"
              :style="{ strokeDashoffset: calculateOffset() }"
            />
          </svg>
          <div class="score-text">
            <span class="score-number">{{ score }}%</span>
            <span class="score-label">Viável</span>
          </div>
        </div>
      </div>

      <div class="viability-right">
        <h2 class="recommendation-title">{{ recommendation }}</h2>
        <p class="recommendation-subtitle">
          📊 Análise de {{ competitors }} concorrentes com rating médio {{ rating }}⭐
        </p>

        <div class="metrics-row">
          <div class="metric-mini">
            <span class="metric-icon">🏢</span>
            <div class="metric-info">
              <p class="metric-value">{{ competitors }}</p>
              <p class="metric-desc">Concorrentes</p>
            </div>
          </div>

          <div class="metric-mini">
            <span class="metric-icon">⭐</span>
            <div class="metric-info">
              <p class="metric-value">{{ rating }}</p>
              <p class="metric-desc">Rating Médio</p>
            </div>
          </div>
        </div>

        <div class="insight-box">
          <span class="insight-icon">💡</span>
          <p class="insight-text">{{ insight }}</p>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="glow-element"></div>
  </div>
</template>

<script>
export default {
  name: 'ViabilityCard',
  props: {
    score: {
      type: Number,
      required: true
    },
    recommendation: {
      type: String,
      required: true
    },
    competitors: {
      type: Number,
      default: 0
    },
    rating: {
      type: Number,
      default: 0
    },
    insight: {
      type: String,
      default: 'Continue investigando o mercado antes de tomar uma decisão'
    }
  },
  computed: {
    category() {
      if (this.score >= 75) return 'excellent';
      if (this.score >= 50) return 'good';
      if (this.score >= 25) return 'moderate';
      return 'risky';
    }
  },
  methods: {
    calculateOffset() {
      const circumference = 2 * Math.PI * 54;
      return circumference - (this.score / 100) * circumference;
    }
  }
};
</script>

<style scoped>
.viability-card {
  position: relative;
  border-radius: 1.5rem;
  padding: 3rem;
  margin-bottom: 2rem;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  animation: scaleIn 0.6s ease-out;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Gradientes por categoria */
.viability-excellent {
  background: linear-gradient(135deg, #059669 0%, #10b981 50%, #06b6d4 100%);
  color: white;
}

.viability-good {
  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #06b6d4 100%);
  color: white;
}

.viability-moderate {
  background: linear-gradient(135deg, #eab308 0%, #f59e0b 50%, #f97316 100%);
  color: white;
}

.viability-risky {
  background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%);
  color: white;
}

/* Glow decorativo */
.glow-element {
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.viability-content {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 3rem;
  align-items: center;
}

.viability-left {
  flex-shrink: 0;
}

.score-circle {
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  backdrop-filter: blur(5px);
  border: 3px solid rgba(255, 255, 255, 0.3);
  animation: rotateIn 0.8s ease-out;
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotate(-45deg) scale(0.8);
  }
  to {
    opacity: 1;
    transform: rotate(0) scale(1);
  }
}

.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.progress-ring-circle {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 8;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.6s ease;
  stroke-dasharray: 339.29;
}

.score-text {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.score-number {
  font-size: 2.5rem;
  font-weight: 900;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.score-label {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
}

.viability-right {
  flex: 1;
}

.recommendation-title {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recommendation-subtitle {
  font-size: 1rem;
  opacity: 0.95;
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.metrics-row {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.metric-mini {
  display: flex;
  gap: 1rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.12);
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.metric-icon {
  font-size: 1.5rem;
}

.metric-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-value {
  font-weight: 800;
  font-size: 1.25rem;
}

.metric-desc {
  font-size: 0.75rem;
  opacity: 0.85;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.insight-box {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.1);
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  animation: slideInUp 0.8s ease-out 0.3s both;
}

.insight-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.insight-text {
  font-size: 1rem;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 1024px) {
  .viability-content {
    flex-direction: column;
    text-align: center;
  }

  .score-circle {
    width: 150px;
    height: 150px;
  }

  .recommendation-title {
    font-size: 1.5rem;
  }

  .metrics-row {
    justify-content: center;
  }
}

@media (max-width: 640px) {
  .viability-card {
    padding: 2rem;
  }

  .score-circle {
    width: 120px;
    height: 120px;
  }

  .score-number {
    font-size: 2rem;
  }

  .recommendation-title {
    font-size: 1.25rem;
  }

  .metrics-row {
    flex-direction: column;
    gap: 1rem;
  }

  .metric-mini {
    gap: 0.75rem;
    padding: 0.75rem 1rem;
  }
}
</style>
