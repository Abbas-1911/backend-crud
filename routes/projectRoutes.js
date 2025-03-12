const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// CREATE a project
router.post('/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// READ all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE a project (PUT - full update)
router.put('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PARTIAL UPDATE (PATCH - update specific fields)
router.patch('/projects/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Failed to update project" });
    }
});

// DELETE a project
router.delete('/projects/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
