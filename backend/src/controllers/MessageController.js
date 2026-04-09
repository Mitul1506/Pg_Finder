const Message = require("../models/MessageModel")

// SEND MESSAGE (USER)
const sendMessage = async(req,res)=>{
  try{

    const msg = await Message.create(req.body)

    res.status(201).json({
      message:"Message sent",
      data:msg
    })

  }catch(err){
    res.status(500).json({message:"Error sending message"})
  }
}

// GET MESSAGES FOR LANDLORD
const getMessagesForLandlord = async(req,res)=>{
  try{

    const messages = await Message.find({
      receiverId:req.params.landlordId
    }).populate("senderId","firstName email")

    res.json({data:messages})

  }catch(err){
    res.status(500).json({message:"Error"})
  }
}

// REPLY MESSAGE
const replyMessage = async(req,res)=>{
  try{

    const updated = await Message.findByIdAndUpdate(
      req.params.id,
      { reply:req.body.reply },
      { new:true }
    )

    res.json({data:updated})

  }catch(err){
    res.status(500).json({message:"Error"})
  }
}
// ================= USER MESSAGES =================
const getMessagesForUser = async (req, res) => {
  try {

    const messages = await Message.find({
      senderId: req.params.userId
    })
      .populate("pgId", "pgName")
      .populate("receiverId", "firstName");

    res.status(200).json({
      message: "User messages fetched",
      data: messages
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages",
      err: error.message
    });
  }
};

module.exports = {
  sendMessage,
  getMessagesForLandlord,
  replyMessage,
  getMessagesForUser
}