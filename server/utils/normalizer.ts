import type { 
  NormalizedTrackingResult, 
  StandardPackageStatus, 
  TrackingEvent 
} from '~~/types/tracking';
import type { 
  FastCargoRawResponse, 
  GlobalLogisticsRawResponse, 
  LocalCarrierRawResponse, 
  AfterShipTrackingItem 
} from '~~/types/carriers';

export function normalizeFastCargo(raw: FastCargoRawResponse): NormalizedTrackingResult {
  const statusMap: Record<string, { status: StandardPackageStatus; text: string }> = {
    pending: { status: 'PREPARING', text: 'Hazırlanıyor' },
    in_transit: { status: 'IN_TRANSIT', text: 'Yolda' },
    hub: { status: 'AT_HUB', text: 'Dağıtım Merkezinde' },
    out_for_delivery: { status: 'OUT_FOR_DELIVERY', text: 'Dağıtımda' },
    delivered: { status: 'DELIVERED', text: 'Teslim Edildi' },
    failed: { status: 'EXCEPTION', text: 'Sorun Oluştu' },
  };

  const current = statusMap[raw.status] || { status: 'EXCEPTION', text: 'Bilinmiyor' };

  const events: TrackingEvent[] = raw.history.map((h, index) => ({
    id: `fast-${index}`,
    status: current.status,
    statusText: h.action,
    city: h.location,
    timestamp: h.date,
  }));

  return {
    carrier: 'HızlıKargo Express',
    carrierCode: 'mock_fast',
    trackingNumber: raw.shipment_code,
    status: current.status,
    statusText: current.text,
    currentLocation: raw.city,
    lastUpdated: raw.last_update,
    events,
  };
}

export function normalizeGlobalLogistics(raw: GlobalLogisticsRawResponse): NormalizedTrackingResult {
  const statusMap: Record<string, { status: StandardPackageStatus; text: string }> = {
    CREATED: { status: 'PREPARING', text: 'Hazırlanıyor' },
    TRANSIT: { status: 'IN_TRANSIT', text: 'Yolda' },
    SORTING: { status: 'AT_HUB', text: 'Dağıtım Merkezinde' },
    DISPATCH: { status: 'OUT_FOR_DELIVERY', text: 'Dağıtımda' },
    COMPLETED: { status: 'DELIVERED', text: 'Teslim Edildi' },
    ERROR: { status: 'EXCEPTION', text: 'Sorun Oluştu' },
  };

  const current = statusMap[raw.current_status] || { status: 'EXCEPTION', text: 'Bilinmiyor' };

  const events: TrackingEvent[] = raw.checkpoints.map((cp, idx) => {
    const cpStatus = statusMap[cp.status_code] || { status: 'IN_TRANSIT', text: cp.description };
    return {
      id: `global-${idx}`,
      status: cpStatus.status,
      statusText: cp.description,
      city: cp.place.city,
      timestamp: cp.checkpoint_time,
    };
  });

  return {
    carrier: 'Global Logistics Network',
    carrierCode: 'mock_global',
    trackingNumber: raw.waybill_id,
    status: current.status,
    statusText: current.text,
    currentLocation: raw.location.city,
    lastUpdated: raw.updated_at,
    events,
  };
}

export function normalizeLocalCarrier(raw: LocalCarrierRawResponse): NormalizedTrackingResult {
  const codeMap: Record<number, { status: StandardPackageStatus; text: string }> = {
    100: { status: 'PREPARING', text: 'Hazırlanıyor' },
    200: { status: 'IN_TRANSIT', text: 'Yolda' },
    300: { status: 'AT_HUB', text: 'Dağıtım Merkezinde' },
    400: { status: 'OUT_FOR_DELIVERY', text: 'Dağıtımda' },
    500: { status: 'DELIVERED', text: 'Teslim Edildi' },
    900: { status: 'EXCEPTION', text: 'Sorun Oluştu' },
  };

  const current = codeMap[raw.durum_kodu] || { status: 'EXCEPTION', text: 'Bilinmiyor' };

  const events: TrackingEvent[] = raw.hareketler.map((m, idx) => {
    const itemStatus = codeMap[m.islem_kodu] || { status: 'IN_TRANSIT', text: m.islem_adi };
    return {
      id: `local-${idx}`,
      status: itemStatus.status,
      statusText: m.islem_adi,
      city: m.sehir,
      timestamp: m.zaman,
    };
  });

  return {
    carrier: 'Yerel Dağıtım Kargo',
    carrierCode: 'mock_local',
    trackingNumber: raw.barkod_no,
    status: current.status,
    statusText: current.text,
    currentLocation: raw.bulundugu_il,
    lastUpdated: raw.guncellenme_tarihi,
    events,
  };
}

export function normalizeAfterShip(raw: AfterShipTrackingItem): NormalizedTrackingResult {
  const tagMap: Record<string, { status: StandardPackageStatus; text: string }> = {
    Pending: { status: 'PREPARING', text: 'Hazırlanıyor' },
    InfoReceived: { status: 'PREPARING', text: 'Kargo Bilgisi Alındı' },
    InTransit: { status: 'IN_TRANSIT', text: 'Yolda' },
    OutForDelivery: { status: 'OUT_FOR_DELIVERY', text: 'Dağıtımda' },
    Delivered: { status: 'DELIVERED', text: 'Teslim Edildi' },
    Exception: { status: 'EXCEPTION', text: 'Sorun Oluştu' },
    Expired: { status: 'EXCEPTION', text: 'Süre Aşımı' },
  };

  const current = tagMap[raw.tag] || { status: 'IN_TRANSIT', text: raw.subtag_message || 'İşlemde' };

  const events: TrackingEvent[] = (raw.checkpoints || []).map((cp, idx) => {
    const cpStatus = tagMap[cp.tag] || { status: 'IN_TRANSIT', text: cp.message };
    return {
      id: `as-${idx}`,
      status: cpStatus.status,
      statusText: cp.message || cpStatus.text,
      city: cp.city || cp.location || 'Konum Belirtilmedi',
      timestamp: cp.checkpoint_time || cp.created_at,
    };
  });

  return {
    carrier: raw.slug ? raw.slug.toUpperCase() : 'AfterShip Kargo',
    carrierCode: 'aftership',
    trackingNumber: raw.tracking_number,
    status: current.status,
    statusText: current.text,
    currentLocation: raw.city || (events.length > 0 ? events[events.length - 1].city : 'Belirtilmedi'),
    lastUpdated: raw.updated_at,
    events,
  };
}