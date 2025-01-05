<template>
  <div class="popup-overlay" @click="handleOverlayClick">
    <AppPopup>
      <router-link
        :to="
          useProfileStore().isAuthenticated ? { name: 'orders' } : { name: 'home' }
        "
        class="close"
      >
        <span class="visually-hidden">Закрыть попап</span>
      </router-link>
      <AppPopupTitle> Спасибо за заказ </AppPopupTitle>
      <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
      <AppPopupButton>
        <router-link
          :to="
            useProfileStore().isAuthenticated ? { name: 'orders' } : { name: 'home' }
          "
          class="button"
        >
          Отлично, я жду!
        </router-link>
      </AppPopupButton>
    </AppPopup>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { useProfileStore } from "../../stores";
import AppPopup from "@/common/components/popup/AppPopup.vue";
import AppPopupTitle from "@/common/components/popup/AppPopupTitle.vue";
import AppPopupButton from "@/common/components/popup/AppPopupButton.vue";


const router = useRouter();

const handleOverlayClick = () => {
  router.push({ name: useProfileStore().isAuthenticated ? "orders" : "home" });
};
</script>
<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-overlay AppPopup {
  z-index: 1010;
}
</style>
