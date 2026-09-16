<script setup lang="ts">
import { onMounted } from 'vue';
import { useTheme } from '~/composables/useTheme';
import ThemeToggle from '~/components/ThemeToggle.vue';

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<template>
  <div class="app-wrapper min-vh-100 d-flex flex-column bg-app">
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg sticky-top custom-navbar">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand d-flex align-items-center gap-2 fw-bold text-themed">
          <div class="brand-icon-box">
            <i class="bi bi-box-seam-fill text-white fs-5"></i>
          </div>
          <span class="fs-4 brand-text">Paket<span class="text-primary">Dedektifi</span></span>
        </NuxtLink>

        <!-- Mobil Menü & Tema Butonu -->
        <div class="d-flex align-items-center gap-2 d-lg-none">
          <ThemeToggle />
          <button 
            class="navbar-toggler border-0 shadow-none text-themed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navMenu"
          >
            <i class="bi bi-list fs-2"></i>
          </button>
        </div>

        <div id="navMenu" class="collapse navbar-collapse">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2 pt-3 pt-lg-0">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link custom-nav-link" active-class="active">
                <i class="bi bi-search me-1"></i>Kargo Takip
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/history" class="nav-link custom-nav-link" active-class="active">
                <i class="bi bi-clock-history me-1"></i>Geçmiş Aramalar
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/supported-carriers" class="nav-link custom-nav-link" active-class="active">
                <i class="bi bi-truck me-1"></i>Kargo Firmaları & Test
              </NuxtLink>
            </li>
            <li class="nav-item ms-lg-2 d-none d-lg-block">
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Sayfa Gövdesi -->
    <main class="flex-grow-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="border-top py-4 mt-5 custom-footer">
      <div class="container text-center text-secondary small">
        <div class="d-flex justify-content-center align-items-center gap-3 mb-2 flex-wrap">
          <span><i class="bi bi-shield-check text-success me-1"></i>Universal Adapter Engine</span>
          <span>•</span>
          <span><i class="bi bi-lightning-charge text-warning me-1"></i>Nitro Fast Routing</span>
          <span>•</span>
          <span><i class="bi bi-globe text-primary me-1"></i>AfterShip API Ready</span>
        </div>
        <p class="mb-0">© 2026 <strong>Paket Dedektifi</strong>. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* CSS Değişkenleri ile Kesin Tema Renkleri */
:root, [data-bs-theme="light"] {
  --bg-app: #f1f5f9;
  --nav-bg: rgba(255, 255, 255, 0.88);
  --card-bg: #ffffff;
  --card-sub-bg: #f8fafc;
  --border-color: #e2e8f0;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --input-bg: #ffffff;
}

[data-bs-theme="dark"] {
  --bg-app: #090d16;
  --nav-bg: rgba(15, 23, 42, 0.88);
  --card-bg: #131c2e;
  --card-sub-bg: #1e293b;
  --border-color: #27354f;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --input-bg: #1e293b;
}

body {
  background-color: var(--bg-app);
  color: var(--text-main);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.bg-app {
  background-color: var(--bg-app);
}

.text-themed {
  color: var(--text-main) !important;
}

.custom-navbar {
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-color);
}

.custom-footer {
  background: var(--card-bg);
  border-color: var(--border-color) !important;
}

.brand-icon-box {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.custom-nav-link {
  font-weight: 500;
  color: var(--text-muted) !important;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.custom-nav-link:hover {
  color: #3b82f6 !important;
  background: rgba(59, 130, 246, 0.1);
}

.custom-nav-link.active {
  color: #3b82f6 !important;
  background: rgba(59, 130, 246, 0.15);
  font-weight: 600;
}

/* Evrensel Kart Stilleri */
.theme-card {
  background: var(--card-bg);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-sub-card {
  background: var(--card-sub-bg);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}
</style>