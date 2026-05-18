import { createUserModel, getUsersModel} from "../module/mod.js";

export const createUser = async (req, res) => {

  try {

    const { name, email } = req.body;

    await createUserModel(name, email);

    res.json({
      message: "User Added"
    });

  } catch (error) {

    res.status(500).json(error);

  }

};

export const getUsers = async (req, res) => {

  try {

    const users = await getUsersModel();

    res.json(users);

  } catch (error) {

    res.status(500).json(error);

  }

};