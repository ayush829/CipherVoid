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

### **3. Environment Variables (CRITICAL)**
Add these under the **Environment** tab in Render:

| Key | Value |
| :--- | :--- |
| **`PORT`** | `8080` |
| **`DB_URL`** | `jdbc:postgresql://<host>:5432/<db_name>` |
| **`DB_USERNAME`** | `postgres` |
| **`DB_PASSWORD`** | `<your-supabase-password>` |
| **`DB_DRIVER`** | `org.postgresql.Driver` |
| **`DB_DIALECT`** | `org.hibernate.dialect.PostgreSQLDialect` |

## 4. Deploy!
- Once you click **Create Web Service**, Render will build your Docker image and start the app.
- Open the **onrender.com** URL to see your vault live! ☯️✨
