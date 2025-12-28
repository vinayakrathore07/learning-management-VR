# V-Learn – Learning Management System

A full-stack Learning Management System (LMS) built using a modern, cloud-native architecture.  
The platform supports role-based dashboards (Student / Teacher), secure video uploads, and scalable content delivery.

---

## 🚀 Overview
V-Learn is a personal project by **Vinayak Rathore**, designed to demonstrate real-world full-stack and cloud engineering concepts using AWS serverless services.

---

## 🛠 Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- ShadCN UI
- Clerk Authentication

### Backend & Cloud
- AWS Lambda (Container Image)
- API Gateway
- DynamoDB
- Amazon S3 (Private)
- Amazon CloudFront (CDN)

---

## ✨ Features
- Role-based dashboards (Student / Instructor)
- Course creation & editing
- Secure video uploads using **S3 presigned URLs**
- Private S3 bucket served via **CloudFront**
- Video playback with progress tracking
- Stripe integration for course enrollment
- Scalable serverless backend architecture

---

## 🔐 Security & Architecture Highlights
- Private S3 bucket with CloudFront Origin Access Control (OAC)
- Direct browser uploads using presigned URLs (no file uploads through Lambda)
- Environment-based configuration for frontend & backend
- Cloud-native, scalable, and cost-efficient design

---

## 📌 Project Type
Personal / Portfolio Project
