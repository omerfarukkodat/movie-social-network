# Movie Social Network

## Project Overview
Movie Social Network is an application for managing movies, allowing users to borrow and share movies with others. Users can register, authenticate, and activate their accounts via email. The backend is built using Spring Boot, while the frontend uses Angular. MailDev is used to simulate email services for account activation, and the API is documented using Swagger (OpenAPI).

## Features
- User Registration and Authentication (JWT)
- Movie management (add, update, delete, borrow, return)
- Email activation (MailDev)
- Swagger for API documentation
- Role-based access control

## Technologies

### Backend:
- **Java 17**
- **Spring Boot 3.2.5**
- **PostgreSQL**
- **Spring Security (JWT)**
- **MailDev** for email simulation
- **Swagger** (OpenAPI) for API documentation

### Frontend:
- **Angular** for the web client

## Setup Instructions

### Backend Setup:
1. Clone the project:
    ```bash
    git clone https://github.com/omerfarukkodat/movie-social-network.git
    cd movie-social-network
    ```

2. Make sure you have Docker installed, and run MailDev for email service:
    ```bash
    docker run -p 1080:80 -p 1025:25 maildev/maildev
    ```

3. Run the backend:
    ```bash
    ./mvnw spring-boot:run
    ```

4. The backend should now be running on `http://localhost:8080` with the Swagger UI accessible at `http://localhost:8080/swagger-ui.html`.

### Frontend Setup:
1. Navigate to the frontend directory:
    ```bash
    cd movie-network-ui
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the Angular application:
    ```bash
    ng serve
    ```

4. Access the frontend at `http://localhost:4200`.

## API Endpoints

### Authentication `/auth`

| HTTP Method | Endpoint                   | Description                                      |
|-------------|----------------------------|--------------------------------------------------|
| POST        | /register                   | Register a new user.                             |
| POST        | /authenticate               | Authenticate a user and generate JWT.            |
| GET         | /activate-account           | Activate account via email.                      |
| DELETE      | /delete-user                | Delete the authenticated user's account.         |

### Movie Management `/movies`

| HTTP Method | Endpoint                         | Description                                      |
|-------------|----------------------------------|--------------------------------------------------|
| GET         | /                                | Get a list of all movies.                        |
| POST        | /                                | Add a new movie.                                 |
| GET         | /{movie-id}                      | Get details of a movie by its ID.                |
| POST        | /cover/{movie-id}                | Upload cover image for a movie.                  |
| POST        | /borrow/{movie-id}               | Borrow a movie by its ID.                        |
| PATCH       | /borrow/return/{movie-id}        | Return a borrowed movie.                         |
| PATCH       | /borrow/return/approve/{movie-id}| Approve a returned movie.                 |
| PATCH       | /archived/{movie-id}             | Archive a movie.                                 |
| GET         | /returned                        | Get all returned movies.                         |
| GET         | /owner                           | Get movies owned by the authenticated user.      |
| GET         | /borrowed                        | Get movies borrowed by the authenticated user.   |

### Feedback `/feedbacks`

| HTTP Method | Endpoint                         | Description                                      |
|-------------|----------------------------------|--------------------------------------------------|
| POST        | /                                | Add feedback for a movie.                        |
| GET         | /movie/{movie-id}                | Get feedback for a specific movie.               |

## OpenAPI (Swagger)
API documentation is available through Swagger. You can access the Swagger UI at:
`http://localhost:8080/swagger-ui.html`

## Email Activation
This application uses MailDev to simulate email services. After user registration, an activation link is sent via email. To view and activate your account:
1. Open MailDev at `http://localhost:1080`.
2. Find the activation email and click the activation link.

## Dependencies
Here are the key dependencies used in the backend (as seen in `pom.xml`):
- Spring Boot Starter Data JPA
- Spring Boot Starter Security
- Spring Boot Starter Mail
- Spring Boot Starter Web
- jjwt (for JWT authentication)
- PostgreSQL
- Lombok
- Swagger (springdoc-openapi)

## Screenshots
1. **User Registration**
<img width="1422" alt="Ekran Resmi 2024-09-11 ÖS 10 36 46" src="https://github.com/user-attachments/assets/64d1724c-0266-435c-8ef6-cf2805d3e3b5">

2. **Mail Dev**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 10 38 28" src="https://github.com/user-attachments/assets/6eb2708a-5204-4ee2-ba6f-2ae95f2b673f">

3. **Write The Activation Code**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 10 38 12" src="https://github.com/user-attachments/assets/eb48be24-971b-4de6-a14a-1955252ecd2c">

4. **Activate Account**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 10 39 11" src="https://github.com/user-attachments/assets/6176f05c-90df-4ce7-8c6a-41517ebf6808">

5. **User Login**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 10 39 33" src="https://github.com/user-attachments/assets/8999cffb-0ad5-41db-8590-cb5cbb08fc0d">

6. **Movie Management Dashboard**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 11 10 13" src="https://github.com/user-attachments/assets/a3a2cca9-897a-46d7-af4c-80e6d5db383c">

7. **Manage My Movies Page**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 10 40 39" src="https://github.com/user-attachments/assets/3e4be22e-ca2c-4afa-8dbb-39d5c4ca47d5">

8. **Manage Borrowed Movies**
<img width="1440" alt="Ekran Resmi 2024-09-11 ÖS 11 10 47" src="https://github.com/user-attachments/assets/936cdf05-ec0f-44ea-b39f-1b5147099f90">


## Contact
**Omer Faruk Kodat**

- [GitHub](https://github.com/omerfarukkodat)
- [LinkedIn](https://linkedin.com/in/omerfarukkodat)
- [Email](mailto:farukkodat@gmail.com)
