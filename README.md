# Flavor-Folio

# Flavor Folio

Flavor Folio is a modern web application that allows users to explore delicious recipes, track orders, and manage their orders seamlessly. Built using React.js, this project leverages MUI, ANTD, Material Tailwind, and Tailwind CSS for an enhanced UI/UX experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User Authentication (Login/Signup)
- Track Order
- Checkout Process
- Place Orders
- Manage Restaurant Branches
- Add to Cart
- Order Progress Tracking
- User Dashboard
- Admin Panel

## Technologies Used

- **Frontend:** React.js
- **UI Libraries:** MUI, ANTD, Material Tailwind, Tailwind CSS
- **Authentication:** Firebase
- **Database:** Firebase Firestore

## Screenshots

### Dashboard

![Dashboard](/src/assets/dashboard.png)

### Admin Panel

![Admin Panel](/src/assets/admin.png)

### Track Order

![Track Order](/src/assets/trackorder.png)

### Checkout

![Check Out](/src/assets/checkout.png)

### Home

![Home](/src/assets/home.png)

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Farooq85-dev/Flavor-Folio-Restaurant-App-Using-React-Js
   cd flavor-folio

   ```

2. Install dependencies:

```
npm install
```

3. Set up Firebase:

```
// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

//Import necessary methods
```

4. Start the development server:

```
npm run dev
or
yarn run dev
```

### Usage

👤 Sign Up / Log In: Create a new account or log in with your existing credentials.
👤 Dashboard: Access your user dashboard to manage your orders and profile.
👤 Admin Panel: Admin users can access the admin panel to manage the entire platform.
👤 Track Orders: Track the status of your orders in real-time.
👤 Add to Cart: Browse through recipes and add your favorite items to the cart.
👤 Checkout: Complete your order with a seamless checkout process.

### Contributing

We welcome contributions from the community. To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
