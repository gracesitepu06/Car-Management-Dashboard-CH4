const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.rent) {
    return res.status(400).json({
      status: "failed",
      message: `name or rent are required`,
    });
  }
  next();
};

module.exports = checkBody;
