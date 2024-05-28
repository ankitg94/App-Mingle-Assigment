import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import Token from '../models/TokenModal.js';
import dataModels from '../models/dataModels.js';


const WORDS = [
  "apple", "banana", "cherry", "date", "elderberry",
  "fig", "grape", "honeydew", "kiwi", "lemon",
  "mango", "nectarine", "orange", "papaya", "quince",
  "raspberry", "strawberry", "tangerine", "ugli", "vanilla",
  "watermelon", "xigua", "yam", "zucchini"
];

const generateToken = () => {
  const randomWords = [];
  for (let i = 0; i < 4; i++) {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    randomWords.push(word);
  }
  return randomWords.join('-');
};

export const createToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await dataModels.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const token = generateToken();
    const newToken = new Token({ token, userId: user._id });
    await newToken.save();
    res.status(201).json({ token: newToken.token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginWithToken = async (req, res) => {
  try {
    const { token } = req.body;
    const foundToken = await Token.findOne({ token }).populate('token');
    if (!foundToken) {
      return res.status(404).json({ error: 'Invalid or expired token' });
    }

    const user = foundToken.userId;

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ user, token: jwtToken });

    await foundToken.remove();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const validateToken = async (req, res) => {
    try {
      const { token } = req.params;
      const foundToken = await Token.findOne({ token });
      if (foundToken) {
        res.status(200).json({ valid: true });
      } else {
        res.status(404).json({ valid: false });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };