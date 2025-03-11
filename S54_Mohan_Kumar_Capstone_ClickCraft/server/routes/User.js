const express = require("express")
const router = express.Router()

const {createUser, getAllUsers, getUser, getUserByEmail, updatePortfolios, updateUserProfile, LikeUser, unLikeUser, likePortfolio, unlikePortfolio} = require("../controllers/userController")
router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/find/:id', getUser);
router.get('/verify/', getUserByEmail);
router.put('/update/', updatePortfolios);
router.put('/updateprofile', updateUserProfile);
router.put('/:id/like', LikeUser);
router.put('/:id/unlike', unLikeUser);
router.put('/portfolio/:id/like', likePortfolio);
router.put('/portfolio/:id/unlike', unlikePortfolio);

module.exports = router;