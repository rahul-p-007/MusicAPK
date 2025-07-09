// Import the Clerk client from the Clerk Express SDK
import { clerkClient } from "@clerk/express";

// Middleware to protect a route by checking if the user is authenticated

export const protectRoute = async (req, res, next) => {
  // If there's no userId in the auth object, the user is not logged in
  if (!req.auth.userId) {
    return res.status(401).json({
      message: "Unauthorized - you must be logged in", // Send a 401 Unauthorized response
    });
  }
  // If authenticated, continue to the next middleware or route handler
  next();
};

// Middleware to ensure the user is an admin
export const requireAdmin = async (req, res, next) => {
  try {
    // Fetch the current user's details using Clerk
    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    // Check if the current user's email matches the ADMIN_EMAIL environment variable
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    // If not an admin, send a 403 Forbidden response
    if (!isAdmin) {
      return res.status(403).json({
        message: "Unauthorized - you must be an admin",
      });
    }

    // If the user is an admin, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors (e.g., user lookup failed) with a 500 Internal Server Error response
    return res.status(500).json({
      message: "Internal server error",
      error, // Include error details for debugging
    });
  }
};
