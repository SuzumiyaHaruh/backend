<template>
  <section className="login-section">
    <div className="container d-flex justify-content-center">
      <div className="row col-lg-6">
        <div className="col-12 position-relative">
          <span className="round-shape"></span>
          <h3 className="sec-title">Login your Admin</h3>
          <p className="sec-desc">
            Login to your account to discovery all great features in this item
          </p>
          <div className="register-form">
            <form @submit.prevent="signin">
              <div className="col-lg-12">
                <input v-model="user.username" type="text" name="name" placeholder="User Name">
              </div>
              <div className="col-lg-12">
                <input v-model="user.password" type="password" name="password" placeholder="Password">
              </div>
              <div className="keep-log-regi">
                <input type="radio" id="register" name="register" value="keep-login">
                <label htmlFor="register">
                  Remember me don't forget me
                </label>
              </div>
              <input type="submit" name="submit" value="login">
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {reactive, ref} from 'vue'
import {getLogin} from '../api/login.js'
import {useRouter} from 'vue-router'
import {setToken} from '../util/cookie.js'

const router = useRouter()
const user = reactive({
  username: '',
  password: ''
})

const signin = () => {
  getLogin(user).then(res => {
    if (res.data.success) {
      const token = res.data.token
      const expired = res.data.expired
      // 存储cookie
      setToken(token, expired)
      router.push('/admin/products')
    }
  })
}
</script>

<style scoped>
</style>
