# ![Rubus-Cron](./public/agents/Rubus-Cron.png)


## 🌿 Welcome to **Rubus-Cron**

**Rubus-Cron** is a Node.js microservice built with **NestJS** that periodically fetches economic and IT-related data from multiple sources (EU Parliament, Eurostat, Federal Reserve, US-BEA) and stores them in a PostgreSQL database.

The project is designed to:
- 🔄 **Collect** data from APIs and RSS feeds.
- 🏗 **Normalize** and transform the data into a unified format.
- 🧠 **Provide AI agents** with structured historical data for context-based analysis.
- 🕰 **Run on a cron job**, ensuring the database is always up-to-date.

## 🚀 Features
- **Automated Data Collection** 📡 (via API & RSS fetchers)
- **Scheduled Execution** ⏳ (via cron jobs)
- **Data Normalization & Storage** 🗃️ (via PostgreSQL)
- **Modular & Scalable Architecture** 🏗️ (NestJS & Docker)

## 📦 Tech Stack
- **Backend:** [NestJS](https://nestjs.com/) (TypeScript)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Task Scheduling:** [@nestjs/schedule](https://docs.nestjs.com/techniques/task-scheduling)
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **ORM:** [TypeORM](https://typeorm.io/)

---

## ⚙️ **Installation & Setup**

### **1️⃣ Clone the repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/rubus-cron.git
cd rubus-cron
```
### **2️⃣ Install dependencies**
```sh
npm install
```
### **3️⃣ Configure environment variables**
Create a .env file at the project root:

```sh
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=rubus
```
### **4️⃣ Run with Docker**
```sh
docker-compose up --build
```
### **5️⃣ Access the application**
- API runs on http://localhost:3000
- PostgreSQL database is available on port 5432

## 📡 **Data Fetchers**

Rubus-Cron integrates multiple data sources:

    European Union:
        EU Parliament RSS Feeds
        Eurostat API
    United States:
        Federal Reserve RSS Feeds
        US Bureau of Economic Analysis (BEA) API

Each data fetcher is modular and located in src/data-fetchers/.

## 🛠 **Project Structure**
```sh
rubus-cron/
 ├── src/
 │   ├── app.module.ts          # Main NestJS module
 │   ├── main.ts                # App entry point
 │   ├── config/                # Environment configuration
 │   ├── cron/                  # Scheduled jobs (cron)
 │   ├── database/              # PostgreSQL integration
 │   ├── data-fetchers/         # API & RSS fetchers
 ├── .env                       # Environment variables (not committed)
 ├── .gitignore                 # Ignore unnecessary files
 ├── Dockerfile                 # Docker container setup
 ├── docker-compose.yml         # Multi-container setup (app + PostgreSQL)
 ├── package.json               # Project dependencies
 ├── README.md                  # You are here
```

## 🚀 Running Tests

### 🔹 Run unit tests (fetchers & transformers)
```sh
npm run test:unit
```
### 🔹 Run functional tests (full ingestion flow)
```sh
npm npm run test:functional
```
### 🔹 Run integration tests (database persistence)
```sh
npm run test:integration
```
### 🔹 Run all tests
```sh
npm run test:all
```

## 🛠 **Contributing**
- Fork the repo
- Clone your fork
- Create a new feature branch
- Commit & push your changes
- Create a Pull Request

## 📝 **License**
This project is licensed under the MIT License.

## ✨ **Future Enhancements**
- 🧠 AI Integration: Feed the collected data into LLMs (ChatGPT, LLaMA).
- 🔍 Memory Vectorization: Store key insights for long-term AI context.
- 📊 Visualization: Create dashboards for economic & IT trends.

## 📝 **Author**
- 👤 0xRubusData 
- 📧 Contact: 0xRubusData@gmail.com
- 🌍 GitHub: https://github.com/0xrubusdata/rubus-cron

## 🌐 Connect with Us
- **Twitter (X)**: [0xRubusData](https://x.com/Data0x88850)
- **Website**: [RubusLab](https://rubus-lab.vercel.app/)

## 🎯 **Happy Coding!** 🚀
