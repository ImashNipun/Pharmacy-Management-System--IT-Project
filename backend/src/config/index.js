import { Joi } from "celebrate";
import dotenv from 'dotenv';

dotenv.config();

class ConfigBase {
  static get schema() {
    return {
      PORT: Joi.number().optional(),
      MONGO_URL: Joi.string().required(),
      NODE_ENV: Joi.string().required()
    };
  }

  static get values() {
    return {
      PORT: process.env.PORT ?? 8000,
      MONGO_URL: process.env.MONGO_URL,
      NODE_ENV: process.env.NODE_ENV
    };
  }
}

const config = ConfigBase.values;

const { error } = Joi.object(ConfigBase.schema).validate(config);

if (error) {
  console.error(
    `Environment validation failed. \nDetails - ${error.details[0].message}\nExiting...`
  );
  process.exit(1);
}

export default config;


