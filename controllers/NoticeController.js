
const Notice = require("../models/Notice");

class NoticeController {
    
    loadNotices(req, res){
         res.render("home")
    }
    

}

module.exports = new  NoticeController