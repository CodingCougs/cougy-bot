var NewsAPI = require('newsapi');

var Botkit = require('botkit');

var news_token = require('./config').news_token;
var news = new  NewsAPI(news_token);

askNews = function(response, convo) {
    
    convo.ask("Would you like me to show you the top news article?", function(response, convo) {
    
    //console.log(response);
    // console.log(convo);

    if(response.text.includes("yes")){
        giveNewsStory(response,convo);
    } else{
        convo.say("Alright maybe next time");
    }


}
    )};

giveNewsStory = function(response,convo){

    news.articles({
             source: 'cnn',
             sortby: "top",
         }).then(articlesResponse => {

             console.log(articlesResponse.articles[0]);
             var reply_with_attachments = {
                 "attachments": [
                     {
                         "title":articlesResponse.articles[0].title,
                         "image_url":articlesResponse.articles[0].urlToImage
                     },
                     {
                        "title": "Description",
                        "text":  articlesResponse.articles[0].description,
                     },
                     {
                        "text": articlesResponse.articles[0].url
                     }
            
                 ]
             }
             convo.say(reply_with_attachments);
             convo.next();  
         });  
    }

module.exports = askNews;