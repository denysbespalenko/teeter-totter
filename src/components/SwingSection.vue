<template>
  <div class="swing-section">
    <Crossbar />
    <CrossbarPillar />
  </div>
</template>

<script>
import Crossbar from "@/components/Crossbar";
import CrossbarPillar from "@/components/CrossbarPillar";
export default {
  name: "SwingSection",
  components: {
    Crossbar,
    CrossbarPillar,
  },
};
</script>

<style scoped>
.swing-section {
  height: 30%;
}
</style>
