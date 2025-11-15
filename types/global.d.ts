declare module "mongoose" {
  export class Schema<T = any> {
    constructor(definition?: Record<string, unknown>, options?: Record<string, unknown>);
    index(fields: Record<string, unknown>): void;
  }

  export interface Model<T = any> {
    find(...args: any[]): any;
    findOne(...args: any[]): any;
    findById(...args: any[]): any;
    findByIdAndUpdate(...args: any[]): any;
    findByIdAndDelete(...args: any[]): any;
    findOneAndUpdate(...args: any[]): any;
    create(doc: Partial<T>): Promise<T>;
    aggregate(pipeline: any[]): Promise<any[]>;
    sort(...args: any[]): any;
    limit(...args: any[]): any;
    lean(...args: any[]): any;
    select(...args: any[]): any;
    populate(...args: any[]): any;
  }

  export const models: Record<string, Model<any>>;

  export function model<T = any>(name: string, schema?: Schema<T>): Model<T>;

  export const Types: {
    ObjectId: any;
  };

  export function connect(uri: string, options?: Record<string, unknown>): Promise<any>;
}

declare module "*.css";
declare module "*.scss";
declare module "*.svg" {
  const content: any;
  export default content;
}



