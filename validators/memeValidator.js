import { body } from "express-validator";

export const validateCreateMeme = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 1, max: 50 })
    .withMessage("El título debe tener entre 1 y 50 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 1, max: 200 })
    .withMessage("La descripción debe tener entre 1 y 200 caracteres"),

  body("imagen")
    .notEmpty()
    .withMessage("La URL de la imagen es obligatoria")
    .isURL()
    .withMessage("Debe ser una URL válida")
    .isLength({ max: 2083 })
    .withMessage("La URL de la imagen debe tener un máximo de 2083 caracteres"),
];

export const validateUpdateMeme = [
  body("title")
    .optional() // El campo es opcional para la actualización
    .isLength({ min: 1, max: 50 })
    .withMessage("El título debe tener entre 1 y 50 caracteres"),

  body("description")
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage("La descripción debe tener entre 1 y 200 caracteres"),

  body("imagen")
    .optional()
    .isURL()
    .withMessage("Debe ser una URL válida")
    .isLength({ max: 2083 })
    .withMessage("La URL de la imagen debe tener un máximo de 2083 caracteres"),
];
