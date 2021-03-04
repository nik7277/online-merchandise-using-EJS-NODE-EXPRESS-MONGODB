const mongoose  = require('mongoose');


const timeSlotSchema  = new mongoose.Schema({
    game:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Games',
    },
    slot:{
        type: String,
    },
        
    date: Date
});

const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

exports.TimeSlot = TimeSlot;
