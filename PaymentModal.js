
class PaymentModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('.close').addEventListener('click', () => this.close());
    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
  }

  render() {
    const { title, price } = this.product;
    const priceInUSDT = (price / 80).toFixed(2);

    this.shadowRoot.innerHTML = `
      <style>
        .modal {
          position: fixed; z-index: 1000; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center;
        }
        .modal-content {
          background: var(--surface-color); padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px var(--shadow-color); width: 90%; max-width: 500px; text-align: center;
        }
        .close {
          position: absolute; top: 1rem; right: 1rem; font-size: 1.5rem; color: var(--text-color); cursor: pointer; transition: color 0.3s ease;
        }
        .close:hover { color: var(--primary-color); }
        h2 { margin-top: 0; color: var(--primary-color); }
        form { display: flex; flex-direction: column; }
        input {
          padding: 0.75rem; margin-bottom: 1rem; border-radius: 8px; border: 1px solid #ccc; font-size: 1rem;
        }
        button {
          background-color: var(--primary-color); color: white; padding: 0.85rem; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        button:hover { background-color: var(--secondary-color); }
        .qr-code, .payment-status { text-align: center; margin-top: 1.5rem; }
        .qr-code img { max-width: 200px; margin: 1rem auto; }
        .status-buttons { margin-top: 1rem; display: flex; justify-content: center; gap: 1rem; }
        .status-buttons button { padding: 0.5rem 1rem; font-size: 0.9rem; }
        .success-msg { color: #28a745; font-weight: bold; font-size: 1.2rem; }
        .failed-msg { color: #dc3545; font-weight: bold; font-size: 1.2rem; }
        .usdt-price { font-size: 1rem; color: #666; }
      </style>
      <div class="modal">
        <div class="modal-content">
          <span class="close">&times;</span>
          <h2>Complete Your Purchase</h2>
          <p>You are buying: <strong>${title}</strong> for <strong>₹${price}</strong> <span class="usdt-price">(${priceInUSDT} USDT)</span></p>
          
          <div id="initial-step">
            <form>
              <input type="text" id="upiId" placeholder="Enter your UPI ID (optional)">
              <button type="submit">Proceed to Pay</button>
            </form>
          </div>

          <div id="payment-step" style="display: none;">
            <div class="qr-code">
              <p>Scan the QR code with your UPI app</p>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=mistersingh6-1@oksbi&pn=CodeCraftMarketing&am=${price}&cu=INR&tn=Payment for ${encodeURIComponent(title)}" alt="UPI QR Code">
              <p><strong>Or pay to UPI ID:</strong> mistersingh6-1@oksbi</p>
            </div>
            <div class="payment-simulation">
                <p>This is a simulated payment. Click a button below to see the result.</p>
                <div class="status-buttons">
                    <button id="sim-success">Simulate Payment Success</button>
                    <button id="sim-fail">Simulate Payment Failure</button>
                </div>
            </div>
          </div>

          <div id="status-step" style="display: none;" class="payment-status"></div>

        </div>
      </div>
    `;

    this.shadowRoot.querySelector('#sim-success').addEventListener('click', () => this.showStatus(true));
    this.shadowRoot.querySelector('#sim-fail').addEventListener('click', () => this.showStatus(false));
  }

  close() {
    this.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.shadowRoot.querySelector('#initial-step').style.display = 'none';
    this.shadowRoot.querySelector('#payment-step').style.display = 'block';
  }

  showStatus(isSuccess) {
    const statusStep = this.shadowRoot.querySelector('#status-step');
    if (isSuccess) {
      statusStep.innerHTML = `<p class="success-msg">Payment Successful!</p><p>Your product will be delivered shortly.</p>`;
    } else {
      statusStep.innerHTML = `<p class="failed-msg">Payment Failed</p><p>Please try again or contact support.</p>`;
    }
    this.shadowRoot.querySelector('#payment-step').style.display = 'none';
    statusStep.style.display = 'block';

    setTimeout(() => this.close(), 3000);
  }
}

customElements.define('payment-modal', PaymentModal);
