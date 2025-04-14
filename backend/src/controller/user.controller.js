import httpStatus from "http-status";
import { User } from "../models/userSchema.js";
import bcrypt, { hash } from "bcrypt";
import crypto from "crypto";

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide username and password" });
  }

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
  }

  try {
    const user = await User.findOne({ username });

  let passcorrect =await bcrypt.compare(password, user.password)
    if (passcorrect) {
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    }
    else{
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
  }
};

const userRegister = async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const userPresent = await User.findOne({ username });
    if (userPresent) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });
    await user.save();
    return res
      .status(httpStatus.CREATED)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
      const user = await User.findOne({ token: token });
      const meetings = await Meeting.find({ user_id: user.username })
      res.json(meetings)
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
      const user = await User.findOne({ token: token });

      const newMeeting = new Meeting({
          user_id: user.username,
          meetingCode: meeting_code
      })

      await newMeeting.save();

      res.status(httpStatus.CREATED).json({ message: "Added code to history" })
  } catch (e) {
      res.json({ message: `Something went wrong ${e}` })
  }
}

export { userLogin, userRegister ,getUserHistory , addToHistory };
