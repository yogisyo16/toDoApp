<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

type AlertType = "success" | "error" | "warning" | "info";

const props = defineProps<{
    isOpen: boolean;
    title?: string;
    message: string;
    type?: AlertType;
}>();

const emit = defineEmits(["close"]);

const handleClose = () => {
    emit("close");
};

// Auto-close after 3 seconds for success messages
if (props.type === "success" && props.isOpen) {
    setTimeout(() => {
        handleClose();
    }, 3000);
}

// Get colors based on alert type
const getAlertStyles = () => {
    switch (props.type) {
        case "success":
            return {
                bg: "bg-green-500/20",
                border: "border-green-500",
                text: "text-green-400",
                icon: "✓",
            };
        case "error":
            return {
                bg: "bg-red-500/20",
                border: "border-red-500",
                text: "text-red-400",
                icon: "✕",
            };
        case "warning":
            return {
                bg: "bg-yellow-500/20",
                border: "border-yellow-500",
                text: "text-yellow-400",
                icon: "⚠",
            };
        case "info":
        default:
            return {
                bg: "bg-blue-500/20",
                border: "border-blue-500",
                text: "text-blue-400",
                icon: "ℹ",
            };
    }
};

const styles = getAlertStyles();
</script>

<template>
    <!-- Overlay -->
    <Transition name="fade">
        <div
            v-if="isOpen"
            @click="handleClose"
            class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        >
            <!-- Alert Box -->
            <Transition name="slide-down">
                <div
                    v-if="isOpen"
                    @click.stop
                    :class="[
                        'max-w-md w-full mx-4 rounded-lg border-2 p-4 shadow-lg',
                        styles.bg,
                        styles.border,
                    ]"
                >
                    <div class="flex items-start gap-3">
                        <!-- Icon -->
                        <div
                            :class="[
                                'shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xl font-bold',
                                styles.bg,
                                styles.text,
                            ]"
                        >
                            {{ styles.icon }}
                        </div>

                        <!-- Content -->
                        <div class="flex-1">
                            <h3
                                v-if="title"
                                :class="[
                                    'font-semibold text-lg mb-1',
                                    styles.text,
                                ]"
                            >
                                {{ title }}
                            </h3>
                            <p class="text-gray-300">{{ message }}</p>
                        </div>

                        <!-- Close Button -->
                        <button
                            @click="handleClose"
                            :class="[
                                'shrink-0 hover:bg-white/10 rounded p-1 transition-colors',
                                styles.text,
                            ]"
                            aria-label="Close"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<style scoped>
/* Fade transition for overlay */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* Slide down transition for alert box */
.slide-down-enter-active {
    transition: all 0.3s ease;
}

.slide-down-leave-active {
    transition: all 0.2s ease;
}

.slide-down-enter-from {
    transform: translateY(-20px);
    opacity: 0;
}

.slide-down-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
