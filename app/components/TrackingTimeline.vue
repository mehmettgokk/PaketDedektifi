<script setup lang="ts">
import type { TrackingEvent } from '~~/types/tracking';

defineProps<{
    events: TrackingEvent[];
}>();

const formatDateTime = (isoString: string) => {
    try {
        const d = new Date(isoString);
        return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        }).format(d);
    } catch {
        return isoString;
    }
};
</script>

<template>
    <div class="timeline-container py-2">
        <h5 class="fw-bold mb-4 text-secondary d-flex align-items-center gap-2">
        <i class="bi bi-clock-history text-primary"></i>
        <span>Kargo Hareket Geçmişi</span>
        </h5>

        <!-- Hareket listesi boşsa -->
        <div v-if="events.length === 0" class="alert alert-light text-muted border">
        Henüz kaydedilmiş kargo hareketi bulunmamaktadır.
        </div>

        <!-- Dikey Bağlantılı Zaman Çizelgesi -->
        <div v-else class="position-relative ps-4 ms-2">
        <!-- Dikey Bağlantı Çizgisi -->
        <div 
            class="position-absolute start-0 top-0 bottom-0 border-start border-2 border-primary opacity-25"
            style="margin-left: 2px;"
        ></div>

        <div 
            v-for="(event, idx) in events" 
            :key="event.id" 
            class="position-relative mb-4 pb-1"
        >
            <!-- Nokta / Durum Simgesi -->
            <div 
            class="position-absolute translate-middle rounded-circle d-flex align-items-center justify-content-center text-white"
            :class="idx === 0 ? 'bg-primary shadow' : 'bg-secondary'"
            style="left: -14px; top: 20px; width: 26px; height: 26px;"
            >
            <i v-if="idx === 0" class="bi bi-geo-alt-fill" style="font-size: 0.75rem;"></i>
            <i v-else class="bi bi-arrow-down-short fs-5"></i>
            </div>

            <!-- Olay Kartı -->
            <div class="card border-0 shadow-sm bg-light">
            <div class="card-body p-3">
                <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-1">
                <span class="fw-bold text-dark fs-6">{{ event.statusText }}</span>
                <span class="badge bg-white text-secondary border">
                    <i class="bi bi-calendar3 me-1"></i>{{ formatDateTime(event.timestamp) }}
                </span>
                </div>
                <div class="text-muted small d-flex align-items-center gap-1">
                <i class="bi bi-geo-alt text-danger"></i>
                <span>{{ event.city }}</span>
                <span v-if="event.details" class="ms-2 text-dark opacity-75">({{ event.details }})</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<style scoped>
.timeline-container {
  max-width: 100%;
}
</style>