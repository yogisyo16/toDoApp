<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// Define the props this component accepts
const props = defineProps<{
    // This prop controls whether the modal is visible
    isOpen: boolean;
    // Optional title for the modal
    title?: string;
}>();

// Define the custom events this component can emit
const emit = defineEmits(['close']);

// Function to emit the 'close' event when the backdrop is clicked or a close button is pressed
const handleClose = () => {
    emit('close');
};
</script>

<template>
    <Transition name="modal">
        <div v-if="isOpen" class="modal-mask" @click.self="handleClose">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header">
                            <h3>{{ title || 'Modal Title' }}</h3>
                        </slot>
                        <button class="modal-close-btn" @click="handleClose">
                            &times;
                        </button>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <button class="modal-default-button" @click="handleClose">
                                OK
                            </button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
/* --- Modal Styling --- */
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start; /* Aligns modal to the top for better user experience */
    padding-top: 50px; /* Adjust as needed */
}

.modal-container {
    width: 90%;
    max-width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

/* Header and Close Button */
.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}
.modal-close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 1;
}

/* Body and Footer */
.modal-body {
    margin: 20px 0;
}
.modal-footer {
    text-align: right;
}
.modal-default-button {
    background-color: #42b983;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* --- Transition Styles --- */
/* For the background mask */
.modal-enter-from, .modal-leave-to {
    opacity: 0;
}

/* For the modal content */
.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>