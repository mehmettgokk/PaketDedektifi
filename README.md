# Paket Dedektifi

Farklı kargo firmalarından gelen takip verilerini tek ekranda toplayan kargo takip uygulaması.

Her kargo firması takip bilgisini farklı bir formatta döner. Paket Dedektifi bu farklı yapıları sunucu tarafında ortak bir modele dönüştürür ve kullanıcıya tek bir zaman çizelgesi olarak sunar.

**Canlı Demo:** https://paket-dedektifi-indol.vercel.app

## Özellikler

- Tek arama kutusundan birden fazla kargo sağlayıcısında sorgulama
- Farklı formatlardaki firma verilerinin ortak bir modele normalize edilmesi
- Kargo hareketlerinin kronolojik zaman çizelgesi olarak gösterimi
- Son 10 aramanın tarayıcıda saklanması (arama geçmişi)
- Karanlık / aydınlık tema desteği
- AfterShip API anahtarı tanımlandığında gerçek kargoların canlı takibi

## Demo Takip Numaraları

Uygulama üç farklı mock kargo firması içerir. Aşağıdaki numaralarla test edebilirsiniz:

| Takip No     | Firma                    | Durum         |
| ------------ | ------------------------ | ------------- |
| `FAST123456` | HızlıKargo Express       | Dağıtımda     |
| `GLO987654`  | Global Logistics Network | Yolda         |
| `TR555888`   | Yerel Dağıtım Kargo      | Teslim Edildi |

## Teknolojiler

- Nuxt 4 / Vue 3
- TypeScript
- Bootstrap 5
- Vercel

## Kurulum

```bash
git clone https://github.com/mehmettgokk/PaketDedektifi.git
cd PaketDedektifi
pnpm install
pnpm dev
```

Uygulama `http://localhost:3000` adresinde çalışır.

Diğer komutlar:

```bash
pnpm build     # üretim derlemesi
pnpm preview   # derlemeyi yerelde önizle
```

## Ortam Değişkenleri

Canlı kargo takibi için opsiyonel olarak AfterShip API anahtarı tanımlayabilirsiniz. Proje kökünde `.env` dosyası oluşturun:

```
NUXT_AFTERSHIP_API_KEY=api_anahtariniz
```

Anahtar yoksa uygulama yalnızca mock sağlayıcılarla çalışır.

## Vercel'e Dağıtım

Proje Vercel üzerinde yayındadır; `main` dalına yapılan her push otomatik olarak dağıtılır. Yapılandırma `vercel.json` dosyasındadır.

Kendi kopyanızı dağıtmak için:

```bash
npm i -g vercel
vercel --prod
```

AfterShip entegrasyonu için Vercel panelinden **Settings → Environment Variables** altına `NUXT_AFTERSHIP_API_KEY` ekleyin.

## API

`GET /api/track/:code`

Takip numarasını tüm sağlayıcılarda arar ve normalize edilmiş sonucu döner.

```bash
curl https://paket-dedektifi-indol.vercel.app/api/track/FAST123456
```

Numara bulunamazsa `404`, boş gönderilirse `400` döner.

## Proje Yapısı

```
app/
  pages/          # index, history, supported-carriers
  components/     # TrackingTimeline, TrackingStatusBadge, ThemeToggle
  composables/    # useTracking, useTheme
server/
  api/track/      # takip endpoint'i
  data/           # mock firma verileri
  utils/          # normalizasyon fonksiyonları
types/            # ortak tipler
```
