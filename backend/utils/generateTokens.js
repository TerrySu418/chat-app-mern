import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, //MS
        httpOnly: true, //prevet XSS attacks cross-site scription attacks
        sameSite: "strict", //CSRF attaks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "develpment"
    })
}

export default generateTokenAndSetCookie;