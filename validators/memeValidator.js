import { body } from 'express-validator';

export const validateCreateMeme = [
  body('nombre')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ min: 1, max: 50 })
    .withMessage('El título debe tener entre 1 y 50 caracteres'),

  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es obligatoria')
    .isLength({ min: 1, max: 200 })
    .withMessage('La descripción debe tener entre 1 y 200 caracteres'),

  body('url')
    .notEmpty()
    .withMessage('La URL de la imagen es obligatoria')
    .isURL()
    .withMessage('Debe ser una URL válida')
    .isLength({ max: 2083 })
    .withMessage('La URL de la imagen debe tener un máximo de 2083 caracteres'),
];

export const validateUpdateMeme = [
  body('nombre')
    .optional() // El campo es opcional para la actualización
    .isLength({ min: 1, max: 50 })
    .withMessage('El título debe tener entre 1 y 50 caracteres'),

  body('descripcion')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('La descripción debe tener entre 1 y 200 caracteres'),

  body('url')
    .optional()
    .isURL()
    .withMessage('Debe ser una URL válida')
    .isLength({ max: 2083 })
    .withMessage('La URL de la imagen debe tener un máximo de 2083 caracteres'),
];
