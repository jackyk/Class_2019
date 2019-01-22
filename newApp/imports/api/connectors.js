import sequelize from 'sequelize'
import fetch from 'node-fetch'

const db = new sequelize('blog', null,null{
    dialect: 'sqlite',
    storage: './blog.sqlite',
});

const AuthorModel = db.define('author',{
    firstName: { type: sequelize.STRING },
    lastName: { type:sequelize.STRING },
});

const PostModel =db.define('post',{
    title: { type: sequelize.STRING },
    text: { type: sequelize.STRING },
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
            return res[0].fortune.message;
        });
    },
};

export {Author, Post, AuthorModel,db, FortuneCookie}