const Media = require('../models/Media');
const fs = require('fs').promises;

// Upload media file
exports.uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.file;
    const mediaType = file.mimetype.startsWith('image/') ? 'image' : 'video';
    
    // Get file URL (relative path that will be served statically)
    const fileUrl = `/uploads/${file.filename}`;

    const media = await Media.create({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      url: fileUrl,
      mimeType: file.mimetype,
      type: mediaType,
      size: file.size,
      uploadedBy: req.user?._id || req.user?.id
    });

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all media
exports.getMedia = async (req, res) => {
  try {
    const { type, page = 1, limit = 50, search } = req.query;
    const query = {};
    
    if (type && ['image', 'video'].includes(type)) {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { alt: { $regex: search, $options: 'i' } },
        { caption: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('uploadedBy', 'email');
    
    const total = await Media.countDocuments(query);

    res.status(200).json({
      success: true,
      data: media,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single media item
exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate('uploadedBy', 'email');
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update media metadata (alt, caption)
exports.updateMedia = async (req, res) => {
  try {
    const { alt, caption } = req.body;
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    if (alt !== undefined) media.alt = alt;
    if (caption !== undefined) media.caption = caption;

    await media.save();
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete media
exports.deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    
    if (!media) {
      return res.status(404).json({ success: false, message: 'Media not found' });
    }

    // Delete physical file
    try {
      await fs.unlink(media.path);
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await media.deleteOne();
    
    res.status(200).json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


