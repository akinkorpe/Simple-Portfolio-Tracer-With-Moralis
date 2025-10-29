# 📊 Moralis Portfolio Tracker

A modern and user-friendly Ethereum wallet portfolio tracking application. Displays real-time crypto asset data using Moralis API v2.2.

## ✨ Features

- 🔍 **Wallet Address Search**: View portfolio data by entering Ethereum wallet addresses
- 💰 **Real-Time Data**: Current token prices and values via Moralis API
- 📈 **24-Hour Changes**: Track daily changes in token prices
- 🎨 **Modern UI/UX**: Responsive and user-friendly interface
- ⚡ **Fast Performance**: Optimized React components
- 🌙 **Dark/Light Theme**: Theme switching capability
- 📱 **Responsive Design**: Mobile and desktop compatible design

## 🛠️ Technologies

- **Frontend**: React 19.2.0
- **API**: Moralis Web3 API v2.2
- **Styling**: Custom styling with CSS3
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Testing**: Jest & React Testing Library

## 🚀 Installation

### Requirements

- Node.js (v16 or higher)
- npm or yarn
- Moralis API Key

### Steps

1. **Clone the project**
   ```bash
   git clone https://github.com/akinkorpe/Simple-Portfolio-Tracer-With-Moralis.git
   cd Simple-Portfolio-Tracer-With-Moralis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file and add your Moralis API key
   REACT_APP_MORALIS_API_KEY=your_moralis_api_key_here
   ```

4. **Start the application**
   ```bash
   npm start
   ```

The application will run at [http://localhost:3000](http://localhost:3000).

## 📖 Usage

1. **Wallet Address Input**: Enter a valid Ethereum wallet address (42 characters starting with 0x) in the input field on the main page

2. **Portfolio Display**: Click the "Fetch Asset" button to display tokens in the wallet

3. **Data Review**: You can examine token logos, names, prices, values, and 24-hour changes in the table

4. **New Search**: You can search for different wallet addresses

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.js       # Application header and theme switcher
│   ├── WalletInput.js  # Wallet address input form
│   ├── PortfolioTable.js # Table displaying token data
│   ├── LoadingSpinner.js # Loading animation
│   ├── ErrorMessage.js # Error messages
│   └── EmptyState.js   # Empty state component
├── hooks/              # Custom React hooks
│   ├── usePortfolio.js # Portfolio data management
│   └── useTheme.js     # Theme management
├── services/           # API services
│   └── moralisService.js # Moralis API integration
├── utils/              # Utility functions
│   └── formatters.js   # Data formatting functions
├── styles/             # CSS files
│   └── App.css        # Main style file
└── constants/          # Constants
```

## 🔧 API Requirements

This application uses Moralis Web3 API. To use it:

1. Create a [Moralis](https://moralis.io/) account
2. Get an API key
3. Set the `REACT_APP_MORALIS_API_KEY` variable in the `.env` file

### Used API Endpoints

- `/{address}/erc20` - Fetching ERC20 tokens
- Token metadata and price information

## 🧪 Testing

```bash
# Run tests
npm test

# Test coverage report
npm test -- --coverage
```

## 🏗️ Build

```bash
# Production build
npm run build
```

Build files will be created in the `build/` folder.

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push your branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## 👨‍💻 Developer

**Akın Körpe**
- GitHub: [@akinkorpe](https://github.com/akinkorpe)

## 🙏 Acknowledgments

- [Moralis](https://moralis.io/) - For providing Web3 API
- [React](https://reactjs.org/) - For the powerful frontend framework
- [Create React App](https://create-react-app.dev/) - For quick start

---

⭐ Don't forget to star this project if you liked it!
