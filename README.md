# **SheEO**

**SheEO** is an innovative platform designed to empower women entrepreneurs by connecting them with investors and mentors. With modern features, secure authentication, and a personalized experience, SheEO fosters networking, funding opportunities, and business growth in an inclusive digital community.

## **Key Features**:
- **User Authentication**: Secure registration and login system for entrepreneurs and investors, ensuring safe access with role-based permissions.
- **Profile Management**: Entrepreneurs and investors can manage profiles, showcase business ideas, and view matched connections.
- **Matchmaking Algorithm**: Smart matching system that pairs women entrepreneurs with suitable investors based on preferences and business domains.
- **Pitch & Communication Tools**: Entrepreneurs can upload video pitches, send messages, and schedule meetings with investors.
- **AI Assistant – Disha**: Integrated AI assistant offering guidance, answering queries, and suggesting relevant resources for users.
- **Learning Hub**: Access to curated educational materials, funding resources, and articles to help entrepreneurs grow their ventures.
- **Responsive & Interactive UI**: Mobile-friendly and intuitive interface with smooth navigation and an engaging user experience.

## **Tech Stack**:
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript, React.js, EJS
- **Database**: MongoDB
- **Styling**: Bootstrap, CSS
- **Version Control**: Git, GitHub

## **Installation & Setup Guide**
### **1. Clone the Repository**  
```bash
git clone https://github.com/TanmayJain24/SheEO.git
cd SheEO
```

### **2. Install Backend Dependencies**  
```bash
cd backend
npm install
```

### **3. Install Frontend Dependencies (Vite + React)**  
Create a `.env` file in the root directory and add:  
```bash
cd ../frontend
npm install
```

### **4. Configure Environment Variables**  
```bash
PORT=8000
MONGO_URI=mongodb://localhost:27017/Instaclone
SECRET_KEY=yourSecretKey

# Cloudinary Config
API_KEY=yourApiKey
API_SECRET=yourApiSecret
CLOUD_NAME=yourCloudName
```


## **Running the Project**  
### **1. Start the Backend (Express + MongoDB)**  
```bash
cd backend
npm run dev
```

### **2. Start the Frontend (Vite + React)**  
```bash
cd frontend
npm run dev
```

### **3. Access the App**  
```bash
http://localhost:5173
```
