<template>
    <section>
        <div class="container flex">
            <div class="left h-[75vh] w-1/3 ">
                <message></message>
            </div>
            <div class="right h-[75vh] w-3/4">
                <Chat></Chat>
            </div>
        </div>
    </section>
</template>
<script setup>
import message from "../module/messages/message.vue"
import Chat from "../module/messages/chat.vue"
</script>
<style scoped>
    
</style>