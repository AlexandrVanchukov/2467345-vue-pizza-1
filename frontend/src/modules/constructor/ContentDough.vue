<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <template v-for="dough in doughs" :key="dough.id">
          <label
            class="dough__input"
            :class="getDoughStyle(dough.name_eng)"
            @click="emit('setDough', DoughStyleToValue(dough.name_eng))"
          >
            <input
              type="radio"
              name="dought"
              :value="DoughStyleToValue(dough.name_eng)"
              class="visually-hidden"
              :checked="props.dough === DoughStyleToValue(dough.name_eng)"
            />
            <b>{{ dough.name }}</b>
            <span>{{ dough.description }}</span>
          </label>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import doughs from "../../mocks/dough.json";

const props = defineProps({
  dough: {
    type: String,
    required: true,
    default: "small",
  },
});

const emit = defineEmits(["setDough"]);

function getDoughStyle(dough_name) {
  return `dough__input--${dough_name}`;
}

function DoughStyleToValue(dough_name) {
  if (dough_name === "light") {
    return "small";
  } else {
    return "big";
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// dough
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
.dough__input {
  position: relative;
  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;
  cursor: pointer;
  b {
    @include r-s16-h19;
    &::before {
      @include p_center-v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }
  span {
    @include l-s11-h13;
    display: block;
  }
  &--light {
    b {
      &::before {
        background-image: url("@/assets/img/dough-light.svg");
      }
    }
  }
  &--large {
    b {
      &::before {
        background-image: url("@/assets/img/dough-large.svg");
      }
    }
  }
  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }
  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
