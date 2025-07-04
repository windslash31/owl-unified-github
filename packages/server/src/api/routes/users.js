const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorize } = require('../middleware/authMiddleware');

router.post('/change-password', authenticateToken, userController.changePassword);

// The page itself requires the new "view" permission
router.get('/', authenticateToken, authorize('admin:view_users'), userController.listUsers);

// Each action route is protected by its own specific permission
router.post('/', authenticateToken, authorize('user:create'), userController.createUser);
router.post('/:id/reset-password', authenticateToken, authorize('user:reset_password'), userController.resetPassword);
router.put('/:id/role', authenticateToken, authorize('user:update:role'), userController.updateUserRole);
router.delete('/:id', authenticateToken, authorize('user:delete'), userController.deleteUser);

// api keys management
router.get('/:id/api-keys', authenticateToken, authorize('user:manage_api_keys'), userController.listApiKeys);
router.post('/:id/api-keys', authenticateToken, authorize('user:manage_api_keys'), userController.generateApiKey);
router.delete('/api-keys/:keyId', authenticateToken, authorize('user:manage_api_keys'), userController.deleteApiKey);

module.exports = router;