const express = require("express");
const {
  addToWishlist,
  getWishlistData,
  removeWishlistData,
  addToCart,
  getCartData,
  updateCart,
  removeCartData,
  emptyCartItems,
} = require("../controller/CartController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/wishlist").get(isAuthenticatedUser, getWishlistData);

router.route("/addToWishlist").post(isAuthenticatedUser, addToWishlist);

router
  .route("/removeWishlist/:id")
  .delete(isAuthenticatedUser, removeWishlistData);

router.route("/addToCart").post(isAuthenticatedUser, addToCart);
// router.route("/addToCart").post(addToCart);

router.route("/cart/:id").get(isAuthenticatedUser, getCartData);
// router.route("/cart/:id").get(getCartData);


router.route("/cart/update/:id").put(isAuthenticatedUser, updateCart);
// router.route("/cart/update/:id").put(updateCart);



router.route("/removeCartItem/:id1/:id2").delete(isAuthenticatedUser,removeCartData);




//empty all cart items on successfull payment of cart items
router.route("/emptyCartItems/:id").delete(isAuthenticatedUser,emptyCartItems);




router.route("/")

module.exports = router;
