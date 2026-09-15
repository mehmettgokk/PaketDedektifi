
export type StandardPackageStatus =     // Uygulama genelinde kabul edilen standart kargo durumları
  | 'PREPARING'        
  | 'IN_TRANSIT'       
  | 'AT_HUB'           
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED'        
  | 'EXCEPTION';       


export interface TrackingEvent {
  id: string;
  status: StandardPackageStatus;
  statusText: string;
  city: string;
  timestamp: string; 
  details?: string;
}

export interface NormalizedTrackingResult {
  carrier: string;
  carrierCode: 'mock_fast' | 'mock_global' | 'mock_local' | 'aftership';
  trackingNumber: string;
  status: StandardPackageStatus;
  statusText: string;
  currentLocation: string;
  lastUpdated: string;
  events: TrackingEvent[];
}

export interface SearchHistoryItem {
  trackingNumber: string;
  carrierName: string;
  searchedAt: string;
  lastKnownStatus: StandardPackageStatus;
}