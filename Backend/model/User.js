import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema({
  // _id: String,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    default: null,
  },
  role: {
    enum: ["0", "1", "2", "3", "4"],
    type: String,
    // enum: [0, 1, 2,3, 4], /*   0 = Admin, 1 = Nusing Home, 2 = Assisted Living, 3 = Physicians, 4 = Nurses*/      required: true,
  },
  password: {
    type: String,
  },
  nursing_company: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
  nursing_home_id: {
    type: Array,
    ref: "users",
  },
  assissted_living_id: {
    type: Array,
    ref: "users",
  },
  image: {
    type: String,
  },
});

userSchema.plugin(paginate);
const User = mongoose.model("User", userSchema);
export default User;
