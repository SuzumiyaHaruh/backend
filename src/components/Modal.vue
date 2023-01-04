<template>
  <Teleport to="body">
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content rounded-0 border-0">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">{{ title }}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot/>
          </div>
          <div class="modal-footer">
            <button type="button" class="g-btn" data-bs-dismiss="modal">關閉</button>
            <button @click="$emit('confirm')" type="button" class="d-btn">確認</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  modalId: Object,
  title: String
}
)
defineEmits(['confirm'])
</script>

<style scoped>

</style>
