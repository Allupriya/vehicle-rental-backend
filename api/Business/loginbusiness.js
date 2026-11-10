require("dotenv").config();
const bcrypt = require("bcrypt");
const { finduserservice } = require("../Service/Userservice");
const jwt = require("jsonwebtoken");
//const { generateemailtoken } = require("./emailtokenBusiness");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
//console.log("generateemailtoken loaded:", typeof generateemailtoken);
const userloginbusiness = async (payload) => {
    try {
        const { username, password } = payload;

        const userdetail = await finduserservice({ username });

        if (userdetail) {

            const isPasswordValid = await bcrypt.compare(
                password,
                userdetail.password
            );

            if (isPasswordValid) {

                //await generateemailtoken(userdetail.email);

                const login_token = jwt.sign(
                    {
                        _id: userdetail._id,
                        username: userdetail.username,
                        role: userdetail.role
                    },
                    SECRET_KEY,
                    { expiresIn: "1h" }
                );

                return "Bearer " + login_token;
            }

            return {
                message: "credentials are wrong"
            };
        }

        return {
            message: "credentials are wrong"
        };

    } catch (error) {
        throw error;
    }
};
module.exports={userloginbusiness};