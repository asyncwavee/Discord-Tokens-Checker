const fs = require("fs");
const path = require("path");
const { Client } = require("discord.js-selfbot-v13");

// Chemins vers les fichiers
const tokenFilePath = path.join(__dirname, "Tokens", "token_list.txt");
const validTokenFilePath = path.join(__dirname, "Tokens", "valid_tokens.txt");

// Lire les tokens
const tokens = fs.readFileSync(tokenFilePath, "utf-8")
  .split(/\r?\n/)
  .map(t => t.trim())
  .filter(t => t.length > 0);

let current = 0;

// Fonction de test
async function checkToken(token) {
  return new Promise((resolve) => {
    const client = new Client();

    let resolved = false;

    client.on("ready", async () => {
      const msg = `✅ [${client.user.tag}] Token valide`;
      console.log(msg);
      fs.appendFileSync(validTokenFilePath, token + "\n"); // Sauvegarder
      resolved = true;
      await client.destroy();
      resolve({ token, valid: true });
    });

    client.on("rateLimit", async (info) => {
      console.warn("⏳ Ratelimit détecté, pause de 5s...");
      await new Promise(r => setTimeout(r, 5000));
    });

    client.on("error", () => {
      if (!resolved) {
        console.log(`❌ Token invalide`);
        resolved = true;
        resolve({ token, valid: false });
      }
    });

    client.login(token).catch((err) => {
      if (!resolved) {
         console.log(`❌ Token invalide : ${err.message}`);
        resolved = true;
        resolve({ token, valid: false });
      }
    });
  });
}

(async () => {
  console.log(`🔍 Début du test de ${tokens.length} tokens...`);

  for (const token of tokens) {
    current++;
    process.stdout.write(`[${current}/${tokens.length}] `);
    await checkToken(token);
  }

  console.log("✅ Vérification terminée.");
})();
