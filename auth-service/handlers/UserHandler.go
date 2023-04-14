package handlers

import (
	"github.com/Nguyenle23/Stocking-Microservices/database"
	"github.com/Nguyenle23/Stocking-Microservices/helpers"
	"github.com/Nguyenle23/Stocking-Microservices/models"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func GetAllUsers(c *fiber.Ctx) error {
	db := database.DB.Db
	var users []models.User

	db.Find(&users)

	if len(users) == 0 {
		return c.Status(404).JSON(fiber.Map{"message": "No users in database"})
	}
	return c.Status(200).JSON(fiber.Map{"data": users, "total": len(users)})
}

func GetUserID(c *fiber.Ctx) error {
	db := database.DB.Db
	id := c.Params("id")

	var user models.User
	db.Find(&user, "id = ?", id)

	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"message": "User not found with ID " + id})
	}
	return c.Status(200).JSON(fiber.Map{"data": user})
}

func UpdateUser(c *fiber.Ctx) error {
	type updateUser struct {
		Password string `json:"password"`
	}

	db := database.DB.Db
	var user models.User

	id := c.Params("id")
	db.Find(&user, "id = ?", id)

	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"message": "User not found"})
	}

	var updateUserData updateUser
	err := c.BodyParser(&updateUserData)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "Invalid input"})
	}

	if len(updateUserData.Password) < 6 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Password must be at least 6 characters",
		})
	}
	hashedPass, _ := helpers.HashPassword(updateUserData.Password)
	user.Password = hashedPass
	db.Save(&user)
	return c.Status(200).JSON(fiber.Map{"message": "Update user successfully", "data": user})
}

func DeleteUserByID(c *fiber.Ctx) error {
	db := database.DB.Db
	var user models.User

	id := c.Params("id")
	db.Find(&user, "id = ?", id)

	if user.ID == uuid.Nil {
		return c.Status(404).JSON(fiber.Map{"message": "User not found", "data": nil})
	}

	err := db.Delete(&user, "id = ?", id).Error
	if err != nil {
		return c.Status(404).JSON(fiber.Map{"message": "Failed to delete user", "data": nil})
	}

	return c.Status(200).JSON(fiber.Map{"message": "User deleted successfully"})
}
