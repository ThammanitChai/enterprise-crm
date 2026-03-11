import Project from '../models/Project.js';
import AuditLog from '../models/AuditLog.js';
import { catchAsync } from '../utils/catchAsync.js';

const generateProjectCode = async () => {
  const count = await Project.countDocuments();
  return `PRJ-${new Date().getFullYear()}-${String(count + 1).padStart(5, '0')}`;
};

export const createProject = catchAsync(async (req, res) => {
  const attachments = req.files?.map((f) => f.path) || [];
  const project = await Project.create({
    projectCode: await generateProjectCode(),
    customer: req.body.customer,
    projectName: req.body.projectName,
    description: req.body.description || '',
    amount: Number(req.body.amount || 0),
    priority: Number(req.body.priority || 3),
    status: req.body.status || 'open',
    attachments,
    assignedTo: req.body.assignedTo || req.user._id,
    createdBy: req.user._id
  });

  await AuditLog.create({
    actor: req.user._id,
    action: 'CREATE_PROJECT',
    entityType: 'Project',
    entityId: project._id.toString(),
    detail: { projectName: project.projectName }
  });

  res.status(201).json({ success: true, data: project });
});

export const getProjects = catchAsync(async (req, res) => {
  const projects = await Project.find()
    .populate('customer', 'companyName customerCode')
    .populate('assignedTo', 'fullName')
    .sort({ createdAt: -1 });
  res.json({ success: true, data: projects });
});