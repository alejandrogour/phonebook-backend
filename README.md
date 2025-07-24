# Phonebook Backend

Backend for the Phonebook application from Fullstack Open course (Part 3). Built with Node.js, Express, and Mongoose to manage contacts in MongoDB, including validations, error handling, and ESLint for code quality.

## Description
This RESTful server enables creating, reading, updating, and deleting contacts. Features include:
- React frontend integration (served in production from `/build`).
- Mongoose validations (name min 3 chars, number min 8 chars with format validation, unique names).
- Error middleware (CastError, ValidationError).
- Deployed on Render.

## Requirements
- Node.js v18+
- MongoDB URI (set in `.env` for development).

## Installation
```bash
npm install
```

## Basic Commands
- Development (with nodemon)
```bash
npm run dev
```
- Production
```bash
npm start
```
- Lint (check code with ESLint):
```bash
npm run lint
```
- Frontend build
```bash
npm run build:ui
```
or
```bash
npm run deploy:full
```

## Deployment
App deployed on Render: https://phonebook-backend-d2zy.onrender.com

## License
The University of Helsinki. Fullstack Open course 2025.