# TravelMate RESTful API Specification

The TravelMate backend provides a secure, role-based REST API for holiday package browsing, itinerary booking, online payments, user reviews, and administrative inventory management.

---

## 1. Base URL & Security
- **Base URL**: `http://localhost:8080/api`
- **Authentication**: Bearer Token (JWT - JSON Web Token)
- Include in HTTP headers:
  ```http
  Authorization: Bearer <your-jwt-token>
  ```
- **Interactive Documentation**: Swagger UI available at `http://localhost:8080/swagger-ui.html`

---

## 2. Authentication Endpoints (`/api/auth`)

### 2.1 User Login
- **Endpoint**: `POST /api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "rohit.sharma",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": "Bearer",
    "id": 2,
    "username": "rohit.sharma",
    "email": "rohit@example.com",
    "role": "ROLE_USER",
    "fullName": "Rohit Sharma"
  }
  ```

### 2.2 User Registration
- **Endpoint**: `POST /api/auth/register`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "username": "amit.verma",
    "email": "amit@example.com",
    "password": "password123",
    "fullName": "Amit Verma",
    "phone": "+91-9871122334"
  }
  ```

---

## 3. Destination Endpoints (`/api/destinations`)

- `GET /api/destinations` — List all destinations (supports `?category=Beach` and `?search=Goa`)
- `GET /api/destinations/{id}` — Get single destination details with its packages
- `POST /api/destinations` — Create destination (Admin only)
- `PUT /api/destinations/{id}` — Update destination (Admin only)
- `DELETE /api/destinations/{id}` — Delete destination (Admin only)

---

## 4. Package Endpoints (`/api/packages`)

- `GET /api/packages` — Browse all packages (supports `?featured=true`, `?destinationId=1`, `?maxPrice=50000`)
- `GET /api/packages/{id}` — Get package full itinerary, inclusions, and reviews
- `POST /api/packages` — Add travel package (Admin only)
- `PUT /api/packages/{id}` — Modify package details (Admin only)
- `DELETE /api/packages/{id}` — Remove package (Admin only)

---

## 5. Booking Endpoints (`/api/bookings`)

### 5.1 Create Booking
- **Endpoint**: `POST /api/bookings`
- **Access**: Authenticated (`ROLE_USER`, `ROLE_ADMIN`)
- **Request Body**:
  ```json
  {
    "packageId": 1,
    "travelDate": "2026-11-20",
    "numberOfTravelers": 2,
    "specialRequests": "Airport pickup needed at 3 PM."
  }
  ```
- **Response (201 Created)**: Returns booking object with auto-generated reference (e.g. `TM-2026-GOA-101`) and calculated `totalPrice`.

### 5.2 Get User Bookings
- **Endpoint**: `GET /api/bookings/my-bookings`
- **Access**: Authenticated

### 5.3 Admin: Get All Bookings
- **Endpoint**: `GET /api/bookings`
- **Access**: `ROLE_ADMIN`

### 5.4 Update Booking Status
- **Endpoint**: `PATCH /api/bookings/{id}/status`
- **Access**: `ROLE_ADMIN`
- **Request Body**: `{"status": "CONFIRMED"}` *(PENDING, CONFIRMED, COMPLETED, CANCELLED)*

---

## 6. Payment Endpoints (`/api/payments`)

### 6.1 Process Payment
- **Endpoint**: `POST /api/payments`
- **Request Body**:
  ```json
  {
    "bookingId": 1,
    "paymentMethod": "UPI",
    "amount": 29998.00
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "transactionId": "TXN-98234-UP1",
    "bookingId": 1,
    "amount": 29998.00,
    "paymentMethod": "UPI",
    "paymentStatus": "SUCCESS"
  }
  ```

---

## 7. Review Endpoints (`/api/reviews`)

- `GET /api/reviews/package/{packageId}` — List reviews for a specific package
- `POST /api/reviews` — Submit traveler feedback and 1-5 star rating

---

## 8. User Profile Endpoints (`/api/users`)

- `GET /api/users/me` — Current user profile
- `PUT /api/users/profile` — Update contact information & address
- `GET /api/users/admin/stats` — Administrator dashboard statistics (total bookings, revenue, active travelers, packages)
