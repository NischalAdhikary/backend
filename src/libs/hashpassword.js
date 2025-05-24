import bycrypt from "bcrypt";

const hassPassword = async (password) => {
  return await bycrypt.hash(password, 10);
};
const checkPassword = async (password, hash) => {
  return await bycrypt.compare(password, hash);
};
export { hassPassword, checkPassword };
