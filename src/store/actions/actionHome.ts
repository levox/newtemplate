export const SAY_HELLO = "SAY_HELLO";

export function sayhello(hello: string) {
  return {
    type: SAY_HELLO,
    msg: hello
  };
}
