<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTracking } from '~/composables/useTracking';
import TrackingStatusBadge from '~/components/TrackingStatusBadge.vue';
import type { StandardPackageStatus } from '~~/types/tracking';

const router = useRouter();
const { searchHistory, initHistory, trackPackage, clearHistory } = useTracking();

onMounted(() => {
  initHistory();
});

const selectAndTrack = (code: string) => {
  trackPackage(code);
  router.push('/');
};

const getStatusLabel = (status: StandardPackageStatus): string => {
  const map: Record<StandardPackageStatus, string> = {
    PREPARING: 'Hazırlanıyor',
    IN_TRANSIT: 'Yolda',
    AT_HUB: 'Dağıtım Merkezinde',
    OUT_FOR_DELIVERY: 'Dağıtımda',
    DELIVERED: 'Teslim Edildi',
    EXCEPTION: 'Sorun Oluştu',
  };
  return map[status] || status;
};

const formatDate = (isoString: string) => {
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoString));
  } catch {
    return isoString;
  }
};
</script>

<template>
  <div class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
      <div>
        <h1 class="display-6 fw-bold mb-1 text-themed">Arama Geçmişi</h1>
        <p class="text-secondary mb-0">Cihazınızda LocalStorage üzerinde saklanan son kargo sorgularınız.</p>
      </div>
      <button 
        v-if="searchHistory && searchHistory.length > 0" 
        class="btn btn-outline-danger rounded-pill px-4"
        @click="clearHistory"
      >
        <i class="bi bi-trash3 me-1"></i>Tüm Geçmişi Temizle
      </button>
    </div>

    <!-- Boş Durum -->
    <div v-if="!searchHistory || searchHistory.length === 0" class="theme-card p-5 text-center">
      <i class="bi bi-clock-history fs-1 text-muted opacity-50 mb-3"></i>
      <h4 class="fw-bold">Geçmiş Bulunamadı</h4>
      <p class="text-secondary mb-4">Henüz bir kargo sorgulamadınız.</p>
      <NuxtLink to="/" class="btn btn-primary rounded-pill px-4 mx-auto">
        Kargo Sorgulamaya Başla
      </NuxtLink>
    </div>

    <!-- Geçmiş Listesi Tablosu -->
    <div v-else class="theme-card overflow-hidden">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead>
            <tr class="border-bottom" style="border-color: var(--border-color) !important;">
              <th class="ps-4 py-3 text-secondary">Takip Numarası</th>
              <th class="py-3 text-secondary">Kargo Firması</th>
              <th class="py-3 text-secondary">Son Bilinen Durum</th>
              <th class="py-3 text-secondary">Sorgulanma Tarihi</th>
              <th class="text-end pe-4 py-3 text-secondary">İşlem</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="item in searchHistory" 
              :key="item.trackingNumber"
              class="border-bottom"
              style="border-color: var(--border-color) !important;"
            >
              <td class="ps-4">
                <span class="fw-bold font-monospace text-primary fs-6">{{ item.trackingNumber }}</span>
              </td>
              <td class="fw-semibold">{{ item.carrierName }}</td>
              <td>
                <!-- getStatusLabel ile Türkçeleştirilmiş metin gönderilir -->
                <TrackingStatusBadge 
                  :status="item.lastKnownStatus" 
                  :status-text="getStatusLabel(item.lastKnownStatus)" 
                />
              </td>
              <td class="text-secondary small">{{ formatDate(item.searchedAt) }}</td>
              <td class="text-end pe-4">
                <button 
                  class="btn btn-sm btn-outline-primary rounded-pill px-3"
                  @click="selectAndTrack(item.trackingNumber)"
                >
                  Yeniden Sorgula <i class="bi bi-arrow-clockwise ms-1"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  color: var(--text-main);
  --bs-table-bg: transparent;
  --bs-table-hover-bg: rgba(59, 130, 246, 0.05);
}
</style>