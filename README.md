# 🚀 Deployify

> A self-hosted, full-stack platform to deploy static frontend projects directly from a GitHub repository URL — with zero configuration.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-7-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![AWS S3](https://img.shields.io/badge/AWS-S3-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com/s3/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running with Docker Compose](#running-with-docker-compose)
  - [Running Locally (Development)](#running-locally-development)
- [API Reference](#-api-reference)
- [Deployment Pipeline](#-deployment-pipeline)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**Deployify** is a self-hosted platform inspired by services like Vercel and Netlify. You paste a public GitHub repository URL and Deployify will:

1. Clone the repository
2. Archive it and upload to AWS S3
3. Queue a deployment job via Redis
4. Build the project (`npm ci && npm run build`) inside a worker container
5. Serve the built `dist/` output via Nginx with a unique URL

All deployment status, build logs, and project history are tracked in MongoDB and visible on the dashboard.

---

## 🏗️ Architecture

```
                     ┌─────────────────────────────────┐
                     │           User (Browser)         │
                     └──────────────┬──────────────────┘
                                    │ HTTP
                     ┌──────────────▼──────────────────┐
                     │     Frontend  (React + Vite)     │
                     │           Port 5173              │
                     └──────────────┬──────────────────┘
                                    │ REST API
                     ┌──────────────▼──────────────────┐
                     │       Upload Service             │
                     │  (Express.js)  Port 8000         │
                     │  - Auth (JWT)                    │
                     │  - Clone GitHub Repo             │
                     │  - Zip & Upload to S3            │
                     │  - Enqueue to Redis              │
                     └──────┬────────────┬─────────────┘
                            │            │
               ┌────────────▼──┐   ┌────▼───────────────┐
               │    MongoDB    │   │   Redis Queue       │
               │  (Users +     │   │  "deployments"      │
               │  Deployments) │   │   list (BRPOP)      │
               └───────────────┘   └────┬───────────────┘
                                        │ Job picked up
                     ┌──────────────────▼──────────────┐
                     │       Deploy Service             │
                     │  (Worker process)                │
                     │  - Download zip from S3          │
                     │  - Unzip                         │
                     │  - npm ci + npm run build        │
                     │  - Atomic deploy to /var/www/    │
                     │  - Rollback on failure           │
                     └──────────────────┬──────────────┘
                                        │ Serve static files
                     ┌──────────────────▼──────────────┐
                     │       Nginx (Port 80)            │
                     │  /deploymentId/ → dist files    │
                     └─────────────────────────────────┘
```

---

## ✨ Features

- **One-click deploys** — Paste a GitHub repo URL and deploy in seconds
- **Async worker queue** — Redis-backed BRPOP queue decouples upload from build
- **Atomic deployments** — Temp → promote → backup pattern prevents partial deployments
- **Automatic rollback** — If a build fails, the previous deployment is restored
- **Build log tracking** — Every stage of the pipeline is logged to MongoDB
- **User authentication** — JWT + refresh token auth with bcrypt password hashing
- **Project dashboard** — View all deployments, status, logs, and live URLs
- **Dark mode** — Theme persisted to localStorage
- **S3-backed storage** — Archives uploaded to AWS S3 for durability
- **Fully Dockerized** — Single `docker-compose up` spins up the entire stack

---

## 🛠️ Tech Stack

### Frontend

| Technology       | Purpose                 |
| ---------------- | ----------------------- |
| React 19         | UI framework            |
| Vite 8           | Build tool & dev server |
| Tailwind CSS 4   | Utility-first styling   |
| React Router 7   | Client-side routing     |
| TanStack Query 5 | Server state & caching  |
| Axios            | HTTP client             |
| Framer Motion    | Animations              |
| Lucide React     | Icon library            |

### Backend — Upload Service

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| Express.js 5 | REST API framework          |
| simple-git   | GitHub repository cloning   |
| archiver     | Zip archive creation        |
| AWS SDK v3   | S3 uploads                  |
| ioredis      | Redis client & job queueing |
| Mongoose     | MongoDB ODM                 |
| bcrypt       | Password hashing            |
| jsonwebtoken | JWT auth                    |

### Backend — Deploy Service (Worker)

| Technology    | Purpose                    |
| ------------- | -------------------------- |
| Node.js (ESM) | Worker runtime             |
| ioredis       | Redis BRPOP consumer       |
| AWS SDK v3    | S3 zip download            |
| unzipper      | Zip extraction             |
| child_process | `npm ci` / `npm run build` |
| Mongoose      | Deployment status updates  |

### Infrastructure

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| Docker + Compose | Container orchestration    |
| Nginx            | Static file serving & gzip |
| Redis 7          | Deployment job queue       |
| MongoDB          | Users & deployment records |
| AWS S3           | Archive storage            |

---

## 🖼️ Screenshots

Below are screenshots of the running frontend UI and dashboard.

![App screenshot - Landing Page](ScreenShot/Screenshot%202026-06-14%20000307.png)

![App screenshot - Dashboard](ScreenShot/Screenshot%202026-06-14%20000345.png)

---

## 📁 Project Structure

```
Project01/
├── docker-compose.yml           # Orchestrates all services
├── nginx.conf                   # Root-level Nginx config
│
├── nginx/
│   └── default.conf             # Nginx virtual host — serves /deploymentId/
│
├── Frontend/                    # React + Vite SPA
│   ├── Dockerfile
│   ├── nginx.conf               # Nginx config for SPA (history fallback)
│   ├── index.html               # App entry point ("Deployify" title)
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── routes/
│       │   ├── AppRoutes.jsx    # Route definitions
│       │   └── ProtectRoutes.jsx# Auth-guarded routes
│       ├── pages/
│       │   ├── LandingPage.jsx
│       │   └── ProjectPage.jsx
│       ├── components/
│       │   ├── LandingPage/     # Hero, Navbar, CTA, FAQ, Workflow, Footer
│       │   ├── Login/           # Login & Register forms
│       │   ├── ProjectsPage/    # Dashboard, Sidebar, ProjectCards, ProjectDetails, ProjectForm
│       │   └── common/          # ThemeToggle, ProfileAvatar
│       ├── context/
│       │   └── authContext.jsx  # Auth context provider
│       ├── hooks/
│       │   └── useTheme.js      # Dark/light mode hook
│       └── Api/
│           ├── apiFetcher.js    # Axios instance
│           └── queryHooks.js    # TanStack Query hooks
│
├── Upload_Service/              # Express REST API
│   ├── Dockerfile
│   └── src/
│       ├── server.js            # Entry — DB connect + listen
│       ├── index.js             # Express app + routes
│       ├── database/db.js
│       ├── Middleware/
│       │   └── Auth.middleware.js  # JWT verification
│       ├── feature/
│       │   ├── Users/           # user.model, user.controller, user.route
│       │   ├── cloning/         # Cloning.controller, cloning.route
│       │   └── deployment/      # deployment.model
│       ├── service/
│       │   ├── Cloning.service.js   # simple-git clone
│       │   ├── archive.service.js   # zip creation
│       │   ├── redis.service.js     # LPUSH to queue
│       │   └── UploadingToS3.js     # S3 upload/check/delete
│       └── utility/
│           ├── asyncHandler.js
│           ├── ApiError.js
│           ├── ApiResponse.js
│           └── FileArrMaker.js
│
└── Deploy_Service/              # Background worker
    ├── Dockerfile
    └── src/
        ├── index.js             # Entry — DB connect + startWorker()
        ├── config/redis.js      # ioredis connection
        ├── database/db.js
        ├── worker/
        │   └── deployment.worker.js  # Infinite BRPOP loop
        ├── deployment/
        │   └── deployment.model.js
        └── service/
            ├── processDeployment.service.js  # Orchestrator
            ├── Download.service.js           # S3 zip download
            ├── unzip.service.js              # Extraction
            └── deploy.service.js             # Build + atomic deploy + rollback
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) (v2+)
- An [AWS account](https://aws.amazon.com/) with an S3 bucket created
- A [MongoDB](https://www.mongodb.com/atlas) database (Atlas free tier works)
- Node.js 18+ and [Bun](https://bun.sh/) (for local development only)

---

### Environment Variables

You need to create `.env` files for each service before starting.

#### `Upload_Service/.env`

```env
PORT=8000
CORS_ORIGIN=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/deployify

# JWT
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

# AWS S3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your-s3-bucket-name
```

#### `Deploy_Service/.env`

```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/deployify

# Redis
REDIS_URL=redis://redis:6379

# AWS S3
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your-s3-bucket-name

# The base URL where deployed projects are accessible
DEPLOYMENT_BASE_URL=http://localhost
```

#### `Frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

---

### Running with Docker Compose

```bash
# 1. Clone the repository
git clone https://github.com/nitin9706/Project01.git
cd Project01

# 2. Create all .env files as described above

# 3. Build and start all services
docker compose up --build

# 4. Access the app
#    Frontend  →  http://localhost:5173
#    API       →  http://localhost:8000
#    Deployed projects → http://localhost/<deploymentId>/
```

To stop:

```bash
docker compose down
```

To stop and remove volumes:

```bash
docker compose down -v
```

---

### Running Locally (Development)

> You'll need Redis and MongoDB running locally or via Docker.

```bash
# Start Redis via Docker (if not already running)
docker run -d -p 6379:6379 redis:7-alpine

# --- Upload Service ---
cd Upload_Service
bun install
bun run dev        # runs on http://localhost:8000

# --- Deploy Service (Worker) ---
cd ../Deploy_Service
bun install
bun run dev        # starts the worker loop

# --- Frontend ---
cd ../Frontend
bun install
bun run dev        # runs on http://localhost:5173
```

---

## 📡 API Reference

Base URL: `http://localhost:8000/api/v1`

All protected routes require an `Authorization: Bearer <token>` header.

### Auth — `/api/v1/user`

| Method | Endpoint         | Auth | Description                             |
| ------ | ---------------- | ---- | --------------------------------------- |
| `POST` | `/register`      | ❌   | Register a new user                     |
| `POST` | `/login`         | ❌   | Login, returns access + refresh tokens  |
| `POST` | `/logout`        | ✅   | Invalidate refresh token                |
| `POST` | `/refresh-token` | ❌   | Rotate access token using refresh token |

### Deployments — `/api/v1/clone`

| Method   | Endpoint | Auth | Description                                    |
| -------- | -------- | ---- | ---------------------------------------------- |
| `POST`   | `/`      | ✅   | Clone a GitHub repo URL and queue a deployment |
| `GET`    | `/`      | ✅   | Get all deployments for the logged-in user     |
| `GET`    | `/:id`   | ✅   | Get a specific deployment by ID                |
| `DELETE` | `/:id`   | ✅   | Delete a deployment (removes from DB + S3)     |

**POST `/api/v1/clone` — Request Body**

```json
{
  "repoUrl": "https://github.com/username/my-react-app.git"
}
```

**Response**

```json
{
  "statusCode": 200,
  "data": {
    "success": true,
    "id": "abc1234xyz",
    "archiveUrl": "https://s3.amazonaws.com/bucket/archives/abc1234xyz.zip",
    "deploymentDoc": {
      "deploymentId": "abc1234xyz",
      "projectName": "my-react-app",
      "status": "queued",
      "buildLogs": ["Cloning repository... "],
      "userId": "..."
    }
  },
  "message": "Repository uploaded successfully and queued"
}
```

---

## ⚙️ Deployment Pipeline

The following stages happen automatically after you submit a repository URL:

```
[User submits GitHub URL]
        │
        ▼
[Upload Service]
  1. Clone repo locally with simple-git
  2. Generate unique 10-char alphanumeric ID
  3. Zip the cloned folder with archiver
  4. Create Deployment record in MongoDB (status: "queued")
  5. Upload zip to S3 at key: archives/<id>.zip
  6. LPUSH job payload to Redis "deployments" list
  7. Cleanup local clone + zip
  8. Return 200 with deployment doc
        │
        ▼
[Deploy Service Worker — BRPOP blocks until job arrives]
  9.  Download zip from S3
  10. Extract zip to /var/www/deployments/<id>-tmp
  11. Verify package.json exists
  12. Run npm ci (dependency install, 5-min timeout)
  13. Update DB status → "building"
  14. Run npm run build
  15. Copy dist/ to temp path
  16. Backup previous deployment (if exists)
  17. Atomic rename: tmp → final path
  18. Remove backup
  19. Update DB status → "success", set URL
  20. Cleanup lock file + source folder
        │
        ▼
[Nginx serves /deploymentId/ from /var/www/deployments/<id>/]
```

If any step from 9–19 fails:

- DB `error` field is set
- Temp deployment is cleaned up
- Previous deployment is **rolled back** from backup

---

## Deployment Status Values

| Status     | Meaning                                      |
| ---------- | -------------------------------------------- |
| `queued`   | Job pushed to Redis, waiting for worker      |
| `building` | Worker is running `npm ci` + `npm run build` |
| `success`  | Build complete, project is live              |
| `failed`   | An error occurred; see `error` field in DB   |

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/your-username/Project01.git
cd Project01

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes, then commit
git commit -m "feat: describe your change"

# Push and open a Pull Request
git push origin feature/your-feature-name
```

Please make sure your changes:

- Follow the existing code style
- Do not break the Docker Compose setup
- Include relevant updates to this README if needed

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/nitin9706">nitin9706</a>
</p>
