const express = require('express');
const studentsRouter = express.Router();
const apiKeyAuth = require('../middleware/apiKeyAuth');
const studentSchema = require('../schemas/studentsSchemas');


studentsRouter.get('/estudiantes',
    apiKeyAuth,
    (req, res) => {
        studentSchema
            .find()
            .then((data) => {
                res.status(201).json({
                    message: 'Consulta exitosa',
                    students: data,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Hubo un error al hacer la consulta',
                    error: error.message
                });
            });
    });

studentsRouter.get('/consultar-alumno/:grade',
    apiKeyAuth,
    (req, res) => {
        const grade = req.params.grade.toLowerCase();

        studentSchema
            .find({ grade: grade })
            .then((data) => {
                if (data.length === 0) {
                    res.status(200).json({
                        message: 'No hay estudiantes en ese grado',
                        students: data,
                    });
                } else {
                    res.status(200).json({
                        message: 'Consulta exitosa',
                        students: data,
                    });
                }
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Hubo un error al hacer la consulta',
                    error: error.message
                });
            });
    });

studentsRouter.get('/student-by-id/:id',
    apiKeyAuth,
    (req, res) => {
        const id = req.params.id.toLowerCase();

        studentSchema
            .find({ _id: id })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Hubo un error al hacer la consulta',
                    error: error.message
                });
            });
    });

studentsRouter.post('/crear-alumno',
    apiKeyAuth,
    (req, res) => {
    const student = studentSchema(req.body);
    student
        .save()
        .then((data) => {
            res.status(201).json({
                message: 'Estudiante creado exitosamente',
                student: data,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Hubo un error al crear al estudiante',
                error: error.message
            });
        });
});

studentsRouter.patch('/editar-alumno/:id',
    apiKeyAuth,
    (req, res) => {
        const { id } = req.params;
        const updateData = req.body;

        studentSchema
            .findByIdAndUpdate(id, updateData, { new: true })
            .then((updatedStudent) => {
                if (!updatedStudent) {
                    return res.status(404).json({
                        message: 'No se encontró un estudiante con ese ID'
                    });
                }
                res.status(200).json({
                    message: 'Estudiante actualizado exitosamente',
                    student: updatedStudent,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Hubo un error al actualizar el estudiante',
                    error: error.message
                });
            });
    });

studentsRouter.delete('/eliminar-alumno/:id',
    apiKeyAuth,
    (req, res) => {
        const { id } = req.params;

        studentSchema
            .findByIdAndDelete(id)
            .then((deletedStudent) => {
                if (!deletedStudent) {
                    return res.status(404).json({
                        message: 'No se encontró un estudiante con ese ID'
                    });
                }
                res.status(200).json({
                    message: 'Estudiante eliminado exitosamente',
                    student: deletedStudent,
                });
            })
            .catch((error) => {
                res.status(500).json({
                    message: 'Hubo un error al eliminar el estudiante',
                    error: error.message
                });
            });
    });

module.exports = studentsRouter;
