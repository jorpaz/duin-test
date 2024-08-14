const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    birthday: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    grade: { type: String, required: true },
    secction: { type: String, required: true },
    dateEntry: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);