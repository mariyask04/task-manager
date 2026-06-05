const protect = async (req, res, next) => {
    try {
        let token = "";
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.FindById(decoded.id).select("-password");
            next();
        } else {

            return res.status(401).json({
                success: false,
                message: "Not authorized"
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token failed"
        });
    }
}

export default protect;