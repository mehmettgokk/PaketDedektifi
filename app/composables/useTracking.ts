// app/composables/useTracking.ts
import { ref } from 'vue';
import type { NormalizedTrackingResult, SearchHistoryItem } from '~~/types/tracking';

const STORAGE_KEY = 'paket_dedektifi_history_v1';

export const useTracking = () => {
  const trackingData = ref<NormalizedTrackingResult | null>(null);
  const isLoading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);
  const searchHistory = ref<SearchHistoryItem[]>([]);

  // Tarayıcı başlatıldığında LocalStorage'dan arama geçmişini yükler
  const initHistory = () => {
    if (import.meta.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            searchHistory.value = parsed;
          }
        }
      } catch (e) {
        console.error('Arama geçmişi yüklenirken hata oluştu:', e);
      }
    }
  };

  // Başarılı sorguyu geçmişe ekler (en fazla 10 kayıt)
  const saveToHistory = (result: NormalizedTrackingResult) => {
    if (!import.meta.client) return;

    const currentList = searchHistory.value || [];
    const filtered = currentList.filter(
      (item) => item.trackingNumber !== result.trackingNumber
    );

    const newItem: SearchHistoryItem = {
      trackingNumber: result.trackingNumber,
      carrierName: result.carrier,
      searchedAt: new Date().toISOString(),
      lastKnownStatus: result.status,
    };

    searchHistory.value = [newItem, ...filtered].slice(0, 10);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value));
  };

  // Arama geçmişini tamamen temizler
  const clearHistory = () => {
    searchHistory.value = [];
    if (import.meta.client) {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const trackPackage = async (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      errorMessage.value = 'Lütfen bir kargo takip numarası giriniz.';
      return;
    }

    isLoading.value = true;
    errorMessage.value = null;
    trackingData.value = null;

    try {
      const data = await $fetch<NormalizedTrackingResult>(`/api/track/${encodeURIComponent(cleanCode)}`);
      trackingData.value = data;
      saveToHistory(data);
    } catch (err: any) {
      errorMessage.value = err.data?.statusMessage || err.message || 'Kargo sorgulanırken beklenmeyen bir hata oluştu.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    trackingData,
    isLoading,
    errorMessage,
    searchHistory,
    initHistory,
    trackPackage,
    clearHistory,
  };
};