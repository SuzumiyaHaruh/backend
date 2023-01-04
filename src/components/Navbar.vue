<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 ffp" href="#">Admin</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!--    <input class="form-control form-control-dark w-100 rounded-0 border-0" type="text" placeholder="Search"-->
    <!--           aria-label="Search">-->
    <div class="navbar-nav d-none d-md-block">
      <div class="nav-item text-nowrap">
        <a class="nav-link px-3 ffp" href="#" data-bs-toggle="modal" data-bs-target="#sinOutModal">登出</a>
      </div>
    </div>
  </header>
  <Modal @confirm="signOut" modalId="sinOutModal" title="提示">
    是否退出當前賬號？
  </Modal>
</template>

<script setup>
import {getLogout} from '../api/login.js'
import {useRouter} from 'vue-router'
import Modal from './Modal.vue'
import {removeToken} from "../util/cookie.js";
const router = useRouter()
const signOut = () => {
  getLogout().then(res => {
    removeToken()
    $('#sinOutModal').modal('hide')
    router.push('/login')
  })
}
</script>

<style scoped>

</style>
