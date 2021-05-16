export const loggerDeleteId = (id: number): { message: string } => {
  const deleteMessage = {
    message: `Delete item id : ${id} success`,
  };
  return deleteMessage;
};
