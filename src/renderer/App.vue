<template>
    <div id="app">
        <button class="button" @click="max">最大化</button>
        <button class="button" @click="close">关闭</button>
    </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
    name: 'App',
    data() {
        return {
            show: false,
            loginBox: false
        }
    },
    created() {},
    methods: {
        max() {
            ipcRenderer.send('max')
        },
        close() {
            ipcRenderer.send('close')
        }
    }
}
</script>

<style>
#app {
    background-color: beige;
    height: 100vh;
}
.button {
    outline: none;
    line-height: 36px;
    background-color: cadetblue;
    color: #ffffff;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    padding: 0 20px;
    cursor: pointer;
}
</style>
