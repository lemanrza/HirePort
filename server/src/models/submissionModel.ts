import mongoose from "mongoose";
import submissionSchema from "../schemas/submissionSchema";
const submissionModel = mongoose.model("Submission", submissionSchema);
export default submissionModel;