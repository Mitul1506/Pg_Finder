const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

// ================= CREATE ORDER =================
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required"
      });
    }

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      message: "Order created",
      data: order
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating order"
    });
  }
};

// ================= VERIFY PAYMENT =================
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", "ty1qPjy53O5jyRVF3uCGE5Bk") // 🔴 same secret
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: "Payment verified",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature"
      });
    }

  } catch (err) {
    res.status(500).json({
      message: "Verification failed"
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment
};