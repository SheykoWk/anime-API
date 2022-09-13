const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const userDB = [{
  "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  "first_name": "Sahid",
  "last_name": "Kick",
  "email": "sahid.kick@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "admin",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = () => {
  return userDB;
  //? select * from users;
};

const getUserById = (id) => {
  const data = userDB.filter((item) => item.id === id);

  return data.length ? data[0] : null
  //? select * from users where id = ${id};
};

const createUser = (data) => {
  const newUser = {
    id: uuid.v4(), //mandatory and unique
    first_name: data.first_name, //mandatory
    last_name: data.last_name, //mandatory
    email: data.email, //mandatory and unique
    password: hashPassword(data.password), //mandatory
    phone: data.phone ? data.phone : "", //unique   
    birthday_date: data.birthday_date, //mandatory
    rol: "normal", //mandatory and by default "normal"
    profile_image: data.profile_image ? data.profile_image : "",
    country: data.country, //mandatory
    is_active: true, //mandatory and by default true
    verified: false, //mandatory and by default false
  };
  userDB.push(newUser);
  return newUser;
};

const editUser = (id, data, userRol) => {
  const index = userDB.findIndex((user) => user.id === id);
  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone, //unique
      birthday_date: data.birthday_date,
      rol: userRol === 'admin' ? data.rol : 'normal',
      profile_image: data.profile_image,
      country: data.country,
      is_active: data.is_active,
      verified: false,
    };
    return userDB[index];
  } else {
    return createUser(data);
  }
};

const deleteUser = (id) => {
  const index = userDB.findIndex(user => user.id === id)
  if (index !== -1) {
    userDB.splice(index, 1)
    return true
  } else {
    return false
  } 
}

const getUserByEmail = (email) => {
  const data = userDB.filter((item) => item.email === email);
  return data.length ? data[0] : false
  //? select * from users where email = ${email};
}

const editProfileImg = (userID, imgUrl) => {
  const index = userDB.findIndex(user => user.id === userID)
  if(index !== -1){
    userDB[index].profile_image = imgUrl
    return userDB[index]
  }
  return false
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg
}

