import { UserModel } from '../model/Users.js';
import jwt from 'jsonwebtoken'
import express from 'express'
import bcrypt from 'bcrypt'

const secret = "revengeisafoolsgame"
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });

        await newUser.save();

        res.json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error during registration" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Username or password is incorrect" });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, secret, { expiresIn: '1h' });

        res.json({ token, userID: user._id });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error during login" });
    }
});

export const verifyToken = (req, res) => {
    const authHeader = req.headers.authorization;

    try {
        if (authHeader) {
            jwt.verify(authHeader, secret, (err) => {
                if (err) {
                    return res.sendStatus(403);
                }
                // Token is valid
                res.status(200).json({ message: "Token is valid" });
            });
        } else {
            // No authHeader
            res.sendStatus(401);
        }
    } catch (error) {
        console.error("Error during token verification:", error);
        res.status(500).json({ message: "Internal server error during token verification" });
    }
};


router.get("/", verifyToken);
router.post("/", verifyToken)    // No post request is goint from "/" though

export { router as userRouter }