<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const email = ref("");
const notifications = ref(true);

const handleSaveSettings = () => {
    // You'll implement this later with your backend
    console.log("Settings saved:", { username, email, notifications });
};
</script>

<template>
    <div class="max-w-2xl mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6 text-white">Account Settings</h1>

        <form
            @submit.prevent="handleSaveSettings"
            class="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
            <div class="mb-4">
                <label class="block text-sm font-bold mb-2 text-gray-300"
                    >Username</label
                >
                <input
                    type="text"
                    v-model="username"
                    placeholder="Enter your username"
                    class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-bold mb-2 text-gray-300"
                    >Email</label
                >
                <input
                    type="email"
                    v-model="email"
                    placeholder="Enter your email"
                    class="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
            </div>

            <div class="mb-6 flex items-center">
                <input
                    type="checkbox"
                    v-model="notifications"
                    id="notifications"
                    class="w-4 h-4 mr-2"
                />
                <label for="notifications" class="text-sm text-gray-300">
                    Enable notifications
                </label>
            </div>

            <button
                type="submit"
                class="w-full p-2.5 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors"
            >
                Save Settings
            </button>
        </form>
    </div>
</template>
