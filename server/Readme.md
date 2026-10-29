# ⚙️ Wanderlust — Backend API

The Express and MongoDB REST API for **Wanderlust**, a travel booking platform. It manages destinations and bookings, and verifies the JWTs issued by the Better Auth server in the frontend.

| | URL |
|---|---|
| **Live API (production)** | https://wanderlust-backend-xi.vercel.app/ |
| **Local** | http://localhost:5000 |
| **Frontend** | https://wanderlust-client-xi-pi.vercel.app/ |

---

## 🧰 Tech stack

- **Node.js** and **Express** (ES modules)
- **MongoDB** (official `mongodb` driver)
- **jose** to verify JWTs against the auth server's JWKS
- `cors` and `dotenv`

## 🚀 Getting started

```bash
# install dependencies
npm install

# start the server (http://localhost:5000)
npm start
```

> The server uses top-level `await` and ES modules, so `package.json` needs `"type": "module"` and Node.js 18 or newer.

### Environment variables

| Variable | Description | Example |
|---|---|---|
| `MONGODB_DATABASE` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `BASE_URL` | URL of the frontend that runs Better Auth. JWTs are verified with `${BASE_URL}/api/auth/jwks` | `https://wanderlust-client-xi-pi.vercel.app` |
| `PORT` | Port to listen on (default `5000`) | `5000` |

Database: `wanderlust-travel-booking` · Collections: `destination`, `bookings`

## 🔐 Authentication

Protected routes need a JWT from the Better Auth client:

```
Authorization: Bearer <JWT>
```

The frontend gets the token with `authClient.token()`. The API checks the token's signature against the public keys at `${BASE_URL}/api/auth/jwks`.

| Response | Meaning |
|---|---|
| `401` | The `Authorization` header or the token is missing |
| `500` | The token could not be verified |

## 🗂️ Data models

### Destination

```json
{
  "_id": "665f1c...",
  "name": "Bali Paradise",
  "country": "Indonesia",
  "category": "Beach",
  "price": 1299,
  "duration": "7 Days/6 Nights",
  "departureDate": "2026-12-20",
  "imageUrl": "https://example.com/image.jpg",
  "description": "A relaxing week on the island..."
}
```

Categories used by the frontend: `Beach`, `Adventure`, `Culture`, `Luxury`, `Romantic`, `Nature`, `City`.

### Booking

```json
{
  "_id": "666a2b...",
  "userId": "user_123",
  "userName": "Jane Doe",
  "email": "jane@example.com",
  "destinationId": "665f1c...",
  "destinationName": "Bali Paradise",
  "destinationImage": "https://example.com/image.jpg",
  "country": "Indonesia",
  "category": "Beach",
  "price": 1299,
  "duration": "7 Days/6 Nights",
  "departureDate": "2026-12-20",
  "bookingDate": "2026-10-29T10:15:00.000Z"
}
```

## 📡 API endpoints

Base URL: `https://wanderlust-backend-xi.vercel.app`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/` | Public | Health check |
| `GET` | `/all-destinations` | Public | List all destinations |
| `GET` | `/featured-destination` | Public | First 5 destinations (home carousel) |
| `GET` | `/all-destinations/:id` | JWT | Get one destination by ID |
| `POST` | `/add-destination` | Public | Create a destination |
| `PATCH` | `/all-destinations/:id` | Public | Update a destination |
| `DELETE` | `/all-destinations/:id` | Public | Delete a destination |
| `POST` | `/booking` | JWT | Create a booking |
| `GET` | `/bookings?userId=` | JWT | List a user's bookings |
| `DELETE` | `/booking/:id?userId=` | JWT | Cancel a booking |

> "Public" means the API itself does not check a token on that route. The frontend still only shows these actions to logged-in users. See the [roadmap](#-roadmap).

All error responses have the shape `{ "message": "..." }`.


