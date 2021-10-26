export function LogTime() {
  return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any) {
      console.time(propertyName);
      const result = method!.apply(this, args);
      console.timeEnd(propertyName);
      return result;
    };
  };
}
