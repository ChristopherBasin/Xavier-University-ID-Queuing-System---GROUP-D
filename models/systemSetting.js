const mongoose = require("mongoose");

const systemSettingSchema = new mongoose.Schema({
  reservationsOpen: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("SystemSetting", systemSettingSchema);
