import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PreRegistrationSchema = new Schema({
    email: { type: String, unique: true, required: true },
});

const PreRegistrationModel = mongoose.models.PreRegistrations || mongoose.model('PreRegistrations', PreRegistrationSchema);

export default PreRegistrationModel;
