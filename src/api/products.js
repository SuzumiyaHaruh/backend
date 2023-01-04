import instance from './index.js'

// 获得产品
export function getProducts(page) {
    return instance.get(`/api/${import.meta.env.VITE_CUSTOM_PATH}/admin/products?page=${page}`)
}

// 新增产品
export function addProduct(data) {
    return instance.post(`/api/${import.meta.env.VITE_CUSTOM_PATH}/admin/product`, data)
}

// 更新產品
export function updateProduct(id, data) {
    return instance.put(`/api/${import.meta.env.VITE_CUSTOM_PATH}/admin/product/${id}`, data)
}

//删除產品
export function deleteProduct(id) {
    return instance.delete(`/api/${import.meta.env.VITE_CUSTOM_PATH}/admin/product/${id}`)
}

//上传图片
export function setUpload(formData) {
    return instance.post(`/api/${import.meta.env.VITE_CUSTOM_PATH}/admin/upload/`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
// //切换页
// export function setOrders(page) {
//     return instance.post(`/api/${import.meta.env.VITE_CUSTOM_PATH}/admin/orders?page=${page}`)
// }
