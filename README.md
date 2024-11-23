# Doodle Web App

This is the source code for my  **Doodle** React web app, a game that allows users to draw pictures and guess what others have drawn. The app is built using React and bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also integrates Firebase for backend services and utilizes [React Bootstrap](https://react-bootstrap.netlify.app/) components for UI design.

The app is designed to collect and manage user-generated data, making it suitable for training a potential image classification model.

The Doodle app is hosted live at [https://doodlle.web.app/](https://doodlle.web.app/). Hosting is managed through Firebase.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`

Deploys the production build to the Firebase for hosting. 

## Features

- **React Frontend**: Interactive and responsive UI built with React.
- **Firebase Backend**: Stores user data, drawings, likes/dislikes, and metadata efficiently.
- **React Bootstrap Integration**: Modern and accessible components for a professional design.

## Notes

The app is designed with extensibility in mind, ensuring that user-submitted data can be exported easily for use in machine learning models or other analytics applications. Drawing data includes associated metadata like likes, dislikes, and creation time for enhanced filtering and analysis.

