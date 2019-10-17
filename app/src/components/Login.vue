<template>
  <div class="login-container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }" :validate-status="userNameError() ? 'error' : ''" :help="userNameError() || ''">
        <a-input
          v-decorator="[
            'userName',
            { rules: [{ required: true, message: '用户名不能为空' }] },
          ]"
          placeholder="请输入用户名"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '密码不能为空' }] },
          ]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }" :validate-status="passwordError() ? 'error' : ''" :help="passwordError() || ''">
        <a-input
          v-decorator="[
            'code',
            { rules: [{ required: true, message: '请输入验证码' }] },
          ]"
          placeholder="请输入验证码"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          <img slot="suffix" :src="captchaImage" @click="getCaptcha" alt="captcha">
        </a-input>
        <div id="test"></div>
      </a-form-item>
      <a-form-item :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
        <a-button type="primary" html-type="submit" :disabled="hasErrors(form.getFieldsError())">
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: 'Login',
    data(){
      return {
        hasErrors,
        form:this.$form.createForm(this, { name: 'demoLogin' }),
        captchaImage:""
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.form.validateFields();
      });
      this.getCaptcha()
    },
    methods: {
      userNameError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('userName') && getFieldError('userName');
      },
      passwordError() {
        const { getFieldError, isFieldTouched } = this.form;
        return isFieldTouched('password') && getFieldError('password');
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loginSubmit(values)
          }
        });
      },
      getCaptcha(event){
        // event.target.src = this.$axios.defaults.baseURL+'/getCaptcha?'+Math.random()
        this.$axios.get('/getCaptcha').then((response) => {
          let a = window.btoa(unescape(encodeURIComponent(response.data)))
          this.captchaImage = 'data:image/svg+xml;base64,' +a
        })
      },
      loginSubmit(value){
        this.$axios.post('login',value).then((response) => {
          console.log(response);
          if(response.data.code === 200){
            this.$notification.success({
               message: response.data.text
            })
          }else{
            this.$notification.error({
               message: response.data.text
            })
          }
        })
      }
    }
}
</script>

<style>
.ant-form-item{
  display: flex !important;
  justify-content: center;
}
</style>
