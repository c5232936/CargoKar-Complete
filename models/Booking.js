const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customerName: String,
  pickupLocation: String,
  dropLocation: String,
  vehicleType: String,
  status: {
    type: String,
    enum: ['pending', 'assigned', 'completed'],
    default: 'pending'
  },
  assignedDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    default: null
  },
  amount: Number,
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
