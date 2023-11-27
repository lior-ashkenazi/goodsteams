﻿# GoodSteams

![2023-11-20_19-30-10](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/d340386c-1e89-4dd9-ae36-540b6a230718)
![2023-11-20_19-30-54](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/b81ec6f9-29d9-4b00-b0e7-3e0b5a415d15)
![2023-11-20_19-35-37](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/d2df387c-5401-4476-b1f9-75f5897eecc9)
![2023-11-20_20-16-58](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/9482b76a-4cf0-4f81-9933-17f9db18a9f1)
![2023-11-20_20-17-55](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/9994d951-51d9-4a3b-b969-96bad4d7b085)
![2023-11-20_20-32-21](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/f0478e4a-1576-4d14-b4d5-7d1854461591)
![2023-11-20_20-46-18](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/1a480ed2-a2e3-468e-acbb-de65e9a84df6)
![2023-11-20_20-46-50](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/07305a1b-17a2-449b-ac18-6f29c2178b24)
![2023-11-20_20-47-40](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/528be778-8a6e-4a6b-888d-303131c29b70)
![2023-11-20_20-47-54](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/c89c05d4-6123-4faf-8956-42d7a0f51560)

GoodSteams is a Java Spring Boot and React-based e-commerce platform for book enthusiasts, blending features of Steam and GoodReads. It employs a microservices architecture with an intuitive frontend, leveraging Redux Toolkit, Vite.js, and Material UI, and is bolstered by Docker and Kubernetes for robust deployment on AWS.

## Features ## 
### Server ###
* Developed using Java Spring Boot, embracing a microservices architecture for efficient management of application functionalities.
* Services implemented include Authentication, Profile, Book, Order, Review, Discussion, Library, Wishlist, and Recommendation.
* Included an API Gateway service, acting as a Load Balancer and central point for routing and securing requests to the microservices.
* Utilized Spring Security and JWT for secure user authentication and authorization.
* Managed data with SQL databases, integrated with Spring Boot’s data handling capabilities.
* Enabled inter-service communication with Apache Kafka, ensuring a loosely coupled system.
* Leveraged Redis for efficient caching mechanisms, enhancing performance.
* Containerized services using Docker and orchestrated deployment with Kubernetes on AWS EKS.
* Integrated AWS RDS for database management and AWS S3 for image storage and retrieval.

### Client ###
* Developed with React and TypeScript, bundled with Vite.js for fast and efficient build tooling, offering a dynamic and responsive user interface.
* State management efficiently handled using Redux Toolkit and Redux Toolkit Query for streamlined data fetching, caching, and state updates.
* Implemented TanStack Query alongside Axios for optimized API communication.
* Utilized react-hook-form and zod for robust form creation and validation, enhancing user interaction.
* Incorporated react-router-dom for effective routing and navigation within the application.
* Designed the interface with Material UI components and Tailwind CSS, creating an intuitive and visually appealing user experience.
