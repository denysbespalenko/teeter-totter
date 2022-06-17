<template>
  <UIContainer>
    <BoxesSection />
    <SwingSection />
  </UIContainer>
</template>

<script>
import UIContainer from "@/components/UI/UIContainer";
import BoxesSection from "@/components/BoxesSection";
import SwingSection from "@/components/SwingSection";

export default {
  name: "GameSection",

  components: {
    UIContainer,
    BoxesSection,
    SwingSection,
  },
};
</script>

<style scoped>
#GameSection {
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
}
</style>
