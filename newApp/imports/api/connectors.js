import Sequelize from 'sequelize'
import fetch from 'node-fetch'

const db = new Sequelize('blog', null,null, {
    dialect: 'sqlite',
    storage: './blog.sqlite',
});

const AuthorModel = db.define('author',{
    firstName: { type: Sequelize.STRING },
    lastName: { type:Sequelize.STRING },
});

const PostModel =db.define('post',{
    title: { type: Sequelize.STRING },
    text: { type: Sequelize.STRING },
});

AuthorModel.hasMany(PostModel);
PostModel.belongsTo(AuthorModel);

const Author = db.models.author;
const Post = db.models.post;

const FortuneCookie ={
    getOne(){
        return fetch('http://fortunecookieapi.herokuapp.com/v1/cookie')
        .then(res => res.json())
        .then(res =>{
            // extract the first element the value is an object that has a msg
            return res[0].fortune.message;
        });
    },
};

export {Author, Post, AuthorModel,db, FortuneCookie}