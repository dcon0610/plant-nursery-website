
const express= require("express")
const router = express.Router();
const getPlants = require('../controllers');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./../config/keys");
const validateRegisterInput = require("./../validation/register");
const validateLoginInput = require("./../validation/login");
const User = require("./../models/users");
const braintree = require("braintree")
const path = require('path')

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: 'jbdy99f6t7dgbryv',
  publicKey: 'bpyzwwcxj6zmx5kq',
  privateKey: '50b5df6afdd9cdec64b2c491f3129c99'
}); 


  router.get("/braintree", function(req, res) {
    res.send("Braintree route is healthy")
  })

  router.get("/api/braintree/v1/getToken", async function(req, res) {
    try {
      gateway.clientToken.generate({}, function(err, response) {
        if (err) {
          res.status(500).send(err)
        } else {
          res.send(response)
        }
      })
    } catch (err) {
      res.status(500).send(err)
    }
  })

  router.post("/api/braintree/v1/sandbox", async function(req, res) {
    try {
      // Use the payment method nonce here
      var nonceFromTheClient = req.body.paymentMethodNonce
      // Create a new transaction for $10
      var newTransaction = gateway.transaction.sale(
        {
          amount: "10.00",
          paymentMethodNonce: nonceFromTheClient,
          options: {
            // This option requests the funds from the transaction once it has been
            // authorized successfully
            submitForSettlement: true,
          },
        },
        function(error, result) {
          if (result) {
            res.send(result)
          } else {
            res.status(500).send(error)
          }
        }
      )
    } catch (err) {
      // Deal with an error
      console.log(err)
      res.send(err)
    }
  })

router.get('/api/plants',getPlants.findAll)

router.post("/api/users/register", (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/api/users/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  router.post("/api/plants/addtocart",getPlants.addToCart)

  router.post("/api/plants/getuser",getPlants.findOneUser)

  router.post("/api/plants/removefromcart",getPlants.reviseCart)

  router.post("/api/plants/addplant", getPlants.addPlant)

  router.post("/api/plants/deleteplant", getPlants.deletePlant)

  router.post("/api/plants/deactivateplant", getPlants.deactivatePlant)

  router.post("/api/plants/reactivateplant", getPlants.activatePlant)

  router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
    
    })
 
module.exports = router;