# Task Manager SaaS Dashboard

A full-stack task management application with analytics dashboard.

Live Demo:  
https://task-manager-saas-tau.vercel.app/

## Features

- Create, complete, and delete tasks
- Real-time analytics dashboard
- Persistent PostgreSQL database
- REST API backend
- Fully deployed cloud architecture

## Tech Stack

Frontend:
- React
- Chart.js
- JavaScript
- CSS

Backend:
- Node.js
- Express.js
- REST API

Database:
- PostgreSQL

DevOps:
- Docker
- Railway (backend + database)
- Vercel (frontend)

## Architecture

Frontend (Vercel)
↓  
Node.js API (Railway)
↓  
PostgreSQL Database (Railway)

## API Endpoints

GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id/toggle  
DELETE /api/tasks/:id  

GET /api/stats
