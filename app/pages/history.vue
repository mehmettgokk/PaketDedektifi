<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTracking } from '~/composables/useTracking';
import TrackingStatusBadge from '~/components/TrackingStatusBadge.vue';

const router = useRouter();
const { searchHistory, initHistory, trackPackage, clearHistory } = useTracking();

onMounted(() => {
  initHistory();
});

const selectAndTrack = (code: string) => {
  trackPackage(code);
  router.push('/');
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
        <h1 class="display-6 fw-bold mb-1">Arama Geçmişi</h1>
        <p class="text-muted mb-0">Cihazınızda LocalStorage üzerinde saklanan son kargo sorgularınız.</p>
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
    <div v-if="!searchHistory || searchHistory.length === 0" class="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
      <i class="bi bi-clock-history fs-1 text-muted opacity-50 mb-3"></i>
      <h4 class="fw-bold">Geçmiş Bulunamadı</h4>
      <p class="text-muted mb-4">Henüz bir kargo sorgulamadınız.</p>
      <NuxtLink to="/" class="btn btn-primary rounded-pill px-4 mx-auto">
        Kargo Sorgulamaya Başla
      </NuxtLink>
    </div>

    <!-- Geçmiş Listesi Tablosu -->
    <div v-else class="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th class="ps-4">Takip Numarası</th>
              <th>Kargo Firması</th>
              <th>Son Bilinen Durum</th>
              <th>Sorgulanma Tarihi</th>
              <th class="text-end pe-4">İşlem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in searchHistory" :key="item.trackingNumber">
              <td class="ps-4">
                <span class="fw-bold font-monospace text-primary fs-6">{{ item.trackingNumber }}</span>
              </td>
              <td class="fw-semibold text-secondary">{{ item.carrierName }}</td>
              <td>
                <TrackingStatusBadge :status="item.lastKnownStatus" :status-text="item.lastKnownStatus" />
              </td>
              <td class="text-muted small">{{ formatDate(item.searchedAt) }}</td>
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