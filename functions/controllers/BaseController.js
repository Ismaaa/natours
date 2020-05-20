exports.home = (req, res) => {
  // Show homepage
  res.status(200).json({
    status: 'success',
    message: 'welcome to the natours api',
  });
};
