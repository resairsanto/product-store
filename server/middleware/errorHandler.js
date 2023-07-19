module.exports = (err, req, res, next) => {
   let status = err.status || 500;
   let message = err.message || "Internal Server Error";

   switch (err.name) {
      case "EmailPasswordRequired":
         status = 400;
         message = "Email or Password is required.";
         break;
      case "EmailPasswordInvalid":
         status = 401;
         message = "Email or password is invalid.";
         break;
      case "SequelizeValidationError":
         status = 400;
         message = err.errors[0].message;
         break;
      case "Unauthenticated":
         status = 401;
         message = "You are not authorized.";
         break;
      case "NotFound":
         status = 404;
         message = "Data not found.";
         break;
      case "SequelizeUniqueConstraintError":
         status = 409;
         message = err.errors[0].message;
         break;
      case "JsonWebTokenError":
         status = 401;
         message = "Invalid Token.";
         break;
   }
   res.status(status).json({ message });
};
