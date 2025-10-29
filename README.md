# 📊 Moralis Portfolio Tracker

Modern ve kullanıcı dostu bir Ethereum wallet portföy takip uygulaması. Moralis API v2.2 kullanarak gerçek zamanlı kripto varlık verilerini görüntüler.

## ✨ Özellikler

- 🔍 **Wallet Adresi Arama**: Ethereum wallet adreslerini girerek portföy verilerini görüntüleme
- 💰 **Gerçek Zamanlı Veriler**: Moralis API ile güncel token fiyatları ve değerleri
- 📈 **24 Saatlik Değişim**: Token fiyatlarındaki günlük değişimleri takip etme
- 🎨 **Modern UI/UX**: Responsive ve kullanıcı dostu arayüz
- ⚡ **Hızlı Performans**: Optimize edilmiş React bileşenleri
- 🌙 **Dark/Light Theme**: Tema değiştirme özelliği
- 📱 **Responsive Design**: Mobil ve desktop uyumlu tasarım

## 🛠️ Teknolojiler

- **Frontend**: React 19.2.0
- **API**: Moralis Web3 API v2.2
- **Styling**: CSS3 ile custom styling
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Testing**: Jest & React Testing Library

## 🚀 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- Moralis API Key

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/akinkorpe/Simple-Portfolio-Tracer-With-Moralis.git
   cd Simple-Portfolio-Tracer-With-Moralis
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Environment variables ayarlayın**
   ```bash
   # .env dosyası oluşturun ve Moralis API key'inizi ekleyin
   REACT_APP_MORALIS_API_KEY=your_moralis_api_key_here
   ```

4. **Uygulamayı başlatın**
   ```bash
   npm start
   ```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

## 📖 Kullanım

1. **Wallet Adresi Girişi**: Ana sayfada bulunan input alanına geçerli bir Ethereum wallet adresi girin (0x ile başlayan 42 karakter)

2. **Portföy Görüntüleme**: "Fetch Asset" butonuna tıklayarak wallet'taki token'ları görüntüleyin

3. **Veri İnceleme**: Tabloda token logoları, isimleri, fiyatları, değerleri ve 24 saatlik değişimleri inceleyebilirsiniz

4. **Yeni Arama**: Farklı wallet adresleri için arama yapabilirsiniz

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Header.js       # Uygulama başlığı ve tema değiştirici
│   ├── WalletInput.js  # Wallet adresi giriş formu
│   ├── PortfolioTable.js # Token verilerini gösteren tablo
│   ├── LoadingSpinner.js # Yükleme animasyonu
│   ├── ErrorMessage.js # Hata mesajları
│   └── EmptyState.js   # Boş durum bileşeni
├── hooks/              # Custom React hooks
│   ├── usePortfolio.js # Portföy verilerini yönetme
│   └── useTheme.js     # Tema yönetimi
├── services/           # API servisleri
│   └── moralisService.js # Moralis API entegrasyonu
├── utils/              # Yardımcı fonksiyonlar
│   └── formatters.js   # Veri formatlama fonksiyonları
├── styles/             # CSS dosyaları
│   └── App.css        # Ana stil dosyası
└── constants/          # Sabit değerler
```

## 🔧 API Gereksinimleri

Bu uygulama Moralis Web3 API kullanır. Kullanmak için:

1. [Moralis](https://moralis.io/) hesabı oluşturun
2. API key alın
3. `.env` dosyasında `REACT_APP_MORALIS_API_KEY` değişkenini ayarlayın

### Kullanılan API Endpoints

- `/{address}/erc20` - ERC20 token'larını getirme
- Token metadata ve fiyat bilgileri

## 🧪 Test

```bash
# Testleri çalıştır
npm test

# Test coverage raporu
npm test -- --coverage
```

## 🏗️ Build

```bash
# Production build
npm run build
```

Build dosyaları `build/` klasöründe oluşturulacaktır.

## 🤝 Katkıda Bulunma

1. Bu repository'yi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

**Akın Körpe**
- GitHub: [@akinkorpe](https://github.com/akinkorpe)

## 🙏 Teşekkürler

- [Moralis](https://moralis.io/) - Web3 API sağladığı için
- [React](https://reactjs.org/) - Güçlü frontend framework'ü için
- [Create React App](https://create-react-app.dev/) - Hızlı başlangıç için

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
