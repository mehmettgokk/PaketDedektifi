<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useTracking } from '~/composables/useTracking';

const router = useRouter();
const { trackPackage } = useTracking();

const startTracking = (code: string) => {
  trackPackage(code);
  router.push('/');
};

const carriers = [
  {
    name: 'HızlıKargo Express',
    code: 'FAST123456',
    badge: 'Mock Servis 1',
    badgeClass: 'bg-primary',
    format: 'Düz (Flat) JSON + Küçük Harfli Durumlar (out_for_delivery, pending)',
    icon: 'bi-truck',
    location: 'İstanbul',
    description: 'Şehir içi ve şehirler arası hızlı kurye servisi simülasyonu.'
  },
  {
    name: 'Global Logistics Network',
    code: 'GLO987654',
    badge: 'Mock Servis 2',
    badgeClass: 'bg-info text-dark',
    format: 'İç İçe (Nested) Nesneler + Büyük Harf Kodlar (location.city, TRANSIT)',
    icon: 'bi-buildings',
    location: 'Bursa Hub-16',
    description: 'Uluslararası standartlarda çalışan aktarma merkezli lojistik ağı.'
  },
  {
    name: 'Yerel Dağıtım Kargo',
    code: 'TR555888',
    badge: 'Mock Servis 3',
    badgeClass: 'bg-success',
    format: 'Türkçe Alan Adları + Sayısal Durum Kodları (durum_kodu: 500, bulundugu_il)',
    icon: 'bi-box-seam',
    location: 'Eskişehir',
    description: 'Klasik yerel dağıtım altyapısı ve telsiz/sayısal durum kodlaması.'
  },
  {
    name: 'AfterShip Tracking API',
    code: 'CANLI_TAKIP_NO',
    badge: 'Canlı Entegrasyon',
    badgeClass: 'bg-secondary',
    format: 'Resmi REST API v4/v5 Şeması (checkpoints, slug, subtag_message)',
    icon: 'bi-globe-americas',
    location: 'Dünya Geneli (1000+ Kurye)',
    description: 'AfterShip API anahtarı eklendiğinde DHL, FedEx, UPS gibi küresel kargoları canlı takip eder.'
  }
];
</script>

<template>
  <div class="container py-5">
    <!-- Başlık -->
    <div class="text-center mb-5">
      <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-semibold mb-2">
        Test & Entegrasyon Rehberi
      </span>
      <h1 class="display-6 fw-bold text-themed">Desteklenen Kargo Firmaları</h1>
      <p class="text-secondary mx-auto" style="max-width: 600px;">
        Aşağıdaki kargo firmaları birbirinden tamamen farklı API modellerine sahiptir. Paket Dedektifi bu verileri ortak bir yapıda birleştirir.
      </p>
    </div>

    <!-- Firma Kartları -->
    <div class="row g-4">
      <div v-for="carrier in carriers" :key="carrier.name" class="col-md-6">
        <div class="theme-card h-100 p-4 d-flex flex-column justify-content-between">
          <div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span :class="['badge rounded-pill px-3 py-1', carrier.badgeClass]">{{ carrier.badge }}</span>
              <i :class="['bi fs-3 text-primary', carrier.icon]"></i>
            </div>
            <h4 class="fw-bold mb-2 text-themed">{{ carrier.name }}</h4>
            <p class="text-secondary small mb-3">{{ carrier.description }}</p>

            <div class="theme-sub-card p-3 rounded-3 mb-3 small">
              <div class="text-secondary fw-semibold mb-1">API Yanıt Formatı:</div>
              <code class="text-primary">{{ carrier.format }}</code>
            </div>
          </div>

          <div class="pt-3 border-top d-flex justify-content-between align-items-center" style="border-color: var(--border-color) !important;">
            <div>
              <small class="text-secondary d-block">Örnek Test No:</small>
              <span class="fw-bold font-monospace text-primary fs-6">{{ carrier.code }}</span>
            </div>
            <button 
              v-if="carrier.code !== 'CANLI_TAKIP_NO'" 
              class="btn btn-primary rounded-pill btn-sm px-3 fw-semibold"
              @click="startTracking(carrier.code)"
            >
              Hemen Sorgula <i class="bi bi-arrow-right ms-1"></i>
            </button>
            <span v-else class="badge bg-secondary-subtle text-secondary border">API Anahtarı Gerekir</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>