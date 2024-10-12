const express = require('express');
const {
    handleCreateUser,
    handleFindUserByEmail,
    handleFindUserById,
    handleGetAllUsers,
    handleFindUserByName,
    handleUpdatePasswordByEmail,
    handleUpdatePasswordByEmpId,
    handleDeleteUserById
} = require('../Controllers/controller.js');
const router = express.Router();

router
    .route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUser);

router
    .route('/id/:id')
    .get(handleFindUserById)
    .patch(handleUpdatePasswordByEmpId)
    .delete(handleDeleteUserById);

router
    .route('/email/:email')
    .get(handleFindUserByEmail)
    .patch(handleUpdatePasswordByEmail);

router
    .route('/username/:username')
    .get(handleFindUserByName);

module.exports = router;