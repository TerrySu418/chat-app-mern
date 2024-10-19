import Conversation from "../schema/conversation.schema.js";
import Message from "../schema/message.schema.js";

export const sendMessage = async (req, res) => {
  try {
    //user will send this message
    const { message } = req.body;
    const { id: receiverId } = req.params;

    //Get the current authenticate user
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    //user send the message as the first time
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.message.push(newMessage._id);
    }

    //SOCKET IO Function will go here to make it real time

    // await conversation.save();
    // await newMessage.save();

    //This will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("Error in sendMessage Controller");
    res.status(500).json({ err: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("message"); // Assuming 'message' is the correct field name
    
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation.message);
  } catch (error) {
    console.error("Error in getMessage Controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
