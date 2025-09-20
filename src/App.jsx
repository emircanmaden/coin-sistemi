import { useState } from 'react'
import './App.css'

function App() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [userCoins, setUserCoins] = useState(286055000)
  const [username, setUsername] = useState('username')
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [customAmount, setCustomAmount] = useState('')

  const coinPackages = [
    { coins: 70, price: 0.74 },
    { coins: 350, price: 3.7 },
    { coins: 700, price: 7.4 },
    { coins: 1400, price: 14.8 },
    { coins: 3500, price: 37 },
    { coins: 7000, price: 74 },
    { coins: 17500, price: 185 },
    { coins: 'Custom', price: 'Large amount supported' }
  ]

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg)
    if (pkg.coins === 'Custom') {
      setShowCustomModal(true)
    } else {
      setShowPaymentModal(true)
    }
  }

  const handlePayment = () => {
    setShowPaymentModal(false)
    setShowSuccessModal(true)
    if (selectedPackage.coins !== 'Custom') {
      setUserCoins(prev => prev + (selectedPackage.coins * 1000))
    }
  }

  const handleGoBack = () => {
    setShowSuccessModal(false)
    setSelectedPackage(null)
  }

  const handleCustomSubmit = () => {
    if (customAmount && customAmount > 0) {
      const customPackage = {
        coins: parseInt(customAmount),
        price: (parseInt(customAmount) * 0.0105714) // 17500 coin = $185 hesabına göre
      }
      setSelectedPackage(customPackage)
      setShowCustomModal(false)
      setShowPaymentModal(true)
    }
  }

  const handleUsernameEdit = () => {
    setIsEditingUsername(true)
  }

  const handleUsernameSubmit = (e) => {
    if (e.key === 'Enter') {
      setIsEditingUsername(false)
    }
  }

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <button className="back-btn">←</button>
        <h1 className="title">Get Coins</h1>
      </div>

      {/* User Profile Section */}
      <div className="profile-section">
        <div className="dynamic-badge">
          <span className="dynamic-text">Dynamic</span>
          <span className="plus-icon">+</span>
          <div className="coins-display">
            <span className="diamond-icon">💎</span>
            <span className="coins-count">2,73K</span>
          </div>
        </div>

        <div className="user-info">
          <div className="tiktok-logo">
            <img src="https://i.hizliresim.com/9rbakal.png" alt="TikTok" className="tiktok-icon" />
          </div>
          <div className="user-details">
            <span className="recharge-label">Recharge</span>
            <div className="coin-balance">
              <span className="coin-icon">🪙</span>
              <span className="balance">{userCoins.toLocaleString()}</span>
            </div>
          </div>
          <button className="dropdown-btn">▼</button>
        </div>

        <div className="username" onClick={handleUsernameEdit}>
          {isEditingUsername ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleUsernameSubmit}
              onBlur={() => setIsEditingUsername(false)}
              className="username-input"
              autoFocus
            />
          ) : (
            <span>@{username}</span>
          )}
        </div>
        
        <div className="recharge-info">
          <div className="status-dot"></div>
          <span className="recharge-text">Recharge:</span>
        </div>
        
        <div className="savings-info">
          Save around 25% with a lower third-party service fee
          <span className="info-icon">ℹ️</span>
        </div>
      </div>

      {/* Coin Packages Grid */}
      <div className="packages-grid">
        {coinPackages.map((pkg, index) => (
          <div
            key={index}
            className={`package-card ${pkg.coins === 'Custom' ? 'custom-package' : ''}`}
            onClick={() => handlePackageSelect(pkg)}
          >
            <div className="coin-info">
              <span className="coin-icon">🪙</span>
              <span className="coin-amount">
                {pkg.coins === 'Custom' ? 'Custom' : pkg.coins.toLocaleString()}
              </span>
            </div>
            <div className="price-info">
              {pkg.coins === 'Custom' ? (
                <span className="custom-text">Large amount supported</span>
              ) : (
                <span className="price">${pkg.price}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <h3>Payment Details</h3>
            <div className="selected-package">
              <span className="coin-icon">🪙</span>
              <span>{selectedPackage.coins} Coins</span>
            </div>
            <div className="payment-methods">
              <div className="payment-icons">
                <div className="payment-icon visa"></div>
                <div className="payment-icon mastercard"></div>
                <div className="payment-icon amex"></div>
                <div className="payment-icon jcb"></div>
                <div className="payment-icon diners"></div>
                <div className="payment-icon discover"></div>
                <div className="payment-icon paypal"></div>
              </div>
            </div>
            <div className="total-section">
              <span className="total-label">Total</span>
              <span className="total-amount">${selectedPackage.price.toFixed(2)}</span>
            </div>
            <button className="recharge-btn" onClick={handlePayment}>
              Recharge
            </button>
          </div>
        </div>
      )}

      {/* Custom Amount Modal */}
      {showCustomModal && (
        <div className="modal-overlay">
          <div className="custom-modal">
            <h3>Custom Amount</h3>
            <p>Enter the amount of coins you want to purchase:</p>
            <div className="price-info-custom">
              <span>Price per coin: $0.0106</span>
            </div>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter coin amount"
              className="custom-input"
            />
            {customAmount && customAmount > 0 && (
              <div className="estimated-price">
                <span>Estimated price: ${(customAmount * 0.0105714).toFixed(2)}</span>
              </div>
            )}
            <div className="modal-buttons">
              <button 
                className="cancel-btn" 
                onClick={() => setShowCustomModal(false)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn" 
                onClick={handleCustomSubmit}
                disabled={!customAmount || customAmount <= 0}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h3>Payment Completed</h3>
            <p>You recharged {selectedPackage.coins.toLocaleString()} Coins. You can use Coins to send virtual Gifts.</p>
            <button className="go-back-btn" onClick={handleGoBack}>
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
