import express from 'express';
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  updateCustomer
} from '../controllers/customer.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(getCustomers)
  .post(
    upload.fields([
      { name: 'storeImage', maxCount: 1 },
      { name: 'otherImages', maxCount: 10 }
    ]),
    createCustomer
  );

router
  .route('/:id')
  .get(getCustomerById)
  .patch(
    upload.fields([
      { name: 'storeImage', maxCount: 1 },
      { name: 'otherImages', maxCount: 10 }
    ]),
    updateCustomer
  )
  .delete(restrictTo('admin'), deleteCustomer);

export default router;