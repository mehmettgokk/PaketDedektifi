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
  initHistory, 
  trackPackage 
} = useTracking();

onMounted(() => {
  initHistory();
});

const handleSearch = () => {
  if (inputCode.value) {
    trackPackage(inputCode.value);
  }
};

const setCode = (code: string) => {
  inputCode.value = code;
  trackPackage(code);
};

// Rastgele test numarası seçici 
const testCodes = ['FAST123456', 'GLO987654', 'TR555888'];
const pickRandomCode = () => {
  const random = testCodes[Math.floor(Math.random() * testCodes.length)];
  setCode(random);
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
  <div>
    <!-- Hero Bölümü -->
    <section class="hero-section py-5 text-center text-white position-relative">
      <div class="container py-lg-4 position-relative" style="z-index: 2;">
        <span class="badge bg-white text-primary px-3 py-2 rounded-pill fw-semibold mb-3 shadow-sm">
          🚀 Çoklu Kargo Normalizer Motoru Aktif
        </span>
        <h1 class="display-5 fw-bold mb-3">Paketinizin Yolculuğunu Canlı İzleyin</h1>
        <p class="lead opacity-90 mx-auto mb-4" style="max-width: 650px;">
          Farklı formatlardaki kargo verilerini tek çatı altında toplayan akıllı dedektifiniz.
        </p>

        <!-- Arama Kutusu Kartı -->
        <div class="search-card-container mx-auto" style="max-width: 680px;">
          <form @submit.prevent="handleSearch" class="search-form bg-white p-2 rounded-4 shadow-lg d-flex align-items-center gap-2">
            <i class="bi bi-upc-scan fs-4 text-primary ms-3"></i>
            <input 
              v-model="inputCode" 
              type="text" 
              class="form-control border-0 shadow-none fs-5 py-2" 
              placeholder="Takip numarasını girin..." 
              :disabled="isLoading"
              required 
            />
            <!-- Rastgele Numara Butonu -->
            <button 
              type="button" 
              class="btn btn-light rounded-3 text-secondary d-none d-sm-inline-flex align-items-center gap-1"
              title="Rastgele Kargo Numarası Dene"
              @click="pickRandomCode"
            >
              <i class="bi bi-dice-5 fs-5"></i>
              <small class="fw-semibold">Rastgele</small>
            </button>
            <button 
              type="submit" 
              class="btn btn-primary btn-lg rounded-3 px-4 fw-bold d-flex align-items-center gap-2"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
              <i v-else class="bi bi-arrow-right"></i>
              <span>Sorgula</span>
            </button>
          </form>

          <!-- Hızlı Test Hapları -->
          <div class="d-flex flex-wrap align-items-center justify-content-center gap-2 mt-3">
            <span class="small opacity-75">Hemen dene:</span>
            <button type="button" class="btn btn-sm test-pill" @click="setCode('FAST123456')">
              🚚 FAST123456 (HızlıKargo)
            </button>
            <button type="button" class="btn btn-sm test-pill" @click="setCode('GLO987654')">
              🏢 GLO987654 (GlobalLogistics)
            </button>
            <button type="button" class="btn btn-sm test-pill" @click="setCode('TR555888')">
              📦 TR555888 (YerelDağıtım)
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Kargo Sonuç Paneli -->
    <section class="container py-5" style="margin-top: -30px; position: relative; z-index: 3;">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!-- Hata Uyarısı -->
          <div v-if="errorMessage" class="alert alert-danger border-0 shadow-sm rounded-4 p-4 d-flex align-items-center gap-3">
            <i class="bi bi-exclamation-octagon-fill fs-2 text-danger"></i>
            <div>
              <h5 class="fw-bold mb-1">Kargo Bulunamadı</h5>
              <p class="mb-0 text-muted">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Yükleniyor Durumu -->
          <div v-if="isLoading" class="modern-card p-5 text-center">
            <div class="spinner-grow text-primary mb-3" style="width: 3rem; height: 3rem;" role="status"></div>
            <h5 class="fw-bold text-dark">Kargo Ağları Taranıyor...</h5>
            <p class="text-muted mb-0">Mock veritabanları ve AfterShip uç noktaları normalize ediliyor.</p>
          </div>

          <!-- Kargo Başarılı Sonucu -->
          <div v-else-if="trackingData" class="modern-card overflow-hidden">
            <!-- Üst Kurumsal Bilgi Başlığı -->
            <div class="card-hero-header p-4 p-md-5 text-white">
              <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                  <span class="badge bg-white bg-opacity-25 rounded-pill px-3 py-1 mb-2 text-uppercase fw-semibold tracking-wide">
                    {{ trackingData.carrier }}
                  </span>
                  <h2 class="display-6 fw-bold mb-0 font-monospace">{{ trackingData.trackingNumber }}</h2>
                </div>
                <TrackingStatusBadge 
                  :status="trackingData.status" 
                  :status-text="trackingData.statusText" 
                />
              </div>

              <!-- İki Kolonlu Lokasyon & Saat Kutusu -->
              <div class="row g-3">
                <div class="col-sm-6">
                  <div class="info-glass-box p-3 rounded-3 d-flex align-items-center gap-3">
                    <div class="info-icon bg-danger text-white">
                      <i class="bi bi-geo-alt-fill fs-5"></i>
                    </div>
                    <div>
                      <small class="opacity-75 d-block">Bulunduğu Son Konum</small>
                      <strong class="fs-6">{{ trackingData.currentLocation }}</strong>
                    </div>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="info-glass-box p-3 rounded-3 d-flex align-items-center gap-3">
                    <div class="info-icon bg-primary text-white">
                      <i class="bi bi-clock-history fs-5"></i>
                    </div>
                    <div>
                      <small class="opacity-75 d-block">Son Güncellenme</small>
                      <strong class="fs-6">{{ formatDate(trackingData.lastUpdated) }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dikey Zaman Çizelgesi -->
            <div class="p-4 p-md-5 bg-white">
              <TrackingTimeline :events="trackingData.events" />
            </div>
          </div>

          <!-- İlk Ziyaret / Boş Karşılama Kartı -->
          <div v-else class="modern-card p-5 text-center text-muted">
            <div class="empty-icon-circle mx-auto mb-3">
              <i class="bi bi-box-seam fs-1 text-primary"></i>
            </div>
            <h4 class="fw-bold text-dark">Henüz Bir Takip Numarası Girmediniz</h4>
            <p class="text-secondary mx-auto mb-4" style="max-width: 480px;">
              Yukarıdaki arama çubuğuna takip numaranızı girin veya hızlı test butonlarına tıklayarak sistemin kargo verilerini nasıl normalize ettiğini izleyin.
            </p>
            <NuxtLink to="/supported-carriers" class="btn btn-outline-primary rounded-pill px-4">
              <i class="bi bi-info-circle me-1"></i>Tüm Test Numaralarını İncele
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%);
  padding-bottom: 60px;
}

.search-form {
  border: 1px solid rgba(255, 255, 255, 0.4);
}

.test-pill {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50rem;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}

.test-pill:hover {
  background: white;
  color: #1e3a8a;
}

.modern-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.07);
  border: 1px solid #e2e8f0;
}

.card-hero-header {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.info-glass-box {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.info-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon-circle {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>