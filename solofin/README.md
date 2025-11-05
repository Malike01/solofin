# Solofin

**Financial clarity. Designed for solo careers.**

![Solofin](https://www.figma.com/make/9sopPE8LRO5QpObLoNBVN0/Main-Dashboard-Design?fullscreen=1)
_Note: This is a temporary cover image. You can replace it with your project's logo or a screenshot._

Solofin is a SaaS (Software as a Service) application being developed to solve the single biggest problem for freelancers, consultants, and one-person businesses: **"How much of this money is actually mine?"**

This project provides a clean, simple interface for solo professionals to manage their cash flow, understand their financial health, and—most importantly—plan for their tax obligations (like VAT and Income Tax) without the complexity of full-scale accounting software.

---

## 🎯 The Problem We Solve

Freelancers operate with irregular income streams and complex tax responsibilities, including VAT, withholding taxes, and cumulative income tax brackets. Solofin is designed to simplify this complexity.

Instead of facing end-of-month stress, users are provided with a real-time **"Tax Piggy Bank."** This feature proactively sets aside estimated VAT and Income Tax liabilities as income is logged, allowing the user to always see their true "spendable balance."

## ✨ Core Features (MVP)

- **Dashboard:** A single-glance view of your financial health (Total Income, Total Expenses, Spendable Balance).
- **Simple Tracking:** Manually log income and expenses in seconds.
- **Smart Categorization:** Classify expenses (e.g., Software, Transport) and mark them as "tax-deductible."
- **The Tax Piggy Bank (Core Value Proposition):**
  - Calculates the estimated **VAT payable** in real-time.
  - Tracks your cumulative income to show which **income tax bracket** you are currently in.
  - Allocates the estimated **Income Tax** liability.

## 🚀 Future Vision (Roadmap)

- **v1.1 (Smart Automation):** Automatic expense categorization based on the description (e.g., "Uber" -> "Transportation").
- **v2.0 (Predictive Analysis - Pro):** Proactive warnings based on historical data, such as "You are on track to hit the next tax bracket in 2 months" or cash flow forecasts.
- **v3.0 (AI Assistant - Pro):** A chat-based assistant to answer natural language queries like, "Who was my biggest client last quarter?"

---

## 🛠️ Tech Stack

This project is built on a modern, scalable, and reliable stack.

- **Frontend:**
  - [**React**]
  - [**Material-UI (MUI)**]: For a professional and consistent user interface.
  - [**React Query**]: For server state management, caching, and data fetching.
  - [**Context API**]: For global client state management (e.g., Auth).
  - [**Axios**]: For reliable HTTP requests.
- **Backend:**
  - [**Python**] (Chosen for future AI and data analysis capabilities)
  - [**FastAPI**] (Recommended): For building high-performance, modern APIs.
- **Database:**
  - [**PostgreSQL**]: As the relational database for financial data integrity and complex calculations.
- **Platform & DevOps:**
  - [**Railway**]: For deploying and managing the frontend, backend, and database all in one place.

---

## 🤝 Contributing

This project is currently in active development. If you are interested in contributing, reporting a bug, or suggesting a feature, please feel free to open an "Issue" or submit a "Pull Request."

## 📄 License

This project is licensed under the [MIT License](LICENSE).
