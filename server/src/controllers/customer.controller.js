import Customer from '../models/Customer.js';
import Notification from '../models/Notification.js';
import AuditLog from '../models/AuditLog.js';
import User from '../models/User.js';
import { generateCustomerCode } from '../utils/customerCode.js';
import { catchAsync } from '../utils/catchAsync.js';
import { getIO } from '../config/socket.js';

const notifyAdmins = async (title, message, meta = {}) => {
    const admins = await User.find({ role: 'admin', isActive: true });
    if (!admins.length) return;
  
    const docs = admins.map((admin) => ({ user: admin._id, title, message, type: 'update', meta }));
    await Notification.insertMany(docs);
  
    const io = getIO();
    if (io) io.emit('notification:new', { title, message, meta });
  };
  
  export const createCustomer = catchAsync(async (req, res) => {
    const otherImages = req.files?.otherImages?.map((f) => f.path) || [];
    const storeImage = req.files?.storeImage?.[0]?.path || '';
  
    const customerCode = await generateCustomerCode(Customer);
    const contacts = req.body.contacts ? JSON.parse(req.body.contacts) : [];
    const tags = req.body.tags ? JSON.parse(req.body.tags) : [];
  
    const customer = await Customer.create({
      customerCode,
      companyName: req.body.companyName,
      storeImage,
      mapUrl: req.body.mapUrl,
      contacts,
      otherImages,
      province: req.body.province,
      businessType: req.body.businessType,
      tags,
      priority: Number(req.body.priority || 3),
      status: req.body.status || 'lead',
      notes: req.body.notes || '',
      assignedTo: req.body.assignedTo || req.user._id,
      createdBy: req.user._id,
      updatedBy: req.user._id
    });
  
    await AuditLog.create({
        actor: req.user._id,
        action: 'CREATE_CUSTOMER',
        entityType: 'Customer',
        entityId: customer._id.toString(),
        detail: { companyName: customer.companyName, customerCode: customer.customerCode }
      });
    
      await notifyAdmins(
        'Customer created',
        `${req.user.fullName} created customer ${customer.companyName}`,
        { customerId: customer._id }
      );
    
      res.status(201).json({ success: true, data: customer });
    });
    
    export const getCustomers = catchAsync(async (req, res) => {
      const {
        search = '',
        status,
        priority,
        province,
        businessType,
        assignedTo,
        page = 1,
        limit = 10
      } = req.query;
    
      const filter = {};
    
      if (search) {
        filter.$or = [
          { companyName: { $regex: search, $options: 'i' } },
          { 'contacts.name': { $regex: search, $options: 'i' } },
          { customerCode: { $regex: search, $options: 'i' } }
        ];
      }

      if (status) filter.status = status;
      if (priority) filter.priority = Number(priority);
      if (province) filter.province = province;
      if (businessType) filter.businessType = businessType;
      if (assignedTo) filter.assignedTo = assignedTo;
    
      const skip = (Number(page) - 1) * Number(limit);
    
      const [items, total] = await Promise.all([
        Customer.find(filter)
          .populate('assignedTo', 'fullName department')
          .populate('createdBy', 'fullName')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(Number(limit)),
        Customer.countDocuments(filter)
      ]);
    
      res.json({
        success: true,
        data: items,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit))
        }
      });
    });
    
    export const getCustomerById = catchAsync(async (req, res) => {
      const customer = await Customer.findById(req.params.id)
        .populate('assignedTo', 'fullName department')
        .populate('createdBy', 'fullName')
        .populate('updatedBy', 'fullName');
    
      if (!customer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
    
      res.json({ success: true, data: customer });
    });
    
    export const updateCustomer = catchAsync(async (req, res) => {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }

      const contacts = req.body.contacts ? JSON.parse(req.body.contacts) : customer.contacts;
      const tags = req.body.tags ? JSON.parse(req.body.tags) : customer.tags;
      const newOtherImages = req.files?.otherImages?.map((f) => f.path) || [];
      const newStoreImage = req.files?.storeImage?.[0]?.path || customer.storeImage;
    
      customer.companyName = req.body.companyName ?? customer.companyName;
      customer.storeImage = newStoreImage;
      customer.mapUrl = req.body.mapUrl ?? customer.mapUrl;
      customer.contacts = contacts;
      customer.otherImages = [...customer.otherImages, ...newOtherImages];
      customer.province = req.body.province ?? customer.province;
      customer.businessType = req.body.businessType ?? customer.businessType;
      customer.tags = tags;
      customer.priority = Number(req.body.priority ?? customer.priority);
      customer.status = req.body.status ?? customer.status;
      customer.notes = req.body.notes ?? customer.notes;
      customer.assignedTo = req.body.assignedTo ?? customer.assignedTo;
      customer.updatedBy = req.user._id;
    
      await customer.save();
    
      await AuditLog.create({
        actor: req.user._id,
        action: 'UPDATE_CUSTOMER',
        entityType: 'Customer',
        entityId: customer._id.toString(),
        detail: { companyName: customer.companyName }
      });
    
      await notifyAdmins(
        'Customer updated',
        `${req.user.fullName} updated customer ${customer.companyName}`,
        { customerId: customer._id }
      );
    
      res.json({ success: true, data: customer });
    });
    
    export const deleteCustomer = catchAsync(async (req, res) => {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }

  await customer.deleteOne();

  await AuditLog.create({
    actor: req.user._id,
    action: 'DELETE_CUSTOMER',
    entityType: 'Customer',
    entityId: req.params.id,
    detail: { companyName: customer.companyName }
  });

  await notifyAdmins(
    'Customer deleted',
    `${req.user.fullName} deleted customer ${customer.companyName}`,
    { customerId: req.params.id }
  );

  res.json({ success: true, message: 'Customer deleted successfully' });
});