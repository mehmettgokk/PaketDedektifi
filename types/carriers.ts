export interface FastCargoRawResponse {
  status: 'pending' | 'in_transit' | 'hub' | 'out_for_delivery' | 'delivered' | 'failed';
  city: string;
  shipment_code: string;
  last_update: string;
  history: Array<{
    action: string;
    location: string;
    date: string;
  }>;
}

export interface GlobalLogisticsRawResponse {
  current_status: 'CREATED' | 'TRANSIT' | 'SORTING' | 'DISPATCH' | 'COMPLETED' | 'ERROR';
  location: {
    city: string;
    facility_code: string;
  };
  waybill_id: string;
  updated_at: string;
  checkpoints: Array<{
    status_code: string;
    place: { city: string };
    checkpoint_time: string;
    description: string;
  }>;
}

export interface LocalCarrierRawResponse {
  durum_kodu: 100 | 200 | 300 | 400 | 500 | 900;
  bulundugu_il: string;
  barkod_no: string;
  guncellenme_tarihi: string;
  hareketler: Array<{
    islem_kodu: number;
    islem_adi: string;
    sehir: string;
    zaman: string;
  }>;
}

export interface AfterShipTrackingItem {
  tracking_number: string;
  slug: string;
  tag: 'Pending' | 'InfoReceived' | 'InTransit' | 'OutForDelivery' | 'Delivered' | 'Exception' | 'Expired';
  subtag_message: string;
  city: string | null;
  updated_at: string;
  checkpoints: Array<{
    created_at: string;
    slug: string;
    checkpoint_time: string;
    city: string | null;
    tag: string;
    message: string;
    location: string | null;
  }>;
}

export interface AfterShipApiResponse {
  meta: {
    code: number;
    message: string;
  };
  data: {
    tracking: AfterShipTrackingItem;
  };
}