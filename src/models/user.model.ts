import { getModelForClass, prop, ReturnModelType } from "@typegoose/typegoose";
class User {
  @prop({ required: true })
  public username?: string;

  @prop({ required: true })
  public email?: string;

  @prop({ required: true })
  public password?: string;

  @prop({})
  public refreshToken?:string;
  
  public static async findByCredintials(
    this: ReturnModelType<typeof User>,
    username: string
  ) {
    return await this.find({ username }).exec();
  }
}

export const UserModel = getModelForClass(User);
