<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';

const { currentTheme, toggleTheme } = useTheme();
</script>

<template>
  <button 
    type="button" 
    class="btn theme-toggle-btn d-flex align-items-center justify-content-center p-2 rounded-circle"
    :title="currentTheme === 'dark' ? 'Açık Mod\'a Geç' : 'Karanlık Mod\'a Geç'"
    @click="toggleTheme"
  >
    <i v-if="currentTheme === 'dark'" class="bi bi-sun-fill text-warning fs-5"></i>
    <i v-else class="bi bi-moon-stars-fill text-secondary fs-5"></i>
  </button>
</template>

<style scoped>
.theme-toggle-btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(125, 125, 125, 0.2);
  background: transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.theme-toggle-btn:hover {
  transform: rotate(15deg) scale(1.05);
  background: rgba(125, 125, 125, 0.1);
}
</style>