import Friend from "../schemas/friendSchema.js";

export const getFriends = async (req, res) => {
  try {
    const userId = req.query.userId;
    const status = req.query.status;

    const friends = await Friend.find({ userId: userId, status: status });

    res.json({ status: "Got All Friends", data: friends });
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

export const makeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;
    const friend = await Friend.findOne({ userId: userId, friendId: friendId });
    if (friend) return res.status(400).send("Already a Friend");

    const newFriend = new Friend(req.body);

    await newFriend.save();
    res.json({ status: "Sent Request", data: newFriend });
  } catch (error) {
    res.status(400).send("Error", error);
  }
};

export const confirmFriend = async (req, res) => {
  try {
    const userId = req.query.userId;
    const friendId = req.query.friendId;

    let friend = await Friend.findOne({ userId: userId, friendId: friendId });

    friend.status = "friends";

    friend.save();

    res.json({ data: friend });
  } catch (error) {
    res.send(error);
  }
};
