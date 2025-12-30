// main.js
import QRCode from "qrcode";
import { WalletConnectV2Provider } from "@multiversx/sdk-wallet-connect-provider";

// Sélection des éléments DOM
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const qrContainer = document.getElementById("MyWalletConnectQRContainer");

// ⚠️ Remplacez par votre Project ID WalletConnect 2.0
const projectId = "f4f84c031236a02d1fda5167859868f4";
const relayUrl = "wss://relay.walletconnect.com";
const chainId = "T"; // Testnet

// Callbacks pour login/logout
const callbacks = {
  onClientLogin: async function () {
    const address = await provider.getAddress();
    statusEl.textContent = "Status: Connected";
    addressEl.textContent = "Address: " + address;
    connectBtn.style.display = "none";
    disconnectBtn.style.display = "inline-block";
    qrContainer.innerHTML = "";
  },
  onClientLogout: async function () {
    statusEl.textContent = "Status: Not connected";
    addressEl.textContent = "";
    connectBtn.style.display = "inline-block";
    disconnectBtn.style.display = "none";
  }
};

// Instanciation du provider
const provider = new WalletConnectV2Provider(callbacks, chainId, relayUrl, projectId);

// Fonction pour afficher le QR code
async function showQR(uri) {
  const svg = await QRCode.toString(uri, { type: "svg" });
  qrContainer.innerHTML = svg;
}

// Gestion du click Connect Wallet
connectBtn.addEventListener("click", async () => {
  try {
    await provider.init();
    const { uri, approval } = await provider.connect();
    await showQR(uri);
    await provider.login({ approval });
  } catch (e) {
    console.error("Erreur WalletConnect:", e);
    alert("Erreur WalletConnect : " + e.message);
  }
});

// Gestion du click Disconnect
disconnectBtn.addEventListener("click", async () => {
  await provider.logout();
});
