# 🧵 fabrIQ — Full-Stack AI-Powered eCommerce Platform

The future of fashion is personalization, and our **FabrIQ**. An e-commerce platform is set to redefine
how customers and businesses interact. By combining artificial intelligence with e-commerce, we enable
users to create, customize, and purchase unique apparel effortlessly, while allowing fashion brands 
whether startups or established companies to sell directly to their customers without intermediaries.

---

## 🚀 Why fabrIQ?

With AI-driven personalization and direct brand-to-customer engagement, this platform is not just an ecommerce marketplace it’s a fashion revolution. Companies of all sizes can interact with their buyers,
create exclusive designs, and maximize profits without relying on third-party retailers.

This is where technology meets creativity, and fashion meets the future.

---

## 💼 Built For Businesses & Customers Alike

### 🛍 Customer-Centric Features

- 🧾 **Product Catalog** with categories, tags, materials, colors, availability
- 🔍 **Smart Search & Filtering**
- ❤️ **Wishlist**, Save for Later, Recently Viewed
- 🛒 **Shopping Cart** with quantity updates and live price recalculations
- 💳 **Secure Checkout** with PayFast support
- 📦 **Order Tracking** with status updates via email
- 🔒 **JWT-Based Auth** with Refresh Tokens
- ✅ **Email Verification on Signup** with secure token flow
- 🔐 **Password Reset Flow** (email + token)
- 🧠 **AI-Powered Cusom Mercahndise** Clothing for you by You

---

### 🏬 Business-Focused Features

- 📊 **Admin Dashboard** (Sales, Revenue, Conversion Rate, Inventory Levels)
- 🛠 **Product Management Suite**
  - Add/edit/delete products
- 📦 **Order Management**
  - Fulfillment tracking
  - Status updates
- 👥 **Customer Insights**
  - Purchase history
  - Engagement stats
- 📈 **Revenue Reporting**
  - Weekly/Monthly metrics
- 🧠 **AI Tools for Merchants**
  - AI based Product Design Generations
- 🔐 **Role-Based Access**
  - Admin / Staff / Customer segregation

---

## ⚙️ Tech Stack

| Layer         | Technology                            |
|---------------|----------------------------------------|
| **Frontend**  | React / three.js / React-three Fibre with Tailwind CSS      |
| **Backend**   | Node.js / Express       |
| **Database**  | mySQL                   |
| **Auth**      | JWT + Refresh Tokens + Email Tokens    |
| **Email**     | SMTP           |
| **AI Layer**  | Hugging Face   |
| **Payments**  | PayFast                        |


---

## 🛠️ Getting Started

### 1. Clone the Repository

````
git clone https://github.com/EbadTahirKhan/FabrIQ.git
cd FabrIQ
````

### 2. Install Dependencies

```bash
# Client
cd frontend
npm install

# Server
cd ../backend
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in `/backend` and configure:

```
# App
PORT=8080
BASE_URL=http://localhost:8080/
BACKEND_URL = "http://localhost:8080"

# MySQL Database Online
MYSQL_HOST=bbccqtoxz93qxyybubf7-mysql.services.clever-cloud.com
MYSQL_USER=uur6es8iknpqloqe
MYSQL_PASS=9sAdOzEvgHjK1U6sqnkF
MYSQL_DB=bbccqtoxz93qxyybubf7

# JWT
JWTPRIVATEKEY= (get your personal key)

# Bcrypt
SALT= (any)

HOST=smtp.yourmailprovider.com
SERVICE=gmail
EMAIL_PORT=587
SECURE=false
USER=(we are not disclosing the fabrIQ email)@gmail.com
PASS= (email passwort here)

HF_API_TOKEN=(sign up at hugging face and get an api token for free)

# AWS S3 Configuration
AWS_ACCESS_KEY_ID= (get your own)
AWS_SECRET_ACCESS_KEY=(get your own)
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=(get your own)
AWS_S3_BUCKET_URL=(get your own)


PAYFAST_MERCHANT_ID=	(get your own by signing in on PayFast)
PAYFAST_MERCHANT_KEY=(get your own)
PAYFAST_PASSPHRASE=(get your own)
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8080
```

### 4. Run the Application

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd ../frontend
npm start
```

---

## 🔐 Authentication Flow

* 🔄 JWT Authentication with access & refresh tokens
* 📩 Email Verification Flow:

  1. On signup, an email with a verification token is sent
  2. User clicks the link to verify account
* 🔁 Refresh tokens stored securely via HTTP-only cookies

---

## 📈 AI-Powered Features

* 🧠 Product Recommendations
* 👕 Smart Clothing

---

## 🧩 Future Enhancements

* Mobile App (React Native / Flutter)
* Plugin Architecture for Themes & Extensions
* Multi-language Support (i18n)
* Progressive Web App (PWA) Support
* Real-Time Chat with Support Agent / Chatbot

---

## 🤝 Contributing

We welcome community contributions! Here's how you can help:

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author & Maintainers

**fabrIQ** is a passionate project built by dedicated developers for the future of digital commerce.

* 📧 Email: [ebadtahirkhan@gmail.com](mailto:ebadtahirkhan@gmail.com)
* 🌐 Portfolio: [ebadfolio.com](https://ebadfolio.vercel.app)
* 🐙 GitHub: [@EbadTahirKhan](https://github.com/EbadTahirKhan)
* 💼 LinkedIn: [Ebad Tahir Khan](www.linkedin.com/in/ebad-tahir-khan-29603526b)

---

## 🙏 Acknowledgements

* AI with [Hugging Face](https://huggingface.co/)

---

### 💖 Support the Project

If you find fabrIQ useful or inspiring, give it a ⭐ on GitHub and share it with your network!

> *Built with sweat, code, and a whole lot of fabric love.* 🧵

---

### 💖 Screen Shots
<img width="947" alt="Screenshot 2025-05-18 201653" src="https://github.com/user-attachments/assets/47d1b9a8-94d5-48c1-88cc-a7cb650a0dc8" />

<img width="959" alt="Screenshot 2025-05-18 203011" src="https://github.com/user-attachments/assets/0e7f57ab-8348-46a3-b7ab-3765901f6842" />

<img width="959" alt="Screenshot 2025-05-18 201801" src="https://github.com/user-attachments/assets/4fe345e9-5bf3-4c6a-a815-1fc15dd5f3d3" />

![FireShot Capture 008 - FabrIQ -  localhost](https://github.com/user-attachments/assets/a1e79c12-1fcf-43ad-b632-6ad36f8fa90f)

![WhatsApp Image 2025-05-18 at 14 56 09_33bf907a](https://github.com/user-attachments/assets/c8cfe07c-86e2-45cf-b810-bea2ba4be9e7)

---

BELIVE ME THERE IS MUCH MORE JUST CLONE IT AND RUN ON YOUR LOCAL MACHINE

