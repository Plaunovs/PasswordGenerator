# -----------------------
# 1. FRONTEND BUILD
# -----------------------
FROM node:18-alpine AS frontend-builder
WORKDIR /app

COPY frontend ./frontend

WORKDIR /app/frontend
RUN npm install && npm run build

# -----------------------
# 2. GO BACKEND BUILD
# -----------------------
FROM golang:1.23-alpine AS go-builder
WORKDIR /app

RUN apk add --no-cache gcc g++ make git

COPY go.mod go.sum ./
RUN go mod download

COPY . .

COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

RUN go build -o PasswordGenerator .

# -----------------------
# 3. RUNTIME
# -----------------------
FROM alpine:latest
WORKDIR /app

COPY --from=go-builder /app/PasswordGenerator .

CMD ["./PasswordGenerator"]
