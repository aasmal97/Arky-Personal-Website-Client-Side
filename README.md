## Introduction
The purpose of this web application is to showcase the projects that Arky has created throughout his software development journey

This is client side of this application, built on React, and deployed [here](https://arkyasmal.com)

If you are looking for the backend code, go [here](https://github.com/aasmal97/Arky-Personal-Website-AWS-CDK)
## Components and Hooks
Most components in the project are ordered in the page they appear. All react hooks are located [here](./src/hooks/)

1. [utilities](./src/utilities/) is where components that are reusable across the entire app, are located
2. [About Page](./src/pages/aboutPage/) contains all components needed to display the about section
3. [Home Page](./src/pages/homePage/) contains all the components needed for the landing page
4. [Skills Page](./src/pages/skillsPage/) contains all the components needed for the skill section

## Dependencies
This app uses a series of dependencies and you can check the list in the following [package.json file](./package.json). Most notably are the following: 
1. [Create react app](https://create-react-app.dev/).
2.  [Swiper](https://swiperjs.com/) for carousel functionality
3. [Font Awesome packages](https://fontawesome.com/) for icons
4. [Material UI](https://mui.com/) for reuseable components
5. [Sass](https://github.com/sass/dart-sass) which is needed to complie SCSS to CSS
6. [Arky's AWS Backend](https://github.com/aasmal97/Arky-Personal-Website-AWS-CDK/tree/master) is responsible for the backend of the web application, and all associated api calls
## Build + Deploy
#### Build 
This project uses doppler to manage enviroment secrets, therefore, for full functionality, you must request access to frontend doppler secrets for this project prior to starting this project on your local machine. 

1. To start this project, run ```npm run dev```
2. To build this project, run ```npm build```

#### Deployment
This project is auto deployed through a custom github action, that builds this React application as a SPA (single page application), onto an S3 Bucket, which is then served through Cloudfront. 

To initate the deploy process on your local machine you must:
1. Request access to an account on AWS, that has both S3 and Cloudfront access for this project.
2. Run ```npm deploy```
