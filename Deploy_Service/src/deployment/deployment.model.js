import mongoose, { Schema } from "mongoose";

const deploymentSchema = new Schema(
  {
    deploymentId: {
      type: String,
      required: true,
      unique: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["queued", "building", "success", "failed"],
      default: "queued",
    },

    url: String,

    buildLogs: [String],

    error: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },

    deployedAt: Date,
  },
  {
    timestamps: true,
  },
);

export const Deployment = mongoose.model("Deployment", deploymentSchema);
