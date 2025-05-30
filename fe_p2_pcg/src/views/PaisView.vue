<script setup lang="ts">
import PaisList from '@/components/Pais/PaisList.vue'
import PaisSave from '@/components/Pais/PaisSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref(false)
const paisListRef = ref<typeof PaisList | null>(null)
const paisEdit = ref<any>(null)

function handleCreate() {
    paisEdit.value = null
    mostrarDialog.value = true
}

function handleEdit(pais: any) {
    paisEdit.value = pais
    mostrarDialog.value = true
}

function handleCloseDialog() {
    mostrarDialog.value = false
}

function handleGuardar() {
    paisListRef.value?.obtenerLista()
}
</script>

<template>
    <div class="externo">
        <h1>Paises</h1>
        <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
        <PaisList ref="serieListRef" @edit="handleEdit" />
        <PaisSave :mostrar="mostrarDialog" :pais="paisEdit" :modoEdicion="!!paisEdit" @guardar="handleGuardar"
            @close="handleCloseDialog" />
    </div>
</template>

<style scoped></style>
