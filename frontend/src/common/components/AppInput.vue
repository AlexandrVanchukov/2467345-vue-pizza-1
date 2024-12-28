<template>
  <div class="text-field">
    <input
      :value="modelValue"
      :type="type"
      :name="name"
      class="text-field__input"
      :class="{ 'text-field__input--error': showError }"
      :placeholder="placeholder"
      :required="required"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <span v-if="showError" class="text-field__text">
      {{ errorText }}
    </span>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  errorText: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const input = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const showError = computed(() => {
  return !!props.errorText;
});
</script>
<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.text-field {
  position: relative;
  &__input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 12px 16px;
    color: $black;
    border: 1px solid $white;
    border-radius: 6px;
    &--error {
      border-color: $red-800;
    }
    &:focus {
      border-color: $green-600;
    }
  }
  &__text {
    position: absolute;
    bottom: -12px;
    left: 0;
    color: $red-800;
    @include typography_template(10px, 12px);
  }
}
</style>
