const validateRegistration = require("./usersValidations/registraion");
const validateSignin = require("./usersValidations/signIn");
const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");

router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  const adminPassword = req.body.adminPassword;

  if (adminPassword === "1111") {
    user = new User(
      _.pick(req.body, ["name", "email", "password", "biz", "favorites"])
    );

    user.password = generateHashPassword(user.password);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"]));
  } else {
    user = new User(
      _.pick(req.body, ["name", "email", "password", "favorites"])
    );

    user.password = generateHashPassword(user.password);
    await user.save();
    res.send(_.pick(user, ["_id", "name", "email"]));
  }
});

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({
    token: generateAuthToken(user),
    isAdmin: user.biz,
  });
});

//Add favorite
router.put("/favorite/:sku", async (req, res) => {
  const sku = req.params.sku;
  if (!sku) return res.status(400).send("No SKU sent");

  const user = await User.findOne({ email: req.body.userEmail });

  if (!user) return res.status(400).send("User Not Found");

  const remove = user.favorites.includes(sku);
  console.log(user.favorites);
  console.log(sku);
  console.log(remove);
  if (remove) {
    await User.findOneAndUpdate(
      { email: user.email },
      { $pull: { favorites: sku } }
    );
    return res.send(false);
  }

  await User.findOneAndUpdate(
    { email: user.email },
    { $addToSet: { favorites: sku } }
  )
    .then(() => res.send(true))
    .catch((err) => res.send(err));
});

router.get("/favorites/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(400).send("User Not Found");
  res.send(user.favorites);
});

router.get("/findfavorite/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(400).send("User Not Found");
  res.send();
});

router.get("/userInfo", auth, (req, res) => {
  let user = req.user;
  // if (user.biz) return res.status(403).json("Un authorize user!"); // מראה בדיקה אם המשתמש הוא עסקי

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v"])
    .then((user) => res.json(user))
    .catch((errorsFromMongoose) => res.status(500).json(errorsFromMongoose));
});

module.exports = router;
