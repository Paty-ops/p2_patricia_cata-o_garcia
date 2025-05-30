<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog } from 'primevue'
import type { Pais } from '@/models/Pais'


const ENDPOINT = 'paises'
const paises = ref<Pais[]>([])
const emit = defineEmits(['edit'])
const paisDelete = ref<Pais | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
    paises.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(pais: Pais) {
    emit('edit', pais)
}

function mostrarEliminarConfirm(pais: Pais) {
    paisDelete.value = pais
    mostrarConfirmDialog.value = true
}
async function eliminar() {
    await http.delete(`${ENDPOINT}/${paisDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
}
onMounted(() => {
    obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
    <div>
        <table style="border-collapse: collapse" border="1">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(pais, index) in paises" :key="pais.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ pais.id }}</td>
                    <td>{{ pais.descripcion }}</td>
                    <td>
                        <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(pais)" />
                        <Button icon="pi pi-trash" aria-label="Eliminar" severity="danger" text
                            @click="mostrarEliminarConfirm(pais)" />
                    </td>
                </tr>
            </tbody>
        </table>
        <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
            <p>¿Estás seguro de que deseas eliminar este registro?</p>
            <br />
            <div class="flex justify-end gap-2">
                <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
                <Button type="button" label="Eliminar" @click="eliminar" />

            </div>
        </Dialog>
    </div>
</template>

<style scoped></style>