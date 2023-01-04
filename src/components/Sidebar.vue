<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse">
    <div class="position-sticky pt-3 sidebar-sticky">

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
        <span>管理員</span>
        <a class="link-secondary" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle" class="align-text-bottom"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item" v-for="(item,index) in navs" :key="index">
          <router-link @click="active=index" :class="{'active':index===active}" class="nav-link " :to="item.path">
            <i :class="item.icon" class="bi me-2"></i>
            {{item.title}}
          </router-link>
        </li>

      </ul>
      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
        <span>功能</span>
        <a class="link-secondary" href="#" aria-label="Add a new report">
          <span data-feather="plus-circle" class="align-text-bottom"></span>
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">
            <i class="bi bi-cart-dash me-2"></i>
            模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import {ref} from "vue";

const active = ref(0)
const navs = [
  {
    path: '/admin/products',
    title: '產品',
    icon:'bi-box2'
  },
  {
    path: '/admin/orders',
    title: '訂單',
    icon:'bi-grid-3x3-gap'
  },
  {
    path: '/admin/coupon',
    title: '優惠券',
    icon:'bi-map'
  }]
</script>

<style scoped>

</style>
