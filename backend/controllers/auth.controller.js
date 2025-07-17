import { User } from "../models/user.model.js";

export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const result = await User.updateOne(
      { clerkId: id },
      {
        $setOnInsert: {
          clerkId: id,
          fullName: `${firstName || ""} ${lastName || ""}`.trim(),
          imageUrl,
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      console.log("✅ New user created:", id);
    } else {
      console.log("ℹ️ User already existed:", id);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error in auth callback", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
