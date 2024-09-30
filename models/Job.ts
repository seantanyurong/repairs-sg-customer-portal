import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      maxlength: [500, 'Description Can Have At Most 500 Characters'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity Is Required!'],
      min: [1, 'Quantity Must Be Greater Than 1'],
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    },
    is_first_job: {
      type: Boolean,
      default: false,
    },
    quickQuotation: {
      type: Array,
    },
    quotations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quotation',
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File',
      },
    ],
    jobAddress: {
      type: String,
      required: [true, 'Job Address Is Required!'],
      maxlength: [256, 'Job Address Can Have At Most 256 Characters'],
    },
    customer: {
      type: String,
      required: [true, 'Customer Is Required!'],
    },
    status: {
      type: String,
      default: 'Draft',
      required: [true, 'Job Status Is Required!'],
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
    },
  },
  { versionKey: false, timestamps: true },
);

export default mongoose.models.Job || mongoose.model('Job', jobSchema);

// Changed Job Address to just a string for now
// Changed Customer to clerk's customer ID
// Removed these three below for now
// categoryType: [
//   {
//     type: String,
//     enum: ['ELECTRICIAN', 'VENTILATION', 'PLUMBER', 'HANDYMAN', 'AIRCON'],
//     required: [true, 'Category Type Is Required'],
//   },
// ],
// createdBy: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Staff',
//   required: [true, 'Created By Is Required!'],
// },
// lastUpdatedBy: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'Staff',
//   required: [true, 'Last Updated By Is Required!'],
// },
