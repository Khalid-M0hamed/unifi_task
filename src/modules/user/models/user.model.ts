import mongoose, { Schema, Document } from 'mongoose';
import injectionService from '../../../services/Injection.service';
import { TOKEN_TYPES } from '../../../typings/enums/defualts.enum';
import bcrypt from 'bcrypt';

export interface IToken extends Document {
  token: string;
  tokenType: TOKEN_TYPES;
}

const tokenSchema = new Schema({
  token: { type: String, required: true },
  expiresIn: { type: String, required: true },
  tokenType: { type: String, enum: Object.values(TOKEN_TYPES), required: true },
});

export const TokenModel = mongoose.model<IToken>('Token', tokenSchema);

export interface ITodo extends Document {
  task: string;
  completed: boolean;
}

const todoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  tokens: IToken[];
  todos: ITodo[];
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema  = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [tokenSchema], // Array of Token documents
  todos: [todoSchema],   // Array of Todo documents
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error:any) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(candidatePassword, this.password);
    return match;
  } catch (error) {
    return false;
  }
};

export const UserModel = mongoose.model<IUser>('users', userSchema);
injectionService.registerModel('users',UserModel)

