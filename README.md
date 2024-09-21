# Quiz Master 🧠
A dynamic, interactive quiz application built with modern web technologies. This Quiz App allows users to test their knowledge on various topics, tracks their scores, and provides feedback on correct and incorrect answers.


![App Screenshot](/public/home.png)

**Live Demo**: 'https://quizmaster0.vercel.app/'


## Features

- **Multiple Quiz Categories**: Users can choose from a variety of quiz topics.
- **Timed Quizzes**: Set a time limit for each question or for the entire quiz.
- **Score Tracking**: Track the user's score throughout the quiz and display the final result.
- **Responsive Design**: Works on all screen sizes, from mobile to desktop.
- **Leaderboard**: Shows top users on QuizMaster.

## Technologies Used

- **Development:**
  - Nextjs
  - TypeScript
  - Tailwind CSS
  - ShadcnUi
  - PostgreSQL
  - Prisma


- **Authentication:**
  - Next auth


## Setup and Installation

1. **🌌 Clone the Repository:**

```bash
https://github.com/HmadAfzal/quiz-master.git
```


2. **👨‍💻 Install Dependencies:**


```bash
npm install
```

3. **📄 Environment Setup (.env File):**

Create a .env file in the server directory with the following variables:

```env
DATABASE_URL=""
NEXTAUTH_SECRET=""
```

4. **🏃‍♂️ Run Migrations:**

Apply database migrations using Prisma:

```bash
npx prisma migrate deploy
```

5. **🕺 Run the Application**

```bash
npm run dev
```
The app will be avalible at http://localhost:3000, 


## Screenshots
![App Screenshot](/public/home.png)
![App Screenshot](/public/quiz.png)
![App Screenshot](/public/profile.png)
![App Screenshot](/public/leaderboard.png)




## Contact
[hmadafzal00@gmail.com](mailto:hmadafzal00@gmail.com)
