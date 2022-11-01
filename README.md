# Front End Capstone Project
## About
This project comprises of a complete redesign of our client's eCommerce retail web-portal to help sales and conversion numbers.

This project was built with:
<div align="center" width="100%">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
</div>


## Table of Contents
- [Front End Capstone Project](#front-end-capstone-project)
  - [About](#about)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Product Overview](#product-overview)
    - [Related Products](#related-products)
    - [Questions & Answers](#questions--answers)
  - [Getting Started](#getting-started)
  - [Contributors](#contributors)

## Features

### Product Overview
| Image Gallery & Style Selector
:-:
<img src="https://user-images.githubusercontent.com/104607182/198860061-c1e5c1b4-bf6c-4679-965d-7ada004ee1ed.gif" width="400">

<b>Features</b>
- Product overview renders general product information such as category, title, and price
- Image gallery carousel with the ability to browse between, zoom and expand photos
- Style selector dynamically lists out styles based on the current product
- Add to cart feature that allows users to select a size & quantity and checkout
- Responsive to different browser sizes and mobile friendly

Built by <a href="https://github.com/quyencodes">Quyen Hoang</a>
### Related Products
| Related Products & Outfit List
:-:
<img src="https://user-images.githubusercontent.com/104607182/198860662-9e38dbf9-ba7e-448d-a0d4-9a84aa6a4cd6.gif" width="400">

<b>Features</b>
- Dynamically generates related items based on the current product in display
- Product cards that contain related product information and will reroute user when clicked
- When the star icon is clicked, a modal will appear that displays comparison information
- Interactive carousel that displays 4 product cards at a time
- Outfit list that allows users to keep track of their desired item(s), the list persists between user sessions

Built by <a href="https://github.com/lgoodcode">Lawrence Good</a>

### Questions & Answers
Add an Answer Modal|Navigating the Q&A List
:-----------------:|:---------------------:
![chrome-capture-2022-9-29 (1)](https://user-images.githubusercontent.com/97919673/198855342-c6183371-94ab-4566-8c86-a955e81ae510.gif)|![chrome-capture-2022-9-29 (2)](https://user-images.githubusercontent.com/97919673/198855434-af9990a9-5703-43e1-904c-4613bf235f70.gif)

<b>Features</b>
- Load additional questions and answers on click
- Search functionality for filtering questions
- Add new questions and answers by filling out forms in a pop-up modal
- Rate helpful or report questions or answers on click

Built by <a href=https://github.com/jake-manning>Jake Manning</a>


## Getting Started
1. Clone the repo
   ```bash
   $ git clone https://github.com/FruitLoops-Hackreactor/fruitloops.git
   ```
2. Install NPM packages
   ```bash
   $ npm install
   ```
3. Create your .env file (make a copy from example.env)
   ```bash
   GITHUB_TOKEN='GITHUB TOKEN HERE'
   CLOUD_NAME='CLOUD NAME HERE'
   ```
4. Follow the instructions in [this tutorial](https://cloudinary.com/documentation/upload_widget_tutorial) to get a Cloudinary ID and configure the upload preset
5. Run locally in development mode
   ```bash
   npm run dev
   ```
6. Project will be deployed on a localhost server, navigate to your browser and enter in the url
   ```bash
   http://localhost:3000
   ```

<b>Environment Variables</b>

`GITHUB_TOKEN` - The token used to authenticate with API\
`CLOUD_NAME` - The cloud name used to upload media to cloudinary

## Contributors
**Quyen Hoang (Product Overview)**\
<img src="https://user-images.githubusercontent.com/104607182/198861294-a3c1a341-0f11-4cdd-bba1-c4a254c40fc6.png" alt="Quyen Hoang" width="72">\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/quyenduhoang/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/quyencodes/)

**Lawrence Good (Related Products)**\
<img src="https://user-images.githubusercontent.com/104607182/198861316-814b2047-aaf7-42a0-85cd-85624638813f.png" alt="Lawrence Good" width="72">\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/lawrence-good-dev/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/lgoodcode)

**Jake Manning (Questions & Answers)**\
<img src="https://user-images.githubusercontent.com/104607182/198861326-8adeb93e-d4cb-4a39-b17e-3cb05b427170.png"
width="72">\
[![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/jacob-manning92/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/jake-manning)

© LGTM 2022
