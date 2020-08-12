import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import slugify from "slugify";

@pre<Post>("validate", function (next) {
  const post = this;

  if (post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }

  next();
})

class Post extends TimeStamps {
  @prop({})
  public image?: string;

  @prop({ required: true })
  public title?: string;

  @prop({ required: true })
  public description?: string;

  @prop({})
  public content?: string;

  @prop({})
  public slug?: string;
}


export const postModel = getModelForClass(Post);