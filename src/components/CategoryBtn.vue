<script setup>
const props = defineProps({
  label: String,
  size: String,
  clickable: Boolean,
  active: Boolean,
  bgColor: {
    type: String,
    default: "default-color",
  },
  activeBg: {
    type: [String, Boolean],
    default: false
  }
});

const getContrastColor = (hex) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#000000" : "#ffffff";
};

</script>

<template>
  <div>
    <button
        class="categories__list-btn"
        :class="[size]"
        :style="{
              background: activeBg ? activeBg : bgColor,
              color: activeBg ? getContrastColor(activeBg) : getContrastColor(bgColor)}"
    >
      {{ label }}
    </button>
  </div>
</template>


<style lang="scss" scoped>
.categories__list-btn {
  background: #EDEDED;
  border-radius: 30px;
  font-family: Inter, serif;
  white-space: nowrap;
  color: #000000;
  transition: ease .3s;
}

.medium {
  font-size: 16px;
  padding: 8px 12px;
  cursor: pointer;
}

.small {
  font-size: 12px;
  padding: 4px 7px;
  color: #ffffff;
}


.default-bg-color {
  background: #EDEDED;
  color: #000000;
}
</style>