<template>
    <div>
        <button @click="addCounter">You clicked me {{ count }} times.</button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            count: 0
        }
    },
    methods:{
        addCounter(){
            this.$emit('add-sum')
        }
    }
}
</script>