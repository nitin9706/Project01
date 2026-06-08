import mongoose, { Schema } from "mongoose";

const deploymentSchema = new Schema(
  {
    deploymentId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    projectName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["queued", "building", "deploying", "success", "failed"],
      default: "queued",
    },

    url: {
      type: String,
    },

    buildLogs: [
      {
        type: String,
      },
    ],

    error: {
      type: String,
    },

    deployedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const Deployment = mongoose.model("Deployment", deploymentSchema);
