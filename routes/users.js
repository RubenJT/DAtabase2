const {Router} = require('express');
const {usersList,listUserByID,addUser,  deleteUser,updateUser}=require('../controllers/users');




const router = Router();

// http://localhost:3000/api/v1/users/?
router.get('/', usersList);
router.get('/:id', listUserByID)
router.put('/', addUser);
router.patch('/',updateUser);

router.post('/',deleteUser);
//router.put('/',usersList);
//router.patch('/',usersList);
//router.delete('/',usersList);
module.exports=router;