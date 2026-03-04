# 🛟 HelpHub

A central announcement app connecting users with aid organizations conducting collections of clothes, footwear,
accessories, food, hygiene products, blankets, and medicines in Poland. It solves the problem of the lack of a single
place to browse and add collections by
various aid organizations.

**Available online at:**  
[https://help-hub-render.netlify.app/](https://help-hub-render.netlify.app/)

⚠️ **Note for reviewers:**  
Backend runs on Render’s free plan, so the first request after inactivity may take ~30 seconds. Subsequent requests respond immediately. For local testing, JSON Server provides instant responses.

## 🚀 Features

- Browse announcements
- Filter announcements by selected categories
- Responsive interface
- Pagination of announcements pages
- User registration and login
- Adding/removing announcements from favorites
- React Router routing

## 📸 Screenshots

Below are example screenshots of the HelpHub app on mobile and desktop devices.

![Mobile view](src/screenshots/mobile-view1.png)  
![Desktop view](src/screenshots/desktop-view1.png)  
![Mobile view](src/screenshots/mobile-view2.png)
![Desktop view](src/screenshots/desktop-view2.png)

## 🛠️ Technologies

- Vite
- React
- Sass (using @import due to compatibility with Bootstrap)
- React Router
- REST API (powered by JSON Server for local development)
- Bootstrap
- React-Bootstrap
- React-Icons
- Responsive Web Design (Mobile First)
- Context API
- localStorage
- React-Select

## 🛡️ Error Handling

The application includes a basic error handling mechanism to ensure stability and provide clear feedback to the user.

- Network errors and unsuccessful server responses are handled during API requests using try/catch.
- In case of a failure, the user sees an error message instead of the application crashing.
- Loading states are displayed while data is being fetched.
- If data cannot be loaded, an appropriate error message is shown.
- Login and registration forms include client-side validation and display messages for invalid input or server-related issues.

## 🔧 Local Installation

1. **Create a local folder named `help-hub` on your device**

   This will be the place to copy the repository.

2. **Clone the application into the created folder**

   Use the command `git clone` to download the repository:
```bash
   git clone https://github.com/Your-Account/HelpHub.git
```

3. **Navigate to the main folder in the terminal**

   Go to the project directory to be able to run npm commands:
```bash
   cd HelpHub
```

4. **Install the application**

   Install all required dependencies:
```bash
   npm install
```

5. **Configure environment variables**
```bash
   .env — file included in the repo with the default backend URL (e.g., production):
```
```bash
   VITE_API_URL=https://help-hub-2sac.onrender.com
```
   .env.local — local file (ignored by Git), where you can override the backend address for local testing:
```bash
   VITE_API_URL=http://localhost:3020
```
   If `.env.local` does not exist, the app uses the settings from `.env`

6. **Run the app in development mode**

   To run the app in dev mode, use:
```bash
   npm run dev
```
7. **Build the app for production (optional)**

   Prepare the app for deployment in production:
```bash
   npm run build
```

## 🖥️ Backend and Hosting

This project uses a REST API built with `json-server`.  
The backend is hosted online on Render and can also be run locally for development.

### Production backend

- Hosted on Render (free plan, serverless): [https://help-hub-2sac.onrender.com](https://help-hub-2sac.onrender.com)
- Free plan is ephemeral (temporary; POST/PUT/DELETE data may be lost after server sleeps)
- Uptime Robot pings every 5 minutes to keep the backend awake.

### Local development

To run a local backend with `json-server` use local backend startup instructions:

- Install json-server globally:
```bash
  npm install -g json-server
```

- Or run without installation - ensure `db.json` is in the project root (where `package.json` is). Run json-server with:
```bash
  npx json-server --watch db.json --port 3020
```
> ⚠️ **Note:**
>
> - Port 3020 is an example — you can choose any available port but remember to set it in `.env.local`.
> - Without --watch, JSON Server loads db.json only once at start. Any changes in the file require restarting the server.

- Configure `.env.local` (ignored by Git) to point to local backend:
```bash
  VITE_API_URL=http://localhost:3020
```
Available endpoints:

- http://localhost:3020/announcements
- http://localhost:3020/users

## 🧾 Usage Instructions

➡️ For every user:

- Click the button on the homepage to go to public announcements,
- Use filters on the page to search collections by specific categories,
- To save collections to favorites you need to register and log in,
- After creating an account, you can save announcements to favorites.

➡️ For aid organizations (planned features):

- To publish announcements registration and login for organizations will be required,
- After creating an account, organizations can add announcements.

## 📊 App development possibilities with MoSCoW priority

✅ **Must Have**

- Filtering announcements
  - Voivodeship: filter announcements by region
  - Clothes and Shoes: filter by collections with clothes and footwear
  - Accessories: filter by collections with accessories
  - Urgent: filter by urgency (food, hygiene products, blankets, medicine)

- User registration and login
  - Ability to create an account
  - Login to existing account

- After login, user can manage favorite collections — add/remove collections to/from favorites

- Ability to browse announcements list with pagination

🌟 **Should Have**

- Favorite collections counter in the header, visible after login
- Registration and login for aid organizations
- Individual announcement adding by aid organizations

💡 **Could Have**

- Modal confirming addition of a collection to favorites by user
- Modal confirming announcement addition by organization
- Filtering announcements by additional categories

❌ **Won't Have**

- Payment form
- Language selection (Polish/English etc.)
- HelpHub_v2.0 version — app supporting animal collections and browsing adoption announcements across Poland
