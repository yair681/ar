# Teacher Grading System

מערכת ניהול ציונים לתלמידים - מוקד מהדורה ראשונה.

## תכונות
- ✅ הוסף תלמידים חדשים עם ציונים
- ✅ עדכן ציונים של תלמידים קיימים
- ✅ מחק תלמידים מהמערכת
- ✅ צפה בכל התלמידים וציונים בממשק ידידותי
- ✅ טיפול מלא של Database עם MongoDB

## דרישות
- Node.js (v14 או גבוה יותר)
- MongoDB Atlas account (כבר מוגדר)
- npm או yarn

## התקנה

1. עברת לתיקייה הפרויקט:
```bash
cd teacher-grading-system
```

2. התקן את התלויות:
```bash
npm install
```

3. הרץ את השרת:
```bash
npm start
```

לפיתוח עם nodemon:
```bash
npm run dev
```

4. פתח את הדפדפן וגש ל:
```
http://localhost:3000
```

## פרסום ל-Render.com

### שלב 1: עלה קוד ל-GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/teacher-grading-system.git
git branch -M main
git push -u origin main
```

### שלב 2: הגדר ב-Render.com
1. עבור ל-https://render.com וכניס/הרשם
2. לחץ על "New +" ואختר "Web Service"
3. חבר את ה-GitHub repository שלך
4. הגדרות:
   - **Name**: teacher-grading-system
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. הוסף Environment Variables:
   - לא צריך - המיפוי של MongoDB כבר בקוד
6. לחץ "Create Web Service"

### שלב 3: הפעל
Render יפרוס את האפליקציה והוא יתן לך URL כמו:
```
https://teacher-grading-system.onrender.com
```

## מבנה הקבצים
```
teacher-grading-system/
├── server.js           # Express server ו-API
├── package.json        # תלויות
├── public/
│   └── index.html      # ממשק המורה (HTML/CSS/JS)
└── .gitignore
```

## API Endpoints

### GET /api/students
קבל את כל התלמידים

### POST /api/students
הוסף תלמיד חדש
```json
{
  "name": "שם התלמיד",
  "grade": 85
}
```

### PUT /api/students/:id
עדכן ציון של תלמיד
```json
{
  "grade": 90
}
```

### DELETE /api/students/:id
מחק תלמיד

## MongoDB
- **Database Host**: MongoDB Atlas (Cloud)
- **Connection String**: כבר מוגדרת בקוד
- **Database**: hwbhhrt_db (אוטומטית יוצרת)

## צילומי מסך
[ממשק ידידותי בעברית עם:
- טופס הוספת תלמידים
- רשימה דינמית של תלמידים
- כפתורים לעדכון ומחיקה
- עיצוב מודרני וצבעוני]

## רישיון
MIT
