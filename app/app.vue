<script setup lang="ts">
// Uygulama genelinde geçerli modern tema, layout ve navbar bileşeni
</script>

<template>
  <div class="app-wrapper min-vh-100 d-flex flex-column bg-body-tertiary">
    <!-- Modern Glassmorphism Navbar -->
    <nav class="navbar navbar-expand-lg sticky-top custom-navbar">
      <div class="container">
        <NuxtLink to="/" class="navbar-brand d-flex align-items-center gap-2 fw-bold text-dark">
          <div class="brand-icon-box">
            <i class="bi bi-box-seam-fill text-white fs-5"></i>
          </div>
          <span class="fs-4 brand-text">Paket<span class="text-primary">Dedektifi</span></span>
        </NuxtLink>

        <button 
          class="navbar-toggler border-0 shadow-none" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navMenu"
        >
          <i class="bi bi-list fs-2"></i>
        </button>

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
          </ul>
        </div>
      </div>
    </nav>

    <!-- Dinamik Sayfa İçeriği -->
    <main class="flex-grow-1">
      <NuxtPage />
    </main>

    <!-- Modern Minimal Footer -->
    <footer class="bg-white border-top py-4 mt-5">
      <div class="container text-center text-muted small">
        <div class="d-flex justify-content-center align-items-center gap-3 mb-2">
          <span><i class="bi bi-globe text-primary me-1"></i>AfterShip API</span>
        </div>
        <p class="mb-0">© 2026 <strong>Paket Dedektifi</strong></p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --app-bg: #f8fafc;
  --card-bg: rgba(255, 255, 255, 0.85);
}

body {
  background-color: var(--app-bg);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #1e293b;
}

.custom-navbar {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
}

.brand-icon-box {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.custom-nav-link {
  font-weight: 500;
  color: #64748b !important;
  padding: 0.5rem 1rem !important;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.custom-nav-link:hover {
  color: #2563eb !important;
  background: rgba(37, 99, 235, 0.05);
}

.custom-nav-link.active {
  color: #2563eb !important;
  background: rgba(37, 99, 235, 0.1);
  font-weight: 600;
}
</style>