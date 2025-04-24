const Course = require('../models/course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
}

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
}

exports.createCourse = async (req, res) => {
    try {
      const { title, description, image, startDate, endDate, price } = req.body;
      if (!title || !description || !price)
        return res.status(400).json({ message: 'Title, description, and price are required' });
  
      const course = new Course({ title, description, image, startDate, endDate, price });
      await course.save();
      res.status(201).json(course);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.updateCourse = async (req, res) => { 
    try {
      const { title, description, image, startDate, endDate, price } = req.body;
      const course = await Course.findByIdAndUpdate(req.params.id, { title, description, image, startDate, endDate, price }, { new: true });
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error });
    }
  }

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
        return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting course', error });
    }
    }

