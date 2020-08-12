import bcrypt from "bcryptjs";
const saltRound = 10;

export const hashPassword = (password: string) => {
  const saltRounds = bcrypt.genSaltSync(saltRound);
  return bcrypt.hashSync(password, saltRounds);
};

export const compaireHash = (string:string,hash:string)=>{
    return bcrypt.compareSync(string,hash)
}