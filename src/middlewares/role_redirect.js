const role_redirect = async (req, res, next) => {
    try {
        const role = req["user_profile"].role
        switch (role) {
            case "admin":
                return res.redirect("/admin")
            default:
                return next();
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = role_redirect;