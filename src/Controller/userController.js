import userModel from "../Model/userModel.js";
import {
  isValidEmail,
  isValidPassword,
  isValid,
  isValidPhone,
} from "../validator/validator.js";

const createUser = async (req, res) => {
  try {
    const { title, name, phone, email, password } = req.body;
    const reqBody = ["title", "name", "phone", "email", "password"];
    for (let element of reqBody) {
      if (!isValid(req.body[element]))
        return res.status(400).send({
          status: false,
          msg: `This filed is required ${element} and must be in valid format`,
        });
    }

    if (!["Mr", "Mrs", "Miss"].includes(title)) {
      return res.status(400).send({
        status: false,
        msg: "Please write title among this Mr , Mrs , Miss",
      });
    }
    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: false,
        msg: "Please write emailId in proper format",
      });
    }
    if (!isValidPhone(phone)) {
      return res.status(400).send({
        status: false,
        msg: "Please write Phone number in proper format",
      });
    }
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: false,
        msg: "Please write Password in proper format",
      });
    }
    const emailExits = await userModel.findOne({ email });
    if (emailExits) {
      return res.status(400).send({
        status: false,
        msg: "This email is already exits Please enter another emailId",
      });
    }
    const phoneExits = await userModel.findOne({ phone });
    if (phoneExits) {
      return res.status(400).send({
        status: false,
        msg: "This phone number is already exits Please enter another phone number",
      });
    }
    const createUser = await userModel.create({
      title,
      name,
      email,
      password,
      phone,
    });
    return res.status(201).send({
      status: true,
      msg: "User is successfully registered",
      data: createUser,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

export { createUser };
