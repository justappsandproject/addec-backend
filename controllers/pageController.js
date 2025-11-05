const Page = require('../models/Page');

exports.getPages = async (req, res) => {
  try {
    const pages = await Page.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: pages.length,
      data: pages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug });
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: page
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body);
    res.status(201).json({
      success: true,
      data: page
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: page
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.params.id);
    
    if (!page) {
      return res.status(404).json({
        success: false,
        message: 'Page not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

