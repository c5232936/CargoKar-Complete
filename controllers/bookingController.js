const Booking = require('../models/Booking');
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('assignedDriver');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignDriver = async (req, res) => {
  try {
    const { bookingId, driverId } = req.body;
    const updated = await Booking.findByIdAndUpdate(bookingId, {
      assignedDriver: driverId,
      status: 'assigned'
    }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createPayment = async (req, res) => {
  const { amount, currency } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency,
      payment_capture: 1
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
