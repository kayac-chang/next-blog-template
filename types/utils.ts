export type AsyncReturn<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;
