
const Notification =  require('../models/notifications.model')
module.exports = {
    
CreateNotification : async(data)=>{
    try {
    const {user,notificationType,notificationId,title,body} = data

    
         const notification  = new Notification({
            user:user,
            notificationType:notificationType,
            notificationId:notificationId,
            title:title,
            body:body

        })

        await notification.save()
    }catch (error) {
        console.log(error)
    }

}

}