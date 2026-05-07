const accessAuthorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ status: false, message: 'Please login first.' });
        }
        
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: false, message: 'You have not authorized for this.' });
        }

        next();
    }
};

module.exports = accessAuthorize;