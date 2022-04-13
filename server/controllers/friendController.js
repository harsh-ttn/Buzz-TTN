import Friend from "../schemas/friendSchema.js";
import User from "../schemas/userSchema.js";

export const friendsCount = async (req, res) => {
  try {
    const userId = req.params.userId;
    let user1 = await User.findOne({ _id: userId });
    const count = user1.friends.length;

    res.json({ status: "Friends Count", data: count });
  } catch (error) {
    res.status(400).send(`Error ${error}`);
  }
};

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

    const newFriend = new Friend({
      friendId: userId,
      userId: friendId,
      friendName: req.query.friendName,
      friendImage: req.query.friendImage,
      status: "friends",
    });
    await newFriend.save();

    let user1 = await User.findOne({ _id: userId });
    user1.friends.push(friendId);
    user1.save();

    let user2 = await User.findOne({ _id: friendId });
    user2.friends.push(userId);
    user2.save();

    res.json({ data: friend });
  } catch (error) {
    res.send(error);
  }
};
