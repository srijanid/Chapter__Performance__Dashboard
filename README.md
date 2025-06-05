# Chapter Performance Dashboard

A backend-focused project designed to simulate real-world scenarios involving API design, data filtering, caching (including Redis), and performance optimization.

## 🚀 Overview

This project aims to replicate real-world backend requirements by implementing:

* RESTful API design
* Data filtering mechanisms
* Caching strategies (Redis)
* Performance optimization techniques

The goal is to create a performance dashboard that can handle various backend challenges efficiently.

## 🛠️ Features

* **API Design**: Structured endpoints following REST principles.
* **Data Filtering**: Efficient querying and filtering of data sets.
* **Caching**: Implementation of caching using Redis to reduce load times and server stress.
* **Performance Optimization**: Techniques to enhance response times and handle high traffic.

## 📁 Project Structure

```
Chapter__Performance__Dashboard/
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── db/
│   ├── uploads/
│   ├── data/
│   └── app.js
├── docker-compose.yml
└── README.md
```

* `server/`: Contains the main application code, including controllers, routes, services, middlewares, and models.
* `docker-compose.yml`: Docker configuration for setting up the development environment, including MongoDB and Redis.

## 🐳 Getting Started with Docker

### Prerequisites

* [Docker](https://www.docker.com/get-started) installed on your machine.

### Steps

1. **Clone the Repository**

```bash
git clone https://github.com/srijanid/Chapter__Performance__Dashboard.git
cd Chapter__Performance__Dashboard
```

2. **Start the Containers**

```bash
docker-compose up --build
```

3. **Access the Application**

The application will be running at:
👉 `http://localhost:8000`

## 🧪 API Endpoints

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/api/chapters`     | Retrieve all chapters       |
| GET    | `/api/chapters/:id` | Retrieve a specific chapter |
| POST   | `/api/chapters`     | Upload chapters (only Admin)|
| DELETE | `/api/chapters/:id` | Delete a chapter            |

> ⚠️ Note: Replace `:id` with the actual chapter ID.

## 🧰 Technologies Used

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Dockerized)
* **Caching**: Redis (Dockerized)
* **Containerization**: Docker, Docker Compose

## 📈 Performance Optimization Techniques

* **Caching**: Redis is used to store frequently accessed chapter data to minimize database queries.
* **Efficient Queries**: Optimized MongoDB queries to reduce response time.
* **Load Handling**: Designed for scalability and faster response under high traffic.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


Made by [@srijanid](https://github.com/srijanid)
