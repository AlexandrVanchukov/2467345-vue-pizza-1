<template>
  <div
    :draggable="props.isDragable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script setup>
import { DATA_TRANSFER_PAYLOAD, MOVE } from "../constants";

const props = defineProps({
  transferData: {
    type: String,
    required: true,
  },
  isDragable: {
    type: Boolean,
    default: true,
  },
});

function onDrag({ dataTransfer }) {
  dataTransfer.effectAllowed = MOVE;
  dataTransfer.dropEffect = MOVE;
  dataTransfer.setData(
    DATA_TRANSFER_PAYLOAD,
    JSON.stringify(props.transferData)
  );
}
</script>

<style lang="scss" scoped></style>
