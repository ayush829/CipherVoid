# Simple Render Deployment Guide (Cloud-Agnostic) 🚀

This project is now **Self-Contained**. The frontend is bundled inside the Java JAR, so you only need to deploy **one** Web Service on Render.

## 1. Prerequisites
- Your code pushed to **GitHub**.
- A **PostgreSQL** database (from Supabase or Neon).

## 2. Render Setup (Step-by-Step)
1.  **New → Web Service** → Connect your GitHub Repo.
2.  **Name:** `ciphervoid-vault` (or similar).
3.  **Environment:** `Docker`.
4.  **Region:** `Frankfurt (EU West)` or your preferred.
5.  **Plan:** `Free`.

### **3. Environment Variables (STANDARD NAMES)**
Add these under the **Environment** tab in Render. I have updated the code to use these "magic" names which are more stable:

| Key | Value |
| :--- | :--- |
| **`PORT`** | `8080` |
| **`SPRING_DATASOURCE_URL`** | `jdbc:postgresql://aws-1-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require` |
| **`SPRING_DATASOURCE_USERNAME`** | `postgres.aogmgakolrfwtenucqhs` |
| **`SPRING_DATASOURCE_PASSWORD`** | `Ciphervoid@25` |

> [!IMPORTANT]
> **Why 6543?** Supabase recently moved to IPv6. Using port `6543` (Connection Pooler) ensures your app can connect from Render's network without "Network is unreachable" errors.

## 4. Deploy!
- Once you click **Create Web Service**, Render will build your Docker image.
- Since I removed all local defaults, there is now **zero chance** of the old Oracle settings interfering.
