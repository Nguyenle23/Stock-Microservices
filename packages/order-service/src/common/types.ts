export interface IApplicationEnvironment {
  get<ReturnType>(key: string): ReturnType;
  set<ValueType>(key: string, value: ValueType): any;
}

export interface IMessage {
  code: string;
  message: string;
}