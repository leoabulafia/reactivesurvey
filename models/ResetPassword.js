const mongoose = require('mongoose');
const { Schema } = mongoose;

const resetPasswordSchema = new Schema(
  {
    resetToken: String
  },
  { timestamps: true }
);

resetPasswordSchema.index({ createdAt: 1, expireAfterSeconds: 59 });
mongoose.model('ResetPassword', resetPasswordSchema);
