import {ElNotification} from "element-plus";

export const notification = (title,message,type,duration) => {
    ElNotification({
        title,
        message,
        type,
        duration
    })
}
