<template>
    <div>
        <h1>Hello World</h1>
        <p>{{todos}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            return this.$props.state;
        },
        props: ['state']
    }
</script>
<style>
</style>