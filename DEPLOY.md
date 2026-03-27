# Deployment Guide: CipherVoid One-Click Deploy

I have optimized the project so that the **Backend and Frontend run together** as a single application. This means you only need to deploy **one file** (the JAR) to get your link!

## 🏁 Pre-Deployment Checkpoints (CRITICAL)

Before you build the final file, you **MUST** do these three things:

1.  **Sync the Frontend:**
    Everything you see in the `Frontend/` folder has been copied to `src/main/resources/static/`. (I have already done this for you).
2.  **Verify Database:**
    Check `src/main/resources/application.properties`. Ensure your Oracle connection is correct.
3.  **Run Final Package:**
    Run this command in IntelliJ terminal:
    ```bash
    .\mvnw.cmd clean package -DskipTests
    ```

---

## 🚀 Recommended: Koyeb (Zero-Tension, Free Forever)

If you want a link that stays live **forever** without worrying about "credits" or "money," use **Koyeb**.

### **Steps for Koyeb:**
1.  **GitHub:** Upload your project to your GitHub account.
2.  **Create Account:** Go to [Koyeb.com](https://www.koyeb.com) and sign up.
3.  **New Service:** Click **"Create Service"** -> **"GitHub"**.
4.  **Configuration:**
    -   Select your **CipherVoid** repository.
    -   **Build command:** `mkdir -p target && cp *.jar target/` (Or just leave it as default if you upload the JAR).
    -   **Run command:** `java -jar target/passwordmanager-0.0.1-SNAPSHOT.jar`
    -   **Port:** Set it to **8080**.
5.  **Deploy:** Click "Deploy" and they will give you a permanent link (e.g., `https://ciphervoid-ayush.koyeb.app`).

---

## 📦 Alternative: Railway.app (Fastest Setup)

If you want to be live in 1 minute and don't mind a trial limit:
1.  Connect GitHub to [Railway.app](https://railway.app).
2.  It will automatically detect the JAR and deploy.
3.  **Note:** It uses a $5 trial credit system.

---

### Landing Page
After deployment, your vault will be live at your custom domain. The system is designed to work on **any** URL automatically!
