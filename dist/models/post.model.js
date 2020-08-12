"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const defaultClasses_1 = require("@typegoose/typegoose/lib/defaultClasses");
const slugify_1 = __importDefault(require("slugify"));
let Post = class Post extends defaultClasses_1.TimeStamps {
};
__decorate([
    typegoose_1.prop({}),
    __metadata("design:type", String)
], Post.prototype, "image", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
__decorate([
    typegoose_1.prop({}),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    typegoose_1.prop({}),
    __metadata("design:type", String)
], Post.prototype, "slug", void 0);
Post = __decorate([
    typegoose_1.pre("validate", function (next) {
        const post = this;
        if (post.title) {
            post.slug = slugify_1.default(post.title, { lower: true, strict: true });
        }
        next();
    })
], Post);
exports.postModel = typegoose_1.getModelForClass(Post);
