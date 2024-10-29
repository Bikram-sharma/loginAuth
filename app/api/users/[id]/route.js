import { custom_middleware } from '@/helpers/global-route-middleware';
import User from '@/models/userModel';

const getUserHandler = async (req, res) => {
  await dbConnect();
  const { id } = req.query;

  try {
    const user = await User.findOne({ username: id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const GET = custom_middleware(getUserHandler);
