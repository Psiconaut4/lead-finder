<template>
  <div class="competitor-card">
    <div class="card-header">
      <h3 class="competitor-name">{{ competitor.name }}</h3>
      <div class="rating-badge" :class="`rating-${getRatingCategory()}`">
        <span class="rating-icon">⭐</span>
        <span class="rating-value">{{ competitor.rating }}</span>
      </div>
    </div>

    <div class="card-divider"></div>

    <div class="card-body">
      <div class="info-row">
        <span class="info-label">📍 Localização</span>
        <p class="info-value">{{ competitor.address || 'N/A' }}</p>
      </div>

      <div class="info-row">
        <span class="info-label">💬 Avaliações</span>
        <p class="info-value">{{ competitor.reviews }} reviews</p>
      </div>

      <div v-if="competitor.phone" class="info-row">
        <span class="info-label">📱 Telefone</span>
        <p class="info-value">{{ competitor.phone }}</p>
      </div>

      <div class="badges-row">
        <span v-if="competitor.website" class="badge badge-website">
          <a :href="competitor.website" target="_blank"><span>🌐</span> Com Site</a>

        </span>
        <span v-else class="badge badge-no-website">
          <span>❌</span> Sem Site
        </span>
      </div>
    </div>

    <div v-if="competitor.mapsUrl" class="card-footer">
      <a v-if="competitor.mapsUrl" :href="competitor.mapsUrl" target="_blank" class="maps-button">
        <span class="button-icon">🗺️</span>
        <span class="button-text">Ver no Google Maps</span>
        <span class="button-arrow">→</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompetitorCard',
  props: {
    competitor: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  methods: {
    getRatingCategory() {
      const rating = this.competitor.rating;
      if (rating >= 4.5) return 'excellent';
      if (rating >= 4.0) return 'good';
      if (rating >= 3.5) return 'moderate';
      return 'low';
    }
  }
};
</script>

<style scoped>
.competitor-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 1.25rem;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: calc(var(--index, 0) * 0.1s);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.competitor-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  border-color: #d1d5db;
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

.card-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.competitor-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  line-height: 1.4;
  flex: 1;
}

.rating-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 0.95rem;
}

.rating-icon {
  font-size: 1.2rem;
}

.rating-value {
  display: block;
}

.rating-excellent {
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
  color: #065f46;
}

.rating-good {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  color: #0c2340;
}

.rating-moderate {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #7c2d12;
}

.rating-low {
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: #7f1d1d;
}

.card-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
}

.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.info-value {
  font-size: 0.95rem;
  color: #1f2937;
  font-weight: 600;
  margin: 0;
  line-height: 1.5;
  word-break: break-word;
}

.badges-row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge-website {
  background: #d1fae5;
  color: #065f46;
}

.badge-website>a {
  color: inherit;
  text-decoration: none;
  font-weight: 700;
}

.badge-no-website {
  background: #fee2e2;
  color: #7f1d1d;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  background: #fafbfc;
}

.maps-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.85rem 1.5rem;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  width: 100%;
}

.button-icon {
  font-size: 1.1rem;
}

.button-text {
  flex: 1;
}

.button-arrow {
  font-weight: 900;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.maps-button:hover {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
}

.maps-button:hover .button-arrow {
  opacity: 1;
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .competitor-card {
    border-radius: 1rem;
  }

  .card-header {
    padding: 1rem;
    flex-direction: column;
  }

  .competitor-name {
    font-size: 1.1rem;
  }

  .rating-badge {
    width: 100%;
    justify-content: center;
  }

  .card-body {
    padding: 1rem;
    gap: 0.75rem;
  }

  .card-footer {
    padding: 0.75rem;
  }
}
</style>
