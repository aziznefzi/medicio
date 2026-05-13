# 🏥 CarePoint - Doctor Appointment System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**CarePoint** (Medicio) is a comprehensive full-stack doctor appointment booking platform. It provides a seamless experience for patients to discover doctors, filter by specialties, and manage their health appointments online.

---

## 🌟 Key Features

-   **🔐 Secure Authentication**: JWT-based login and registration system for patients and admins.
-   **👨‍⚕️ Doctor Management**: Browse all doctors, view detailed profiles, and check availability.
-   **📁 Department Filtering**: Dynamic filtering of doctors based on medical departments.
-   **📅 Appointment Booking**: Easy-to-use interface for booking and canceling appointments.
-   **🌓 Dark Mode Support**: Sleek UI with persistent dark/light mode toggle.
-   **🌍 Multi-language Support**: Fully bilingual interface supporting **Arabic (RTL)** and **English (LTR)** using `i18next`.
-   **📱 Fully Responsive**: Optimized for all screen sizes from mobile to desktop.
-   **🛠 Admin Dashboard**: Special routes for adding new doctors and departments with image upload.

---

## 🚀 Tech Stack

### Frontend
-   **React.js** (Vite)
-   **Tailwind CSS** (Modern Styling)
-   **React Router Dom v7** (Navigation)
-   **Axios** (API Requests)
-   **i18next** (Internationalization)
-   **Lucide React & React Icons** (Iconography)
-   **React Toastify** (Notifications)

### Backend
-   **Node.js & Express**
-   **MongoDB Atlas** (Database)
-   **Mongoose** (ODM)
-   **JSON Web Token (JWT)** (Security)
-   **Multer** (File Uploads)
-   **Bcrypt.js** (Password Hashing)

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/aziznefzi/medicio.git
cd medicio
```

### 2. Backend Setup
Create a `.env` file in the root directory:
```env
MONGO_URI=your_mongodb_atlas_uri
SECRET_KEY=your_jwt_secret
PORT=5000
```
Install dependencies and start:
```bash
npm install
npm run dev
```

### 3. Frontend Setup
Navigate to the frontend folder and create a `.env` file:
```env
VITE_API_URL=http://localhost:5000
```
Install dependencies and start:
```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Deployment

The application is deployed on **Render**:
-   **Frontend & Backend**: [Live Demo](https://medicio-1i5j.onrender.com)

---

## 📸 Screenshots

*(You can add screenshots here by putting images in a `screenshots` folder)*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Aziz Nefzi**
-   GitHub: [@aziznefzi](https://github.com/aziznefzi)
-   Project: [Medicio / CarePoint](https://github.com/aziznefzi/medicio)

---
*Made with ❤️ for a better healthcare experience.*
