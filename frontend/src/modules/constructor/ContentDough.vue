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
                    :checked='props.dough === DoughStyleToValue(dough.name_eng)'
                    
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
    default: 'small',
  }
})

const emit = defineEmits(["setDough"]);


function getDoughStyle(dough_name) {
  return `dough__input--${dough_name}`;
}

function DoughStyleToValue(dough_name){
  if(dough_name === 'light'){
    return 'small';
  }
  else{
    return 'big';
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
// title
.title {
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  color: $black;
  &--big {
    @include b-s36-h42;
  }
  &--small {
    @include b-s18-h21;
  }
}
// visually-hidden
.visually-hidden {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  white-space: nowrap;
  border: 0;
  clip-path: inset(100%);
}
// sheet
.sheet {
  padding-top: 15px;
  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}
.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}
.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;
  border-top: 1px solid rgba($green-500, 0.1);
}
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