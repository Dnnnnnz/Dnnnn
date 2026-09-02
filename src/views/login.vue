<template>
    <div class="container">
        <div class="title">
            <div class="back-home">
                <el-icon>
                    <Back />
                </el-icon>
                <span>返回首页</span>
            </div>
            <div class="title-text">
                <h2>登录您的账户</h2>
                <p>请输入您的账户密码</p>

            </div>
        </div>
        <div class="form-container">
                        <el-form
                ref="ruleFormRef"
                :model="formData"
                :rules="rules"
                label-position="top"
            >
                <el-form-item label="用户名或邮箱" prop="username">
                    <el-input v-model="formData.username" size="large" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password />
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" size="large" type="primary" @click="submitForm(ruleFormRef)">登录账户</el-button>
                </el-form-item>
            </el-form>
            <div class="footer">
                <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { login } from '@/api/admin'
import { useRouter } from 'vue-router'

const ruleFormRef = ref()

const formData = ref({
    username: '',
    password: ''
})
const rules = ref({
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
})
// 登录
const router = useRouter()
const submitForm = async (formEl) => {
    if(!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            login(formData.value).then(data => {
                // 登录成功后，将token和userInfo信息存储到localStorage中，判断token是否存在
                if(!data.token){
                    return console.error('登录失败')
                }
                // 登录成功后，将token和userInfo信息存储到localStorage中
                localStorage.setItem('token', data.token)
                localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
                //根据用户角色跳转到不同的页面
                if(data.userInfo.userType === 2){
                    router.push('/back/dashboard')
                }else{
                    router.push('/front/dashboard')
                }

            }).catch(() => {
                // 失败原因已在响应拦截器中统一弹窗提示，这里仅捕获避免控制台 Uncaught 报错
            })
    }
    })
}
</script>
<style scoped lang="scss">
   .container{
    width: 384px;
    .title{
        .back-home{
            margin-bottom: 60px;
        }
        .title-text{
            text-align: center;
            h2{
                font-size: 36px;
                margin-bottom: 10px;
            }
            p{
                font-size: 18px;
                color: #6b7280;
            }
        }


    }
    .form-container{
        margin-top: 30px;
        .btn{
            margin-top: 40px;
            width: 100%;
            text-align: center;
        }
        .footer{
            margin-top: 40px;
            text-align: center;
        }
    }

   }
</style>
