# Lumina - Product Showcase ✨

> **Note:** This is a showcase repository tailored for recruiters and technical evaluations. The full codebase contains proprietary business logic and sensitive configurations, which is why only carefully selected architectural samples and UI screenshots are presented here.

Welcome to **Lumina**, a modern financial classification and management platform. Lumina leverages powerful rules engines to automatically categorize bank movements, providing businesses with clear insights into their cash flow.

## 📸 Application Screenshots

- **Dashboard Overview:**
  ![Dashboard Overview](assets/screenshots/dashboard.png)

- **Login Screen:**
  ![Login Screen](assets/screenshots/login.png)

- **Rules Management:**
  ![Rules Management](assets/screenshots/rules.png)

---

## 🛠 Tech Stack

Lumina is built with a robust, modern, and scalable architecture:

**Frontend:**
- **Next.js (React)** for fast, server-rendered and statically generated pages.
- **NextUI & Tailwind CSS** for a highly responsive, glassmorphism-inspired, and accessible user interface.
- **Lucide React** for consistent iconography.

**Backend:**
- **Python 3 & FastAPI** for high-performance, asynchronous REST APIs.
- **SQLAlchemy (Async)** for robust ORM database interactions.
- **PostgreSQL** as the primary relational database.
- **Custom Rules Engine** for intelligent categorization of financial data.

---

## 🏗 Architecture Highlights

### 1. Extensible Rules Engine
The backend implements a highly decoupled rules engine that classifies incoming financial transactions. It prioritizes user-defined rules stored in the database, falling back to a hardcoded generic seed of rules if no custom matches are found. This ensures a high match rate while keeping the system flexible.

### 2. Component-Driven UI
The frontend utilizes a component-driven architecture using NextUI. Screens like the `LoginPage` manage their state locally and communicate with the backend securely. It uses modern React patterns (Hooks, Context, Server Components where applicable) and visually stunning gradients and blurs.

### 3. Secure and Scalable Data Models
The database uses well-defined SQLAlchemy models, ensuring data integrity. We use standard practices like hashed passwords, role-based access control, and comprehensive timestamping.

---

## 📁 Code Samples

In the `code-samples/` directory, you can find a few selected snippets that demonstrate the coding style, structure, and architecture of the project:

- **`code-samples/frontend/LoginPage.tsx`**: Demonstrates the integration of NextUI components, state management, and API calls in a React Server/Client Component context.
- **`code-samples/backend/rules_engine.py`**: Showcases the core logic used to classify bank movements based on keywords, prioritizing user rules over generic rules.
- **`code-samples/backend/user_model.py`**: A standard SQLAlchemy model demonstrating how we structure our database entities.

## 📬 Contact
If you'd like to see a live demo or discuss the full architecture in detail, please reach out directly!
