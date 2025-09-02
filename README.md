# 📚 ShikkhaPro - AI-Powered Quiz Generator

## 🌟 Project Overview

**ShikkhaPro** is an intelligent quiz generation and learning platform that leverages AI technology to create personalized educational assessments. This comprehensive e-learning solution enables educators and students to create, take, and analyze quizzes across multiple academic subjects and levels.

### 🎯 **Project Type**
- **Category**: Educational Technology (EdTech) Platform
- **Domain**: AI-Powered Learning Management System
- **Architecture**: Modern React-based Single Page Application (SPA)
- **Target Users**: Students, Teachers, Educational Institutions
- **Academic Levels**: Class 1-12, JSC, SSC, HSC, BSc, MSc

## ✨ Key Features

### 🤖 **AI-Powered Quiz Generation**
- Intelligent question generation using OpenAI GPT models
- Subject-specific content creation (Mathematics, Physics, Chemistry, Biology, English, etc.)
- Multiple question types: MCQ, True/False, Short Answer, Multiple Select
- Adaptive difficulty levels: Easy, Medium, Hard
- Multi-language support: English, Bengali, Hindi

### 📝 **Comprehensive Quiz Management**
- **Quiz Creation Wizard**: Step-by-step guided quiz creation
- **Real-time Question Preview**: Live preview during creation
- **Flexible Configuration**: Custom time limits, instructions, point systems
- **Bulk Operations**: Create multiple quizzes efficiently
- **Version Control**: Track quiz modifications and improvements

### 🎓 **Advanced Taking Experience**
- **Intuitive Interface**: Modern, responsive quiz-taking interface
- **Smart Navigation**: Progress tracking and question overview
- **Auto-save Functionality**: Automatic answer persistence
- **Timer Management**: Configurable time limits with warnings
- **Accessibility Features**: Keyboard navigation and screen reader support

### 📊 **Detailed Analytics & Reporting**
- **Performance Dashboard**: Comprehensive analytics overview
- **Individual Results**: Detailed question-by-question analysis
- **Progress Tracking**: Historical performance monitoring
- **Statistical Insights**: Score trends, time analysis, difficulty patterns
- **Export Capabilities**: PDF reports and data export

### 🔐 **Robust Authentication System**
- **Multi-factor Authentication**: Email + OTP verification
- **Password Security**: Advanced password strength validation
- **Session Management**: Secure token-based authentication
- **Role-based Access**: Student, Teacher, Admin permissions
- **Account Recovery**: Secure password reset flow

## 🏗️ Technical Architecture

### **Frontend Stack**
- **Framework**: React 18 with TypeScript
- **Routing**: React Router DOM v6
- **State Management**: Context API with useReducer
- **UI Framework**: Custom component library with Tailwind CSS
- **Animation**: Framer Motion for smooth transitions
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios for API communication

### **UI/UX Technologies**
- **Design System**: Custom design tokens with CSS variables
- **Icons**: Lucide React icon library
- **Typography**: Inter font family
- **Color Scheme**: Custom primary color `oklch(68.769% 0.13314 157.799)`
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: Complete dark theme support

### **Data Management**
- **Local Storage**: Client-side data persistence
- **Demo Data**: Comprehensive mock data for development
- **Type Safety**: Full TypeScript implementation
- **Validation**: Yup schema validation throughout

## 🚀 Getting Started

### **Prerequisites**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### **Installation**
```bash
# Clone the repository
git clone https://github.com/your-username/exam-qa-generator-client.git
cd exam-qa-generator-client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# OpenAI Configuration (for production)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_ORG_ID=your_organization_id_here

# Backend API Configuration (when available)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_VERSION=1.0.0
```

## 📱 Application Structure

### **Page Routes & Components**
```
📁 src/
├── 📁 components/
│   ├── 📁 auth/              # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── VerifyOtpForm.tsx
│   │   └── ResetPasswordForm.tsx
│   ├── 📁 dashboard/          # Dashboard components
│   │   ├── DashboardOverview.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── QuizManagement.tsx
│   │   └── SettingsPanel.tsx
│   ├── 📁 quiz/              # Quiz-related components
│   │   ├── QuizCreator.tsx
│   │   ├── QuizInterface.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── NavigationControls.tsx
│   │   └── ResultsDisplay.tsx
│   └── 📁 ui/                # Reusable UI components
├── 📁 contexts/              # React Context providers
├── 📁 hooks/                 # Custom React hooks
├── 📁 types/                 # TypeScript type definitions
├── 📁 utils/                 # Utility functions & demo data
└── 📁 pages/                 # Page components
```

### **Route Structure**
```
🏠 / (HomePage)
🔐 /login (LoginForm)
📝 /register (RegisterForm)
🔑 /forgot-password (ForgotPasswordForm)
📲 /verify-otp (VerifyOtpForm)
🔒 /reset-password (ResetPasswordForm)

📊 /dashboard (DashboardLayout)
├── 📈 /dashboard (DashboardOverview)
├── ➕ /dashboard/create-quiz (QuizGeneratorPage)
├── 📚 /dashboard/my-quizzes (QuizManagement)
├── 📊 /dashboard/analytics (AnalyticsDashboard)
├── ⚙️ /dashboard/settings (SettingsPanel)
├── 🎯 /dashboard/quiz/:quizId (QuizTakingPage)
└── 🏆 /dashboard/quiz/:quizId/results (ResultsPage)
```

## 🎮 Demo Mode Features

### **Authentication Demo**
- **Login**: Use any email/password combination
- **Registration**: All fields work with validation
- **OTP Verification**: Use code `123456`
- **Password Reset**: Complete flow simulation

### **Quiz Demo Data**
- **Pre-loaded Quizzes**: Mathematics, Physics, Chemistry, Biology
- **Sample Questions**: Various types and difficulties
- **Mock Analytics**: Realistic performance data
- **Demo Results**: Complete result analysis

## 🎨 Design System

### **Color Palette**
- **Primary**: `oklch(68.769% 0.13314 157.799)` - Custom green
- **Success**: Green variants for correct answers
- **Warning**: Amber for time warnings
- **Error**: Red for incorrect answers
- **Neutral**: Gray scale for UI elements

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Headings**: Bold weights (600-700)
- **Body**: Regular (400) and medium (500)
- **Code**: Mono font for technical elements

### **Component Design**
- **Cards**: Subtle shadows with rounded corners
- **Buttons**: Multiple variants (primary, outline, ghost)
- **Forms**: Consistent input styling with validation
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Development Guidelines

### **Code Standards**
- **TypeScript**: Strict mode enabled
- **ESLint**: Consistent code formatting
- **Prettier**: Automatic code formatting
- **Component Structure**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

### **State Management**
- **Context API**: For global state (Auth, Quiz, Theme)
- **Local State**: useState for component-specific state
- **Form State**: React Hook Form for form management
- **Persistence**: localStorage for demo data

### **Performance Optimization**
- **Code Splitting**: Route-based lazy loading
- **Memoization**: React.memo for expensive components
- **Bundle Analysis**: Webpack bundle analyzer
- **Image Optimization**: WebP format with fallbacks

## 🚧 Future Enhancements

### **Phase 2 Features**
- [ ] **Real-time Collaboration**: Live quiz taking sessions
- [ ] **Video Integration**: Question explanations with video
- [ ] **Mobile App**: React Native mobile application
- [ ] **Offline Support**: Progressive Web App (PWA)
- [ ] **Advanced Analytics**: Machine learning insights

### **Integration Roadmap**
- [ ] **Backend API**: Node.js/Express server integration
- [ ] **Database**: PostgreSQL/MongoDB integration
- [ ] **Authentication**: JWT-based secure authentication
- [ ] **File Upload**: Image/document question support
- [ ] **Payment**: Subscription-based premium features

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### **Bug Reports**
Please use GitHub issues to report bugs with detailed reproduction steps.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: React TypeScript Expert
- **UI/UX Designer**: Modern design system creator
- **AI Integration**: OpenAI API specialist

## 📞 Support

For support and questions:
- **Email**: support@shikkhapro.com
- **Documentation**: [Wiki](https://github.com/your-repo/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

---

Built with ❤️ using React, TypeScript, and modern web technologies.