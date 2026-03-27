# Getting your Live Link with Ngrok (Zero tension!)

Since cloud providers ask for credit cards, **Ngrok** is the best alternative. It takes your local project and gives it a public URL that anyone can visit.

### **Step 1: Start your CipherVoid Project**
- In IntelliJ, click **"Run"** on your Spring Boot application.
- Make sure it says `Started RevPasswordManagerApplication in X seconds`.
- You can still visit it at `http://localhost:8080`.

### **Step 2: Install Ngrok (Fastest Way)**
1. Go to **[ngrok.com](https://ngrok.com/download)** and download the Windows `.zip`.
2. Extract the `ngrok.exe` file and put it in your project folder (or just on your Desktop).

### **Step 3: Connect your Account (Free)**
1. Signup at [ngrok.com](https://dashboard.ngrok.com/signup) (No card needed).
2. Copy your **Auth Token** from the dashboard.
3. Open terminal/cmd in the same folder where `ngrok.exe` is and run:
   ```bash
   ngrok config add-authtoken YOUR_TOKEN_HERE
   ```

### **Step 4: Get your Link!**
Run this command:
```bash
ngrok http 8080
```

### **Step 5: Share your Link**
Ngrok will show a black screen. Look for the link under **"Forwarding"**. 
Example: `https://a1b2-c3d4-e5f6.ngrok-free.app`
**This is your live link!** Anyone can visit it as long as your laptop is on and the terminal is open.

---

### **🛡️ Pros of this method:**
- **Zero Configuration:** No database changes needed.
- **Real Oracle:** Uses your actual local Oracle DB.
- **Fast:** Takes 2 minutes.
