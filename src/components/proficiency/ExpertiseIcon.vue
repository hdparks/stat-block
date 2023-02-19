<template>
  <FontAwesomeLayers class="proficiency-level-icon expert">
    <FontAwesomeIcon icon="fa-regular fa-circle"></FontAwesomeIcon>
    <FontAwesomeIcon
      icon="fa-solid fa-circle"
      transform="shrink-6"
    ></FontAwesomeIcon>
  </FontAwesomeLayers>
</template>
<script setup lang="ts">
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
</script>
<style scoped>
.fa-stack.small {
  font-size: 0.5em;
}
svg {
  vertical-align: middle;
}

.proficiency-level-icon.expert {
  color: #7A200D;
}
</style>
