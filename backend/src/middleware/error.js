import { response } from "../util/index";

export const errorHandler = (error, _req, res, _next) => {
  return response({ res, statusCode: 500, message: error.message });
};

process.on("unhandledRejection",(reason)=>{
    console.log(reason);
})