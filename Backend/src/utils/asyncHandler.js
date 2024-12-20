const asyncHandler = (reqHandler) => {
  (req, res, next) => {
    Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
  };
};

// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req,res,next)
//   } catch (err) {
//     res
//       .status(err.code || 500)
//       .json({ success: false, meassage: err.message });
//   }
// };

module.exports = asyncHandler;
