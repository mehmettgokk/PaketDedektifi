import { 
  mockFastCargoDb, 
  mockGlobalLogisticsDb, 
  mockLocalCarrierDb 
} from '~~/server/data/mockDatabase';
import { 
  normalizeFastCargo, 
  normalizeGlobalLogistics, 
  normalizeLocalCarrier, 
  normalizeAfterShip 
} from '~~/server/utils/normalizer';
import type { AfterShipApiResponse } from '~~/types/carriers';

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, 'code')?.trim().toUpperCase();

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Lütfen geçerli bir kargo takip numarası giriniz.',
    });
  }

  // 1. Mock Servis: HızlıKargo Kontrolü
  if (mockFastCargoDb[code]) {
    return normalizeFastCargo(mockFastCargoDb[code]);
  }

  // 2. Mock Servis: Global Logistics Kontrolü
  if (mockGlobalLogisticsDb[code]) {
    return normalizeGlobalLogistics(mockGlobalLogisticsDb[code]);
  }

  // 3. Mock Servis: Yerel Dağıtım Kontrolü
  if (mockLocalCarrierDb[code]) {
    return normalizeLocalCarrier(mockLocalCarrierDb[code]);
  }

  const config = useRuntimeConfig(event);
  const apiKey = config.aftershipApiKey;

  if (apiKey) {
    try {
      const response = await $fetch<AfterShipApiResponse>(
        `https://api.aftership.com/tracking/2024-04/trackings/${encodeURIComponent(code)}`,
        {
          headers: {
            'as-api-key': apiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response?.data?.tracking) {
        return normalizeAfterShip(response.data.tracking);
      }
    } catch (apiError: any) {
      console.warn(`AfterShip API isteği başarısız (${code}):`, apiError?.message);
    }
  }

  // Hiçbir sağlayıcıda eşleşme bulunamazsa anlaşılır 404 hatası döndür
  throw createError({
    statusCode: 404,
    statusMessage: `"${code}" numaralı kargo hiçbir kargo sağlayıcısında bulunamadı. Lütfen numarayı kontrol ediniz.`,
  });
});