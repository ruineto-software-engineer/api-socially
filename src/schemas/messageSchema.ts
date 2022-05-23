import joi from "joi";
import { chats } from "@prisma/client";

type CreateMessageData = Omit<Omit<chats, "id">, "createdAt">;

const messageSchema = joi.object<CreateMessageData>({
  senderId: joi.number().required(),
  recipientId: joi.number().required(),
  message: joi.string().required()
});

export default messageSchema;
