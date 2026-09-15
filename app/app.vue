<!-- app/app.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTracking } from '~/composables/useTracking';
import TrackingStatusBadge from '~/components/TrackingStatusBadge.vue';
import TrackingTimeline from '~/components/TrackingTimeline.vue';

const inputCode = ref('');
const { 
  trackingData, 
  isLoading, 
  errorMessage, 
  searchHistory, 
  initHistory, 
  trackPackage, 
  clearHistory 
} = useTracking();

onMounted(() => {
  initHistory();
});

const handleSearch = () => {
  if (inputCode.value) {
    trackPackage(inputCode.value);
  }
};

const handleSelectHistory = (code: string) => {
  inputCode.value = code;
  trackPackage(code);
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
  <div class="min-vh-100 bg-light py-4 py-md-5">
    <div class="container">
      <!-- Başlık & Header -->
      <header class="text-center mb-5">
        <div class="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle p-3 mb-3 shadow">
          <i class="bi bi-box-seam fs-1"></i>
        </div>
        <h1 class="display-6 fw-bold text-dark">Paket Dedektifi</h1>
        <p class="lead text-muted mx-auto" style="max-width: 600px;">
          Farklı kargo servislerinden gelen verileri tek bir standart arayüzde birleştiren akıllı kargo takip sistemi.
        </p>
      </header>

      <div class="row g-4 justify-content-center">
        <!-- SOL SÜTUN: Kargo Arama Formu & Geçmiş -->
        <div class="col-lg-5">
          <!-- Arama Kartı -->
          <div class="card border-0 shadow-sm rounded-3 mb-4">
            <div class="card-body p-4">
              <h5 class="card-title fw-bold mb-3">
                <i class="bi bi-search me-2 text-primary"></i>Kargo Sorgula
              </h5>
              <form @submit.prevent="handleSearch">
                <div class="input-group mb-3">
                  <input
                    v-model="inputCode"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Örn: FAST123456, GLO987654"
                    :disabled="isLoading"
                    required
                  />
                  <button 
                    class="btn btn-primary px-4 fw-bold d-flex align-items-center gap-2" 
                    type="submit"
                    :disabled="isLoading"
                  >
                    <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
                    <i v-else class="bi bi-arrow-right-circle"></i>
                    <span>Sorgula</span>
                  </button>
                </div>
              </form>

              <!-- Hızlı Test Butonları -->
              <div class="d-flex flex-wrap align-items-center gap-2 pt-2 border-top">
                <small class="text-muted w-100">Hızlı Test Numaraları:</small>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-secondary"
                  @click="handleSelectHistory('FAST123456')"
                >
                  HızlıKargo (FAST123456)
                </button>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-secondary"
                  @click="handleSelectHistory('GLO987654')"
                >
                  GlobalLogistics (GLO987654)
                </button>
                <button 
                  type="button" 
                  class="btn btn-sm btn-outline-secondary"
                  @click="handleSelectHistory('TR555888')"
                >
                  YerelDağıtım (TR555888)
                </button>
              </div>
            </div>
          </div>

          <!-- Arama Geçmişi Kartı (LocalStorage) -->
          <div class="card border-0 shadow-sm rounded-3">
            <div class="card-body p-4">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="card-title fw-bold mb-0 text-secondary">
                  <i class="bi bi-clock-history me-1"></i>Son Aramalarınız
                </h6>
                <button 
                  v-if="searchHistory && searchHistory.length > 0" 
                  class="btn btn-link btn-sm text-danger text-decoration-none p-0"
                  @click="clearHistory"
                >
                  Temizle
                </button>
              </div>

              <div v-if="!searchHistory || searchHistory.length === 0" class="text-muted small py-2">
                Henüz kayıtlı bir aramanız bulunmamaktadır.
              </div>

              <div v-else class="list-group list-group-flush">
                <button
                  v-for="item in searchHistory"
                  :key="item.trackingNumber"
                  type="button"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-0 py-2 border-bottom"
                  @click="handleSelectHistory(item.trackingNumber)"
                >
                  <div>
                    <div class="fw-bold text-dark font-monospace">{{ item.trackingNumber }}</div>
                    <small class="text-muted">{{ item.carrierName }}</small>
                  </div>
                  <i class="bi bi-chevron-right text-muted"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- SAĞ SÜTUN: Kargo Bilgi Kartı & Zaman Çizelgesi -->
        <div class="col-lg-7">
          <!-- Hata Mesajı -->
          <div v-if="errorMessage" class="alert alert-danger d-flex align-items-center shadow-sm mb-4" role="alert">
            <i class="bi bi-exclamation-triangle-fill fs-4 me-3"></i>
            <div>
              <div class="fw-bold">Arama Başarısız!</div>
              <div>{{ errorMessage }}</div>
            </div>
          </div>

          <!-- Yükleniyor Göstergesi -->
          <div v-if="isLoading" class="card border-0 shadow-sm p-5 text-center">
            <div class="spinner-border text-primary mx-auto mb-3" style="width: 3rem; height: 3rem;" role="status"></div>
            <p class="text-muted mb-0 fw-bold">Farklı kargo servislerinden veriler toplanıyor ve normalize ediliyor...</p>
          </div>

          <!-- Kargo Başarıyla Bulunduğunda Gösterilecek Detay Kartı -->
          <div v-else-if="trackingData" class="card border-0 shadow-sm rounded-3 overflow-hidden">
            <!-- Üst Bilgi Barı -->
            <div class="card-header bg-white border-bottom p-4">
              <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                <div>
                  <span class="text-uppercase tracking-wider small fw-bold text-primary">{{ trackingData.carrier }}</span>
                  <h3 class="mb-0 fw-bold font-monospace">{{ trackingData.trackingNumber }}</h3>
                </div>
                <TrackingStatusBadge 
                  :status="trackingData.status" 
                  :status-text="trackingData.statusText" 
                />
              </div>

              <!-- Özet Bilgiler (Konum & Son Güncelleme) -->
              <div class="row g-3 pt-2 text-muted small">
                <div class="col-sm-6">
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-geo-alt-fill text-danger fs-5"></i>
                    <div>
                      <div class="fw-bold text-dark">Bulunduğu Konum</div>
                      <div>{{ trackingData.currentLocation }}</div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="d-flex align-items-center gap-2">
                    <i class="bi bi-clock-fill text-primary fs-5"></i>
                    <div>
                      <div class="fw-bold text-dark">Son Güncelleme Zamanı</div>
                      <div>{{ formatDate(trackingData.lastUpdated) }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Zaman Çizelgesi (Timeline) -->
            <div class="card-body p-4">
              <TrackingTimeline :events="trackingData.events" />
            </div>
          </div>

          <!-- Henüz Arama Yapılmamışsa Karşılama Ekranı -->
          <div v-else class="card border-0 shadow-sm p-5 text-center text-muted">
            <i class="bi bi-truck fs-1 text-primary opacity-50 mb-3"></i>
            <h5 class="fw-bold text-dark">Takip Numarası Girin</h5>
            <p class="small mb-0">Sol taraftaki kutucuğa bir kargo takip numarası girerek paketin güncel durumunu öğrenebilirsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>