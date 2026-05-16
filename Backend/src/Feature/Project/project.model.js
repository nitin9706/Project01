import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    // Basic Info
    BasicInfo: {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        required: true,
      },
    },

    // Repo Info
    RepoInfo: {
      repoUrl: {
        type: String,
        required: true,
      },

      branch: {
        type: String,
        required: true,
        default: "main",
      },
    },

    // Build Configuration
    BuildConfig: {
      framework: {
        type: String,
        required: true,
        default: "React",
      },
      buildCommand: {
        type: String,
        required: true,
      },
      outputDirectory: {
        type: String,
        required: true,
      },
    },

    // deployment configuration
    DeploymentConfig: {
      subdomain: {
        type: String,
      },
      AutoDeploy: {
        type: Boolean,
        default: false,
      },
    },

    // relation
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model("Project", projectSchema);
