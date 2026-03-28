<template>
    <div class="competitors-container">
        <div class="section-header">
            <div class="header-top">
                <div class="header-icon">🏪</div>
                <h2 class="section-title">Concorrência Direta</h2>
            </div>
            <div class="header-stats">
                <span class="stat-badge">{{ competitors.length }} negócios</span>
                <span v-if="avgRating" class="stat-badge">⭐ {{ avgRating.toFixed(1) }} rating médio</span>
            </div>
        </div>

        <div v-if="competitors.length === 0" class="empty-state">
            <div class="empty-icon">🔍</div>
            <p class="empty-text">Nenhum concorrente foi encontrado nesta região.</p>
            <p class="empty-hint">Tente buscar por outra cidade ou tipo de negócio.</p>
        </div>

        <div v-else class="competitors-grid">
            <CompetitorCard v-for="(competitor, idx) in competitors" :key="idx" :competitor="competitor" :index="idx"
                :style="{ '--index': idx }" />
        </div>
    </div>
</template>

<script>
import CompetitorCard from './CompetitorCard.vue';

export default {
    name: 'CompetitorsList',
    components: {
        CompetitorCard
    },
    props: {
        competitors: {
            type: Array,
            default: () => []
        }
    },
    computed: {
        avgRating() {
            if (this.competitors.length === 0) return 0;
            const sum = this.competitors.reduce((acc, c) => acc + (c.rating || 0), 0);
            return sum / this.competitors.length;
        }
    }
};
</script>

<style scoped>
.competitors-container {
    margin-bottom: 2rem;
    animation: slideInUp 0.8s ease-out 0.5s both;
}

.section-header {
    margin-bottom: 2rem;
}

.header-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
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
    margin: 0;
}

.header-stats {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.stat-badge {
    display: inline-block;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    color: #0c4a6e;
    padding: 0.5rem 1.25rem;
    border-radius: 2rem;
    font-size: 0.85rem;
    font-weight: 700;
    border: 1px solid #bae6fd;
}

.empty-state {
    text-align: center;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    border: 2px dashed #d1d5db;
    border-radius: 1.25rem;
    color: #6b7280;
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: inline-block;
    opacity: 0.8;
}

.empty-text {
    font-size: 1.1rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;
}

.empty-hint {
    font-size: 0.9rem;
    color: #6b7280;
    margin: 0;
}

.competitors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

@media (max-width: 768px) {
    .competitors-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .section-title {
        font-size: 1.5rem;
    }

    .header-stats {
        justify-content: flex-start;
    }
}
</style>
