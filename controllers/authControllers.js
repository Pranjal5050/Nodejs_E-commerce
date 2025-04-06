const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const flash = require("connect-flash");

module.exports.registerUser = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user){
            req.flash("error", "You already have acount, please login");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop");
                }
            });
        });

    } catch (error) {
        req.flash("error", "Something went wrong");
        return res.redirect("/");
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user){
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            }
            else{
                req.flash("error", "Email or Password incorrect");
                res.redirect("/");
            }
        });
    } catch (error) {

    }
}

module.exports.logout = async (req, res)=>{
    res.cookie("token", "");
    res.redirect("/");
}