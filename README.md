# Home Services Review Website - Frontend

## Overview

This is a **one-page web application** for users to write reviews for home service providers in the **Chicago area**. The website allows service providers to create profiles, and users can rate and review providers based on their services.

## Key Features

- **User Login**: Users can log in via Google, Apple, Microsoft, or using a phone/email security code.
- **Service Provider Profiles**: Service providers can create and manage their profiles.
- **Review System**: Users can write reviews with ratings (1-5 stars) for service providers.
- **Service Categories**: Service providers are listed under multiple categories like **Handyman**, **Plumbing**, **Electrical**, etc.
- **Filtering by Area**: Users can filter service providers by the area they cover.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **Yarn** (for dependency management)

### Setup Instructions

1. **Clone the repository**:

    ```bash
    git clone https://github.com/sardarit-bd/Home-service-project.git
    cd Home-service-project
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

    or if using Yarn:

    ```bash
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root of the project and add:

    ```bash
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
    NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key
    ```

4. **Start the development server**:

    ```bash
    npm run dev
    ```

    or with Yarn:

    ```bash
    yarn dev
    ```

    The app should now be running at [http://localhost:3000](http://localhost:3000).


