# GoodSteams

![2023-11-20_20-32-21](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/92fda782-9bf7-46df-a056-078c6adc9047)
![2023-11-20_19-30-54](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/28d33571-d8f3-47bd-ae30-1a11028026c7)
![2023-11-20_19-35-37](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/48b15c1f-2200-4855-8b03-c0ad109a619f)
![2023-11-20_20-16-58](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/8831da3f-b75b-4e01-9cc2-a117f0017876)
![2023-11-20_20-17-55](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/c843d9e1-c7f4-4ceb-bcef-1dd8abebb1ec)
![2023-11-20_20-46-18](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/eac694af-bffa-40a0-a9ad-84981e3a5940)
![2023-11-20_20-46-50](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/41a46168-d40a-4744-83c6-eb6d9f71eff9)
![2023-11-20_20-47-40](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/c3c20907-6c62-4c24-841e-e99c679e6a65)
![2023-11-20_20-47-54](https://github.com/lior-ashkenazi/goodsteams/assets/72506071/27e90775-d15e-473e-9d84-4ac83313cb93)

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
