# 🚀 Deploying CipherVoid to Render with Supabase

This is the final, permanent way to host your vault. It uses **PostgreSQL** in the cloud (Supabase) and **Docker** on Render.

### **Step 1: Get your Cloud Database (Supabase)**
1.  Go to **[Supabase.com](https://supabase.com/)** and sign up with GitHub.
2.  Create a project named `CipherVoid-Vault`.
3.  Go to **Settings** (Gear icon) -> **Database**.
4.  Find **Connection string** and click the **JDBC** tab.
5.  **Copy the URL**. It will look like: `jdbc:postgresql://db.xxxx.supabase.co:5432/postgres`
    *   **IMPORTANT:** Remember the password you set for the database!

### **Step 2: Update GitHub**
Run these commands in your project folder to upload the new cloud settings:
```powershell
git add .
git commit -m "Cloud-Ready with PostgreSQL support"
git push origin main
```

### **Step 3: Deploy on Render**
1.  Go to **[Dashboard.render.com](https://dashboard.render.com/)**.
2.  Click **New +** -> **Web Service**.
3.  Connect your GitHub repository: `ayush829/CpherVoid-Vault`.
4.  **Runtime:** Select **Docker**.
5.  Click **Advanced** -> **Add Environment Variable** and add these 3:
    *   **`SPRING_DATASOURCE_URL`**: (Paste your JDBC URL from Supabase)
    *   **`SPRING_DATASOURCE_USERNAME`**: `postgres` (unless you changed it)
    *   **`SPRING_DATASOURCE_PASSWORD`**: (Your Supabase DB password)
6.  Click **Create Web Service**.

---

### **🛡️ Why this is the "Best Way":**
- **Permanent:** Your data will never disappear.
- **Zero Configuration:** No IP bridge or tunnels needed.
- **Auto-Sync:** Every time you push to GitHub, Render will update your site automatically!
