<template>
    <el-row>
        <el-col class="message-box" :span="24">
            <i v-if="!isIndex" :class="['fold-icon',!collapse?'el-icon-s-fold':'el-icon-s-unfold']" @click="collapseChage"></i>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-if="!isIndex">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" :to="item.path">
                        {{ item.meta.title }}
                    </el-breadcrumb-item>
                </transition-group>
            </el-breadcrumb>
        </el-col>
    </el-row>
</template>
<script>
export default {
    data(){
        return {
            levelList:null,
            collapse: false
        }
    },
    watch:{
        $route(){
            this.getBreadcrumb()
        }
    },
    computed:{
        isIndex(){
            return this.$route.path === '/dashboard' ? true : false
        }
    },
    created(){
        this.getBreadcrumb()
    },
    methods:{
        getBreadcrumb(){
            let matched = this.$route.matched.filter(item =>item.meta&&item.meta.title)
            const first = matched[0];
            if(!this.isDashboard(first)){
                matched = [{ path: '/dashboard', meta: { title: '系统首页' }}].concat(matched)
            }
            // 为了解决页面非上一级页面的子路由时在面包屑上显示不了上一级页面的的问题
            // var a=this.$route.fullPath.split('/')
            var length=matched.length
            var lastOne=matched[length-1]
            if(length>=2 && lastOne.meta.father){
                var father= lastOne.meta.father
                var fatherUrl=lastOne.meta.fatherUrl
                matched.splice(length-1,0,{ path:fatherUrl, meta: { title:father }})
            }
            this.levelList = matched.filter(item => item.meta && item.meta.title)
        },
        isDashboard(route) {
            const name = route && route.name
            if (!name) {
                return false
            }
            return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
        },
        // 侧边栏折叠
        collapseChage () {
            this.collapse = !this.collapse;
            this.$emit('collapse', this.collapse);
        }
    },
    mounted(){
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
}
</script>
<style lang="scss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
    transition: all .3s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
}

.breadcrumb-move {
    transition: all .3s;
}

.breadcrumb-leave-active {
    position: absolute;
}
.message-box{
    display:flex;
    align-items:center;
}
.fold-icon{
    font-size:24px;
    display:inline-block;
    color:#606266;
    margin-right:10px;
    cursor:pointer;
}
</style>
