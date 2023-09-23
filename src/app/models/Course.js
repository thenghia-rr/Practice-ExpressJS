const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, required: true },
    desc: { type: String, maxLength: 1000 },
    image: { type: String, required: true },
    videoId: { type: String, required: true},
    level: { type: String,  },
    slug: {type: String, slug: 'name', unique: true},
}, {
    timestamps: true,
});

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', Course);
