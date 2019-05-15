# Permis Théorique Quizz - React Native app with node API

- Frontend : React Native App
  - Install : 'npm install'
  - Start : 'npm run start'
  - Simulate on android or IOS
  
- Backend : Node API
  - Create DB in postgres named 'permis_theorique'
  - Execute the 'init.sql' script on the DB
  - Add your username and password in controllers/categoriesController.js
  - Build : 'npm run build'
  - Start the API : 'npm run start'
  
 - API Routes : 
  - Get all categories : 
    - GET : /api/categories
  - Get one category by id
    - GET : /api/categories/:id
  - Get all chapters :
    - GET : /api/chapters
  - Get chapters of one category by id
    - GET : /api/chapters/:categoryId
  - Get all questions : 
    - GET : api/questions/
  - Get question's answers by id
    - GET : api/answers/:questionId
  - Get one question's image :
    - GET : api/images/questions/:questionId
  - Get one chapter's image : 
    - GET : api/images/chapters/:chapterId
