## Conventions
- Base URL: `http://<host>:5002/api`
- Authentication: OTP-based auth issues JWT bearer tokens; include `Authorization: Bearer <token>` unless noted.
- Roles: `user`, `provider`, `admin`. Endpoints specify required role(s).
- Formats: JSON bodies/responses, UTC timestamps (ISO 8601), amounts as decimal strings.

## 1. Authentication & Profile
- **POST** `/auth/login` *(public)*
  - Body: `{ "phone_number": "<10/12-digit number without +91>" }`
  - Response: `{ "message": "OTP sent successfully", "phone": "+91XXXXXXXXXX", "session_id": "<sid>" }`
- **POST** `/auth/verify` *(public)*
  - Body: `{ "phone_number": "+91XXXXXXXXXX", "otp": "123456" }`
  - Response (registered user): `{ "verified": true, "registered": true, "token": "<jwt>", "user": { ... } }`
  - Response (new user): `{ "verified": true, "registered": false }`
- **POST** `/auth/register` *(public; requires prior OTP verification)*
  - Body: `{ "full_name": "", "email": "", "gender": "", "state": "", "city": "" }`
  - Response: `{ "message": "User registered successfully", "user": { ... } }`
- **POST** `/auth/verify-register` *(public)*
  - Body: `{ "phone_number": "+91...", "otp": "123456" }`
  - Response: `{ "verified": true, "message": "Phone verified for registration" }`
- **PUT** `/user/profile/update` *(user)*
  - Body: `{ "full_name": "", "email": "", "gender": "", "state": "", "city": "" }`
  - Response: `{ "message": "Profile updated", "user": { ... } }`

## 2. Category & Service Management
- **POST** `/admin/categories` *(admin)*
  - Body: `{ "name": "", "description": "", "image": "" }`
  - Response: `{ "category": { ... } }`
- **POST** `/admin/subcategories` *(admin)*
  - Body: `{ "category_id": 1, "name": "", "price": "999.00", "description": "", "image": "" }`
  - Response: `{ "subcategory": { ... } }`
- **GET** `/user/services` *(user)*
  - Response: `{ "categories": [ { "id": 1, "name": "", "subcategories": [ ... ] } ] }`

## 3. Provider Management
- **POST** `/provider/register` *(public)*
  - Body: `{ "full_name": "", "phone_number": "", "email": "", "address": "", "city": "", "state": "", "services_provided": [] }`
  - Response: `{ "message": "Provider registration submitted", "status": "verification_in_progress" }`
- **PUT** `/admin/provider/verify/<provider_id>` *(admin)*
  - Body: `{ "status": "verified" | "rejected", "notes": "" }`
  - Response: `{ "message": "Provider status updated", "provider": { ... } }`
- **GET** `/provider/top` *(public)*
  - Query: `limit` (optional)
  - Response: `{ "providers": [ { "id": 1, "full_name": "", "completed_appointments": 42, "rating": 4.8 } ] }`
- **POST** `/provider/services/add` *(provider; verified)*
  - Body: `{ "service_name": "", "description": "", "price": "1499.00" }`
  - Response: `{ "service": { ... } }`
- **GET** `/provider/services` *(provider)*
  - Response: `{ "services": [ ... ] }`
- **GET** `/provider/<provider_id>` *(public)*
  - Response: `{ "provider": { "details": { ... }, "reviews": [ ... ] } }`

## 4. Pet & Address Management (User)
- **POST** `/user/pets` *(user)*
  - Body: `{ "type": "", "name": "", "breed": "", "birth_date": "YYYY-MM-DD", "gender": "" }`
  - Response: `{ "pet": { ... } }`
- **GET** `/user/pets` *(user)*
  - Response: `{ "pets": [ ... ] }`
- **POST** `/user/address` *(user)*
  - Body: `{ "address": "", "city": "", "state": "", "pincode": "", "country": "" }`
  - Response: `{ "address": { ... } }`
- **GET** `/user/address` *(user)*
  - Response: `{ "addresses": [ ... ] }`
- **POST** `/user/insurance/add` *(user)*
  - Body: `{ "pet_type": "", "breed": "", "pet_name": "", "pet_age": "", "owner_name": "", "email": "", "contact": "", "insurance_type": "" }`
  - Response: `{ "message": "Insurance details saved" }`
- **GET** `/admin/insurance/list` *(admin)*
  - Response: `{ "insurances": [ ... ] }`

## 5. Booking & Appointment Lifecycle
- **POST** `/user/book` *(user)*
  - Body: `{ "user_id": "", "pet_id": "", "category_id": "", "subcategory_id": "", "provider_id": "", "full_name": "", "email": "", "contact_number": "", "pincode": "", "address": "", "state": "", "country": "", "preferred_date": "YYYY-MM-DD", "preferred_time": "HH:MM", "payment_method": "pay_now" | "pay_after" }`
  - Response: `{ "booking": { "status": "pending", ... } }`
- **GET** `/user/appointments/ongoing` *(user)*
  - Response: `{ "bookings": [ ... ] }`
- **GET** `/user/appointments/history` *(user)*
  - Response: `{ "bookings": [ ... ] }`
- **PUT** `/provider/booking/accept/<booking_id>` *(provider; verified)*
  - Response: `{ "message": "Booking accepted", "status": "accepted" }`
- **POST** `/provider/appointment/cancel/<booking_id>` *(provider)*
  - Body: `{ "reason": "" }`
  - Response: `{ "message": "Booking cancelled", "status": "cancelled" }`
- **POST** `/provider/location/update` *(provider; accepted booking)*
  - Body: `{ "booking_id": "", "latitude": 0.0, "longitude": 0.0 }`
  - Response: `{ "message": "Location updated" }`
- **GET** `/user/track/<booking_id>` *(user)*
  - Response: `{ "booking_id": "", "latitude": 0.0, "longitude": 0.0, "updated_at": "" }`
- **GET** `/admin/track/<booking_id>` *(admin)*
  - Response: same as user track plus provider metadata.
- **PUT** `/provider/location/stop/<booking_id>` *(provider)*
  - Response: `{ "message": "Tracking stopped", "final_coordinates": { ... } }`

## 6. Payment & Completion
- **POST** `/payment/request` *(provider)*
  - Body: `{ "booking_id": 0, "provider_id": 0, "user_id": 0, "amount": "0.00", "service_name": "", "user_phone": "" }`
  - Response: `{ "message": "Payment link sent", "payment_link": "", "razorpay_order_id": "" }`
- **POST** `/payment/webhook` *(razorpay callback)*
  - Body: Razorpay payload
  - Response: `{ "received": true }`
- **POST** `/booking/complete/<booking_id>` *(provider)*
  - Body: `{ "otp": "123456" }`
  - Response: `{ "message": "Booking completed", "status": "completed" }`

## 7. Reviews & Ratings
- **POST** `/user/review` *(user)*
  - Body: `{ "appointment_id": 0, "provider_id": 0, "rating": 4.5, "comment": "" }`
  - Response: `{ "review": { ... } }`
- **GET** `/provider/<provider_id>/reviews` *(public)*
  - Response: `{ "reviews": [ ... ], "average_rating": 4.7 }`
- **POST** `/user/app-rating` *(user)*
  - Body: `{ "rating": 5, "feedback": "" }`
  - Response: `{ "message": "Thanks for your feedback" }`

## 8. Ticketing & Messaging
- **POST** `/user/ticket` *(user)*
  - Body: `{ "user_id": 0, "order_id": 0, "title": "", "message": "" }`
  - Response: `{ "ticket": { "status": "ongoing", ... } }`
- **POST** `/ticket/message` *(user/provider/admin aligned with ticket)*
  - Body: `{ "ticket_id": 0, "sender_id": 0, "message": "" }`
  - Response: `{ "message": "Message posted" }`
- **PUT** `/admin/ticket/<ticket_id>/close` *(admin)*
  - Response: `{ "message": "Ticket closed", "status": "closed" }`
- **GET** `/user/messages` *(user)*
  - Response: `{ "messages": [ ... ] }`

## 9. Admin Operations
- **GET** `/admin/users` *(admin)*
- **GET** `/admin/providers` *(admin)*
- **GET** `/admin/appointments` *(admin)*
- **GET** `/admin/reviews` *(admin)*
- **GET** `/admin/problems` *(admin)*
- Responses: Paginated lists with filters, metadata `{ "data": [ ... ], "pagination": { ... } }`

## 10. Automation Hooks
- **POST** `/jobs/booking-auto-cancel` *(internal/scheduled; admin token)*
  - Body: `{ "booking_id": 0 }`
  - Response: `{ "message": "Booking auto-cancelled" }`
- **POST** `/jobs/location-heartbeat` *(internal/scheduled)*
  - Body: `{ "booking_id": 0, "latitude": 0.0, "longitude": 0.0 }`
  - Response: `{ "message": "Heartbeat recorded" }`

## Error Model
- Error responses follow `{ "error": { "code": "", "message": "", "details": {} } }`.
- Common codes: `validation_error`, `authentication_failed`, `authorization_failed`, `not_found`, `conflict`, `internal_error`.

## Rate Limiting & Security
- OTP endpoints: 5 per phone per hour.
- Booking and payment updates: audit trail with immutable history.
- All state-changing admin endpoints require MFA-protected tokens.

