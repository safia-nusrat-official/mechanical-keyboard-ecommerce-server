# E-Commerce Backend Server

A backend server for an e-commerce application built with Express, Typescript and Mongoose.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Contact](#contact)

## Features

- Inventory management
- CRUD operations on products
- Order processing & validation
- Search among products
- Retrieve orders by a specific email
- Integration of MongoDB using Mongoose

## Prerequisites

Make sure you have the following installed on your system before you run this application locally:

- Node.js (>= 20.11.0)
- Node Package Manager (>= 10.2.4)
- Git (>=version 2.41.0)

## Installation

Follow the installation guide to run your application locally

1. **Clone the repository**: 
    [Click to copy the link](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application.git) .
     Go to windows search, type 'cmd' and open cmd. In your cmd write the following command `git clone https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application.git`
   
   ![CLone git repository in cmd](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/c8ad64ff-d292-4f25-b18a-309225e24a31)


2. **Navigate to the project directory**: run `cd Mongoose-TS-Express-Application`
   
     ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/d9478fab-ee13-4e88-9e72-e77450e1a80c)

3. **Install dependencies**: run `npm install`
   
     ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/5deabb08-f2be-421b-a7e4-b9ba66ce6f94)


## Configuration
Since this project uses environment files to store variables to connect to the database, you would need to set up the environ variables manually.
**Setting Up Environment Variables** - You'll have to create a .env files in the root of your project directory and include the following values.
   - Open file explorer and go to your project directory. Right click anywhere (except on the files) and select new and then Text Document. In simple words, create a text document.
   - Make sure that show File Name Extensions in view > show is checked. 

     ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/3c3026d4-c6e8-41b9-ba05-a1c811e87758)
   - Rename the file to .env including the extensions. A popup may open, click *Yes* . Make sure that this is how it looks:
   
     ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/932923c7-fc27-4db1-a3e5-2ffae45ea515)

  - Right click the `.env` file and open with notepad. Write as shown in the second image, exactly and save!

    ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/44b3dd1e-e64b-4a2f-96be-f46d8d516d30)

    ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/323dea50-fa95-45f6-a191-8738ccbc833d)

## Running the Application
   In the cmd run `npm run start` to run the application locally. Go to http://localhost:5000/ and your server is now running locally successfully! 🥳🎉
   ![image](https://github.com/safia-nusrat-official/Mongoose-TS-Express-Application/assets/125960992/f842fbf1-8003-4f32-9dfb-1734a0ce34c2)

*NB: It may require a bit time to connect to the server. Wait patiently.*   

## Contact
  If you encounter any problems during the environment variable set-up or face issues with installations of node or any other pre-requisites mentioned above, feel free to reach out: *safia.nusrat.official@gmail.com* .

  - Safia Nusrat
