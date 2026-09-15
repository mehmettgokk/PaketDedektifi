import type { 
  FastCargoRawResponse, 
  GlobalLogisticsRawResponse, 
  LocalCarrierRawResponse 
} from '~~/types/carriers';

export const mockFastCargoDb: Record<string, FastCargoRawResponse> = {
  'FAST123456': {
    shipment_code: 'FAST123456',
    status: 'out_for_delivery',
    city: 'İstanbul',
    last_update: '2026-09-01T09:42:00Z',
    history: [
      { action: 'Kargo kabul edildi', location: 'Ankara', date: '2026-08-31T14:30:00Z' },
      { action: 'Transfer merkezinden ayrıldı', location: 'Ankara', date: '2026-08-31T22:10:00Z' },
      { action: 'Dağıtım merkezine ulaştı', location: 'İstanbul', date: '2026-09-01T06:15:00Z' },
      { action: 'Kurye dağıtıma çıktı', location: 'İstanbul', date: '2026-09-01T09:42:00Z' }
    ]
  }
};

export const mockGlobalLogisticsDb: Record<string, GlobalLogisticsRawResponse> = {
  'GLO987654': {
    waybill_id: 'GLO987654',
    current_status: 'TRANSIT',
    location: {
      city: 'Bursa',
      facility_code: 'HUB-16'
    },
    updated_at: '2026-09-01T08:20:00Z',
    checkpoints: [
      { status_code: 'CREATED', place: { city: 'İzmir' }, checkpoint_time: '2026-08-30T10:00:00Z', description: 'Paket şubeye teslim edildi' },
      { status_code: 'SORTING', place: { city: 'İzmir' }, checkpoint_time: '2026-08-30T19:30:00Z', description: 'Ana aktarma merkezine ulaştı' },
      { status_code: 'TRANSIT', place: { city: 'Bursa' }, checkpoint_time: '2026-09-01T08:20:00Z', description: 'Bursa transfer merkezine sevk edildi' }
    ]
  }
};

export const mockLocalCarrierDb: Record<string, LocalCarrierRawResponse> = {
  'TR555888': {
    barkod_no: 'TR555888',
    durum_kodu: 500,
    bulundugu_il: 'Eskişehir',
    guncellenme_tarihi: '2026-09-01T15:00:00Z',
    hareketler: [
      { islem_kodu: 100, islem_adi: 'Sipariş hazırlandı', sehir: 'Ankara', zaman: '2026-08-29T11:00:00Z' },
      { islem_kodu: 200, islem_adi: 'Kargo yola çıktı', sehir: 'Ankara', zaman: '2026-08-30T09:00:00Z' },
      { islem_kodu: 300, islem_adi: 'Şubeye ulaştı', sehir: 'Eskişehir', zaman: '2026-08-31T14:20:00Z' },
      { islem_kodu: 400, islem_adi: 'Dağıtıcı kuryede', sehir: 'Eskişehir', zaman: '2026-09-01T08:30:00Z' },
      { islem_kodu: 500, islem_adi: 'Alıcıya teslim edildi', sehir: 'Eskişehir', zaman: '2026-09-01T15:00:00Z' }
    ]
  }
};