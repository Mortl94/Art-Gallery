# Guide: Start the project locally and deploy it to Firebase

---

## Prerequisites

Before setting up the project on your system, ensure that the following tools are installed:

1. **Node.js**

   - Download the latest LTS version from [nodejs.org](https://nodejs.org/) and install it.
   - After installation, verify the versions of Node.js and npm (Node Package Manager):
     ```bash
     node -v
     npm -v
     ```

2. **Firebase CLI**

   - Install Firebase tools globally:
     ```bash
     npm install -g firebase-tools
     ```
   - Verify the installation:
     ```bash
     firebase --version
     ```

---

## Step 1: Clone the repository

1. Clone the repository to your system:
   ```bash
   git clone https://github.com/Mortl94/Art-Gallery.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Art-Gallery
   ```

---

## Step 2: Set up Firebase services

1. **Firebase Database:**

   - Open Firebase Console and select your project.
   - Navigate to **Build > Firestore Database** and click **Create Database**.
   - Create a collection named `descriptions`.
     - This collection should contain documents with two fields:
       - **category:** Should match one of the categories defined in `PhotoGallery.js`:
         ```javascript
         ['All Galleries', 'Landscape', 'Crazy', 'Flowers']
         ```
       - **description:** A description of the image, such as dimensions or details.
     - Add documents with incremental numeric IDs, e.g., `1`, `2`, `3`.

2. **Firebase Storage:**

   - In Firebase Console, navigate to **Build > Storage**.
   - Click **Create** and configure storage options.
   - Create two folders:
     - **images:** Upload gallery images here. Ensure file names are sequentially numbered (e.g., `1.jpg`, `2.jpg`, `3.jpg`). Each number must correspond to a description in the Firestore database.
     - **website:** Upload the `profile_pic.png` file here, which is displayed on the Artist page.
     - Make sure file names match the references in the code.

3. **Enable App Hosting and Analytics:**

   - Navigate to **Build > Hosting** and set up Firebase Hosting.
   - Optionally, enable the **Analytics Dashboard** in Firebase Console to collect app usage statistics.

---

## Step 3: Install dependencies

1. Install all required Node.js dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

---

## Step 4: Configure `.env` file

1. Create a `.env` file in the project root.

2. Add your Firebase project settings to the `.env` file. Example:

   ```env
   FIREBASE_API_KEY=<Your-API-Key>
   FIREBASE_AUTH_DOMAIN=<Your-Auth-Domain>
   FIREBASE_PROJECT_ID=<Your-Project-ID>
   FIREBASE_STORAGE_BUCKET=<Your-Storage-Bucket>
   FIREBASE_MESSAGING_SENDER_ID=<Your-Messaging-Sender-ID>
   FIREBASE_APP_ID=<Your-App-ID>
   ```

   - These values are available in Firebase Console under **Project Settings > General > Firebase SDK snippet** (choose the configuration for Web Apps).

3. Ensure the `.env` file is added to your `.gitignore` to prevent sensitive information from being committed to your repository.

4. Update your code to use the environment variables, e.g., in `firebase.js`:

   ```javascript
   const firebaseConfig = {
     apiKey: process.env.FIREBASE_API_KEY,
     authDomain: process.env.FIREBASE_AUTH_DOMAIN,
     projectId: process.env.FIREBASE_PROJECT_ID,
     storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.FIREBASE_APP_ID
   };

   export default firebaseConfig;
   ```

---

## Step 5: Start the local development server

1. Start the local development server:
   ```bash
   npm start
   ```
2. Open the local development environment in your browser:
   - Default URL: [http://localhost:3000](http://localhost:3000)

---

## Step 6: Configure Firebase project

1. Log in to Firebase CLI:
   ```bash
   firebase login
   ```
2. Initialize Firebase in your project:
   ```bash
   firebase init
   ```
   - **Select Hosting:** Enable Firebase Hosting.
   - **Choose project:** Select your Firebase project from the list.
   - **Public folder:** Specify the folder containing your build files (e.g., `build`).
   - **Single-Page App:** Answer `y` as the app uses client-side routing via React Router.

---

## Step 7: Build and deploy the project

   npm run
1. Build the project for production:
   ```bash build
   ```
2. Deploy the build to Firebase Hosting:
   ```bash
   firebase deploy
   ```
3. Open the hosted app at the URL provided by Firebase after deployment.

---

## Summary of essential commands

- **Clone the repository:**
  ```bash
  git clone https://github.com/Mortl94/Art-Gallery.git
  cd Art-Gallery
  ```
- **Install dependencies:**
  ```bash
  npm install
  ```
- **Start the development server:**
  ```bash
  npm start
  ```
- **Build and deploy:**
  ```bash
  npm run build
  firebase deploy
  ```

---

If further steps or adjustments are needed, let me know!
