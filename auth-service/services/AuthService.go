package services

import (
	"github.com/Nguyenle23/Stocking-Microservices/database"
	"github.com/Nguyenle23/Stocking-Microservices/helpers"
	"github.com/Nguyenle23/Stocking-Microservices/middleware"
	"github.com/Nguyenle23/Stocking-Microservices/models"
	"github.com/Nguyenle23/Stocking-Microservices/repository"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func Register(c *fiber.Ctx) error {
	db := database.DB.Db
	user := new(models.User)

	if err := c.BodyParser(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Something's wrong with your input"})
	}

	if err := db.Where("email = ?", user.Email).First(&user).Error; err == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status": "error", "message": "Email already exists",
		})
	}

	if len(user.Password) < 6 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password must be at least 6 characters",
		})
	}

	hashedPass, _ := helpers.HashPassword(user.Password)
	user.Password = hashedPass
	err := db.Create(&user).Error
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"status": "error", "message": "Could not create user"})
	}

	return c.Status(201).JSON(fiber.Map{"message": "User Registered Successfully", "data": user})
}

func Login(c *fiber.Ctx) error {
	var input middleware.LoginInput

	if err := c.BodyParser(&input); err != nil {
		return c.SendStatus(fiber.StatusUnauthorized)
	}

	userData := repository.UserRepo(database.DB.Db).FindUserByEmail(input.Email)
	if userData.ID == uuid.Nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"status": "error", "message": "Email does not exists",
		})
	}

	pass := input.Password
	if !helpers.ValidatePassword(pass, userData.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"status": "error", "message": "Password incorrect",
		})
	}
	return c.Status(200).JSON(fiber.Map{"message": "Login Successful", "data": userData})
}