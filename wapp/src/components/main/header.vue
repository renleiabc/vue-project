<template>
  <div class="global-header">
    <div class="header-logo">
      <router-link :to="{name:'Home'}" tag='a'>
      </router-link>
    </div>
    <div class="header-title" v-show="show">
      <span>{{title}}</span>
    </div>
    <div class="header-nav" @click="navClick">
      <img :src="menu" alt="menu">
    </div>
    <el-dialog
      :visible.sync="dialogVisible" @close="dialogClose"
      @open="dialogOpen"
      width="100%"
      :modal-append-to-body="modal"
      :lock-scroll="modal"
      top="64px"
      custom-class="header-dialog"
      :show-close="false">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          @open="handleOpen"
          :active-text-color="color"
          @close="handleClose" :default-openeds="openeds">
          <el-submenu index="1">
            <template slot="title">
              <span>分类阅读</span>
            </template>
            <el-menu-item v-for="(item,key) in navTabs" :index="'1-'+item.id.toString()" :key="item.id"
                          @click.native="toReading(item.id)">
              {{item.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="2" class="header-el-menu-item">
            <router-link :to="{name:'LectureLists'}" tag='a'>
              <div class="tabs-text">开讲</div>
            </router-link>
          </el-menu-item>
        </el-menu>
    </el-dialog>
  </div>
</template>

<script>
  import menu from '../../assets/images/public/menu.svg'
  import close from '../../assets/images/public/close.svg'

  export default {
    data() {
      return {
        dialogVisible: false,
        modal: true,
        boo: false,
        menu: menu,
        color: "#AACA13",
        openeds: ['1'],
        show: false,
        title:""
      };
    },
    methods: {
      init(name) {
        console.log(name);
        switch (name) {
          case "Home":
            this.title = "";
            this.show = false;
            break;
          case "Reading":
            this.title = "分类阅读";
            this.show = true;
            break;
          case "Lecture":
            this.title = "开讲";
            this.show = true;
            break;
          default:
            this.title = "";
            this.show = false;;
        }
      },
      handleClose(done) {
        done();
      },
      dialogClose() {
        this.menu = menu;
      },
      dialogOpen() {
        this.menu = close;
      },
      navClick() {
        if (this.dialogVisible) {
          this.dialogVisible = false;
          this.dialogClose();
        } else {
          this.dialogVisible = true;
          this.dialogOpen();
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key);
      },
      toReading(id) {
        this.$router.push({name: 'Reading', params: {id: id}});
      },
      handleSelect(index, indexPath) {
        console.log(index);
        this.dialogVisible = false;
      }
    },
    created() {
      let name = this.$route.name;
      this.init(name);
      this.$store.dispatch('getTags');//分类标签;
    },
    computed: {
      navTabs() {
        return this.$store.getters.tabsData;
      },
    },
    watch: {
      $route(to, from) {
        let name = to.name;
        this.init(name);
      }
    },
  }
</script>

<style scoped>

</style>
