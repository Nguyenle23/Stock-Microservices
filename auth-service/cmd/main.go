package main

import (
	"github.com/Nguyenle23/Stocking-Microservices/database"
	"github.com/Nguyenle23/Stocking-Microservices/routers"
	"github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    database.ConnectDb()
    app := fiber.New()
    app.Use(cors.New())
    routers.SetupRoutes(app)
    app.Listen(":8080")
}