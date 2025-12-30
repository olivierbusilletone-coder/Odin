import WalletConnectProvider from "@multiversx/sdk-wallet-connect-provider";

const connectBtn = document.getElementById("connectBtn");
const disconnectBtn = document.getElementById("disconnectBtn");
const statusEl = document.getElementById("status");
const addressEl = document.getElementById("address");
const qrContainer = document.getElementById("walletconnect");

if (!qrContainer) {
  console.error("❌ walletconnect container missing");
  throw new Error("walletconnect div not found");
}

let provider = null;

connectBtn.addEventListener("click", async () => {
  console.log("Connect wallet clicked");

  try {
    provider = new WalletConnectProvider(
      "https://bridge.walletconnect.org",
      {
        onClientLogin: async () => {
          const address = await provider.getAddress();
          statusEl.textContent = "Status : Connected";
          addressEl.textContent = address;
          connectBtn.style.display = "none";
          disconnectBtn.style.display = "inline-block";
        },
        onClientLogout: async () => {
          resetUI();
        }
      }
    );

    await provider.init();
    await provider.login({ qrCodeContainer: qrContainer });

  } catch (err) {
    console.error("WalletConnect error:", err);
  }
});

disconnectBtn.addEventListener("click", async () => {
  if (provider) {
    await provider.logout();
    resetUI();
  }
});

function resetUI() {
  statusEl.textContent = "Status : Not connected";
  addressEl.textContent = "";
  connectBtn.style.display = "inline-block";
  disconnectBtn.style.display = "none";
  qrContainer.innerHTML = "";
}
