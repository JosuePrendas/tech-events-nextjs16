import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
      required: [true, 'Event ID is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          // Email validation regex
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  }
);

// Pre-save hook: Verify that the referenced event exists
bookingSchema.pre('save', async function (next) {
  // Only validate eventId if it's modified or new
  if (this.isModified('eventId')) {
    try {
      // Check if Event model exists to avoid circular dependency issues
      const Event = mongoose.models.Event;
      
      if (!Event) {
        return next(new Error('Event model not found'));
      }

      const eventExists = await Event.findById(this.eventId);

      if (!eventExists) {
        return next(new Error('Referenced event does not exist'));
      }
    } catch {
      return next(new Error('Error validating event reference'));
    }
  }

  next();
});

// Create index on eventId for faster lookup queries
bookingSchema.index({ eventId: 1 });

// Prevent model recompilation in development (Next.js hot reload)
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
