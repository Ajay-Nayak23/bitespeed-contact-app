## 🧠 Bitespeed Contact Identification Service

This service is designed to **identify customers across multiple contact records** (by email and phone number) and **deduplicate** their identity. Built for the Bitespeed Backend Engineering assignment.

---

### 🌐 Live Deployment

👉 [Live Demo on Render](https://bitespeed-contact-app.onrender.com)

---


Example Test Cases
Test Case 1: 
![image](https://github.com/user-attachments/assets/631fc690-859e-4dd1-a185-1a363b4da21b)
Test Case 2:
![image](https://github.com/user-attachments/assets/b4ad3ae0-8b8c-43aa-a1bf-de716390596d)
Test Case 3:
![image](https://github.com/user-attachments/assets/ec5f8741-76f9-42dc-8feb-17e0ba958157)




### 🚀 Features

* Accepts contact info (`email` / `phoneNumber`) and links/creates records.
* Maintains **primary and secondary contact relationships**.
* Merges duplicate information.
* Built with **Node.js, TypeScript, Express**, and **PostgreSQL**.
* Deployed on **Render**.

---

### 📆 Tech Stack

* **Backend:** Node.js, Express, TypeScript
* **Database:** PostgreSQL + TypeORM
* **Deployment:** Render
* **Dev Tools:** tsx, dotenv, nodemon

---

### 📂 API Endpoint

#### `POST /identify`

**Request Body:**

```json
{
  "email": "foo@example.com",
  "phoneNumber": "1234567890"
}
```

**Response:**

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["foo@example.com", "bar@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2]
  }
}
```

---

### 🔧 How to Run Locally

1. Clone the repo:

```bash
git clone https://github.com/yourusername/bitespeed-contact-app.git
cd bitespeed-contact-app
```

2. **Install dependencies:**

```bash
npm install
```

This installs all required dependencies such as `express`, `typescript`, `typeorm`, `pg`, `dotenv`, `tsx`, and others defined in `package.json`.

3. Set environment variables:
   Create a `.env` file:

```
DATABASE_URL=your_local_postgres_connection_string
PORT=3000
```

4. Start the server:

```bash
npx tsx src/app.ts
```

---

### 🦪 Test the API

You can test it using **Postman** or **curl**:

```bash
curl -X POST http://localhost:3000/identify \
  -H "Content-Type: application/json" \
  -d '{"email":"foo@bar.com", "phoneNumber":"1234567890"}'
```

---

### 🛠️ Deployment Notes

* PostgreSQL database hosted on Render.
* Used environment variable `DATABASE_URL` for secure config.
* Ensure `ssl: true` is used in production DB connection.
