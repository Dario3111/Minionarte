import mongoose from "mongoose";

const minionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      maxlength: 50,
    },
    descripcion: {
      type: String,
      required: true,
      maxlength: 200,
    },
    url: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /https?:\/\/(www\.)?[\w\-]+\.\w{2,}(\/[\w\-._~:/?#\[\]@!$&'()*+,;=]*)?/.test(
            v
          );
        },
        message: (props) => `${props.value} no es una URL válida`,
      },
    },
  },
  { collection: "memes", timestamps: true }
);

const MinionModel = mongoose.model("Meme", minionSchema);

export default MinionModel;
