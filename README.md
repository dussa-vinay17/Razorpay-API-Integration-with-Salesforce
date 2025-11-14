# Razorpay-API-Integration-with-Salesforce
💳⚡ Razorpay + Salesforce Payment Integration
A simple and effective implementation of Razorpay Checkout inside Salesforce Lightning using Apex + LWC + Visualforce.

🚀 Overview

This project integrates Razorpay Checkout into Salesforce using:
1. Apex → Creates orders via /v1/orders
2. LWC → Loads UI + receives success message
3. Visualforce → Hosts Razorpay Checkout inside iFrame
4. PostMessage → Communication between VF → LWC
5. Industry-ready and works for UPI, Cards, Net Banking, Wallets.

🔄 Payment Flow

1. User clicks Pay in Salesforce  
2. Apex sends POST /v1/orders to Razorpay  
3. Razorpay returns Order ID  
4. LWC receives Order ID and loads Checkout JS  
5. VF opens Razorpay Checkout  
6. User completes payment  
7. Payment success callback sent to VF  
8. VF sends message to LWC  
9. LWC updates UI + stores payment info

🧩 Project Structure

/force-app
   /main
     /classes
         RazorpayOrderService.cls
         RazorpayOrderService.cls-meta.xml

     /lwc
         razorpayPayment
            razorpayPayment.js
            razorpayPayment.html
            razorpayPayment.js-meta.xml

     /pages
         RazorpayCheckoutVF.page
         RazorpayCheckoutVF.page-meta.xml

🔑 Prerequisites

1. Salesforce Developer Org
2. Razorpay Account (Test or Live Mode)
3. API Keys (KEY_ID + KEY_SECRET)
4. Visualforce + LWC enabled

🛠️ Steps to Implement

1️⃣ Create Razorpay Test Keys
    Dashboard → API Keys → Generate Test Key
    Use these values in your Apex class.

2️⃣ Create Apex Class (Order Creation)
    Apex sends order request to Razorpay and returns the Order ID.

3️⃣ Create Visualforce Page
    VF loads Razorpay Checkout inside iframe.

4️⃣ Create LWC
    LWC calls Apex → gets Order ID → tells VF to initiate checkout.

5️⃣ Handle Payment Success
    VF listens for Razorpay callback and sends message to LWC via postMessage.
    LWC shows Payment Successful and optionally saves data to Salesforce.

📦 Supported Payment Modes
    1. UPI
    2. Credit/Debit Cards
    3. Net Banking
    4. Wallets

📚 Use Cases
    1. E-commerce inside Salesforce
    2. Event ticketing
    3. Donation apps
    4. Subscription-based systems
    5. Order management payments

 📝 Notes
    1. Test Mode works without real money
    2. Live Mode requires website verification
    3. Razorpay review time: 24–48 hours
    4. You can test with ₹1–₹10 after Live approval   

 📥 Clone This Repo
     git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

 🤝 Contributions
     Feel free to fork, improve and submit PRs.

  ⭐ Support
     If this helped you, please ⭐ the repo!

     


    




