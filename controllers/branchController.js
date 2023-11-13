const Branch = require('../models/Branch');

// Create a new branch
exports.createBranch = async (req, res) => {
  try {
    const { name, address } = req.body;
    const branch = new Branch({ name, address });
    const savedBranch = await branch.save();
    res.status(201).json(savedBranch);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single branch by ID
exports.getBranchById = async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a branch by ID
exports.updateBranch = async (req, res) => {
  try {
    const { name, address } = req.body;
    const updatedBranch = await Branch.findByIdAndUpdate(
      req.params.id,
      { name, address },
      { new: true }
    );
    if (!updatedBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(updatedBranch);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a branch by ID
exports.deleteBranch = async (req, res) => {
  try {
    const deletedBranch = await Branch.findByIdAndRemove(req.params.id);
    if (!deletedBranch) {
      return res.status(404).json({ error: 'Branch not found' });
    }
    res.json(deletedBranch);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
