import User from "../schema/user.schema.js";

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //find all user except yourself
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSideBar: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
