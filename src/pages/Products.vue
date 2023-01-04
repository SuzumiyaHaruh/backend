<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-end mt-4">
      <button class="g-btn" @click="openModal(true)">新增產品</button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>分類</th>
        <th>產品名稱</th>
        <th>原價</th>
        <th>售價</th>
        <th>是否啟用</th>
        <th width="120">編輯</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in products" :key="index">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-start"> ${{ item.origin_price }}</td>
        <td class="text-start"> ${{ item.price | currency }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <button @click="openModal(false,item)" class="g-btn border-end-0">編輯</button>
          <button @click="removeProduct(item.id)" class="d-btn ">刪除</button>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item " :class="{'disabled':!pagination.has_pre}">
            <a class="page-link rounded-0" href="#" aria-label="Previous"
               @click.prevent="InitProducts(pagination.current_page - 1)"
            >
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="page in pagination.total_pages" :key="page"
              :class="{'active':pagination.current_page===page}"
          >
            <a @click.prevent="InitProducts(page)" class="page-link" href="#">{{ page }}</a>
          </li>
          <li class="page-item" :class="{'disabled':!pagination.has_next}">
            <a class="page-link rounded-0" href="#" aria-label="Next"
               @click.prevent="InitProducts(pagination.current_page + 1)"
            >
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <!-- Modal -->
  <Modal @confirm="handleUpdateProduct" modalId="productModal" :title="title">
    <div class="row">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="image">輸入圖片網址</label>
          <input type="text" class="form-control border-0 bg-grey rounded-0" id="image"
                 v-model="tempProduct.imageUrl"
                 placeholder="請輸入圖片連結">
        </div>
        <div class="form-group">
          <label for="customFile">或 上傳圖片
            <i v-if="isFileUploadLoading" class="fas fa-spinner fa-spin"></i>
          </label>
          <input type="file" id="customFile" class="form-control border-0 bg-grey rounded-0"
                 ref="files" @change="uploadFile">
        </div>
        <img
            img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
            class="img-fluid" :src="tempProduct.imageUrl" alt="">
      </div>
      <div class="col-sm-8">
        <div class="form-group">
          <label for="title">標題</label>
          <input type="text" class="form-control border-0 bg-grey rounded-0" id="title"
                 v-model="tempProduct.title"
                 placeholder="請輸入標題">
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="category">分類</label>
            <input type="text" class="form-control border-0 bg-grey rounded-0" id="category"
                   v-model="tempProduct.category"
                   placeholder="請輸入分類">
          </div>
          <div class="form-group col-md-6">
            <label for="price">單位</label>
            <input type="unit" class="form-control border-0 bg-grey rounded-0" id="unit"
                   v-model="tempProduct.unit"
                   placeholder="請輸入單位">
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="origin_price">原價</label>
            <input type="number" class="form-control border-0 bg-grey rounded-0" id="origin_price"
                   v-model="tempProduct.origin_price"
                   placeholder="請輸入原價">
          </div>
          <div class="form-group col-md-6">
            <label for="price">售價</label>
            <input type="number" class="form-control border-0 bg-grey rounded-0" id="price"
                   v-model="tempProduct.price"
                   placeholder="請輸入售價">
          </div>
        </div>
        <hr>

        <div class="form-group">
          <label for="description">產品描述</label>
          <textarea type="text" class="form-control border-0 bg-grey rounded-0" id="description"
                    v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
        </div>
        <div class="form-group">
          <label for="content">說明內容</label>
          <textarea type="text" class="form-control border-0 bg-grey rounded-0" id="content"
                    v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox"
                   v-model="tempProduct.is_enabled"
                   :true-value="1"
                   :false-value="0"
                   id="is_enabled">
            <label class="form-check-label" for="is_enabled">
              是否啟用
            </label>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue'
import {addProduct, deleteProduct, getProducts, setUpload, updateProduct} from '../api/products.js'
import Modal from '../components/Modal.vue'
import {notification} from "../util/notification.js";

let title = ref('')
let products = ref([])
let tempProduct = ref({})
const isNew = ref(false)
let isLoading = ref(true)
let isFileUploadLoading = ref(false)
let pagination = ref({})
/**
 *  初始化产品
 * @constructor
 */
const InitProducts = (page = 1) => {
  isLoading = true
  getProducts(page).then(res => {
    products.value = res.data.products
    isLoading = false
    pagination = res.data.pagination
  })
}
/**
 * 打开弹窗
 * @param isNew
 * @param item
 */
const openModal = (isNew, item) => {
  if (isNew) {
    title.value = '新增產品'
    tempProduct.value = {}
    isNew = true
  } else {
    title.value = '修改產品'
    tempProduct.value = Object.assign({}, item)
    isNew = false
  }
  $('#productModal').modal('show')
}
/**
 * 删除产品
 * @param id
 */
const removeProduct = (id) => {
  deleteProduct(id).then(res => {
    if (res.data.success) {
      InitProducts()
    }
  })
}
/**
 * 新增、更新产品
 */
const handleUpdateProduct = () => {
  if (title.value === '新增產品') {

    addProduct({data: tempProduct.value}).then(res => {
      if (res.data.success) {
        $('#productModal').modal('hide')
        // 刷新一下
        InitProducts()
      }
    })
  } else {
    updateProduct(tempProduct.value.id, {data: tempProduct.value}).then(res => {
      if (res.data.success) {
        $('#productModal').modal('hide')
        // 刷新一下
        InitProducts()
      }
    })
  }
}
/**
 * 上传文件
 * @param e
 */
const uploadFile = (e) => {
  isFileUploadLoading.value = true
  // 获取文件
  const file = e.target.files[0];
  const formData = new FormData()
  formData.append('file-to-upload', file)
  setUpload(formData).then(res => {
    if (res.data.success) {
      isFileUploadLoading.value = false
      tempProduct.value.imageUrl = res.data.imageUrl
    }
  })

}
onMounted(() => {
  InitProducts()
})

</script>

<style scoped>

</style>
