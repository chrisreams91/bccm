// Example usage: await timer(() => memberActivityCommandHandler(interaction));
export const timer = async (func: Function) => {
  const start = Date.now();
  await func();
  const finished = Date.now();

  const timeElapsed = finished - start;
  const formatted = timeElapsed / 60000;
  console.log('Times elapsed in minutes: ', formatted);
};

export const formatJSONForReply = (obj: Object) =>
  `\`\`\`json\n${JSON.stringify(obj, null, 2)}\`\`\``;
