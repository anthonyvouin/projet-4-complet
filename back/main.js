import express from "express";
import bodyParser from "body-parser";
import { genSalt, hash, compare } from "bcrypt";
import mongoose from "mongoose";
import { AccountDto } from "./models/accountDto.js";
import { connect, Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import { imageDto } from "./models/imageDto.js";
import { generateRandomString } from "./functions/url.js";
import { imgUpload } from "./functions/images.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Definir le modele
const Account = model("Account", AccountDto);
const ImageUser = model("imageUser", imageDto);

// Connect to the MongoDB database
mongoose
  .connect("mongodb://localhost:27017/account-projet4-express")
  .then(() => console.log("Connected to MongoDB database"))
  .catch((error) =>
    console.log("Error connecting to MongoDB database: ", error)
  );

// Create a new account
app.post("/account", async (request, response) => {
  try {
    const { email, password } = request.body;

    const existAccount = await Account.find({ email: email });

    if (existAccount.length > 0) {
      response.status(403).send("Compte déjà créé");
    } else {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);

      const account = new Account({ email, password: hashedPassword });
      await account.save();

      response.status(201).send("Compte créé");
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .send("Une erreur est survenue lors de la création du compte");
  }
});

//Connexion avec token
app.post("/login", async (request, reply) => {
  const { email, password } = request.body;
  try {
    // Vérification de l'email et du mot de passe

    const user = await Account.findOne({ email });

    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new Error("Email ou mot de passe incorrect");
    }

    // Si les informations d'identification sont valides, créer le jeton JWT

    const token = jwt.sign(
      { userId: user._id },

      "16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF",

      {
        expiresIn: "1h",
      }
    );
    reply.status(200).send({ token });
  } catch (error) {
    console.log(error);
    reply.status(401).send("Identifiants invalides");
  }
});

//delete account
app.delete("/account", async (request, reply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return reply.code(403).send("Authentification invalide");
  }

  const token = authHeader.slice(7);

  const decodedToken = jwt.verify(token, "16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF");

  const userId = decodedToken.userId;

  try {
    const userAccount = await Account.findById(userId);

    if (!userAccount) {
      return reply.status(404).send("Compte non trouvé");
    }

    await Account.findByIdAndDelete(userId);

    // const imagesAccount = await ImageUser.find({ userId: userId });
    // imagesAccount.forEach(async (element) => {
    //   fs.unlink(element.name, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log("Le fichier a été supprimé avec succès");
    //   });

    //   await ImageUser.findByIdAndDelete(element.id);
    // });
    reply.status(200).send("Compte supprimé avec succès !");
  } catch (error) {
    console.log(error);

    reply.status(401).send("Authentification invalide");
  }
});

//send image
// url image http://localhost:3000/uploads/1683917463744-ff.JPG
app.post("/images", imgUpload, async (request, reply) => {
  const authHeader = request.headers.authorization;
  const token = authHeader.slice(7);
  const decodedToken = jwt.verify(token, "16UQLq1HZ3CNwhvgrarV6pMoA2CDjb4tyF");
  const userId = decodedToken.userId;
  const userAccount = await Account.findById(userId);
  if (!userAccount) {
    return reply.status(404).send("Compte non trouvé");
  }

  const name = `uploads/${request.file.filename}`;
  const date = Date();
  const isPublic = true;
  let url = generateRandomString();
  let isUrlExist = true;
  let urlExist = await ImageUser.find({ url: url });

  if (urlExist.length == 0) {
    isUrlExist = false;
  } else {
    while (isUrlExist) {
      url = generateRandomString();
      urlExist = await ImageUser.find({ url: url });
      if (urlExist.length == 0) {
        isUrlExist = false;
      }
    }
  }
  const newImage = new ImageUser({ date, name, isPublic, url, userId });
  await newImage.save();
  reply.status(201).send("image enregistré");
});

// Start the Express server
app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});

// next route
