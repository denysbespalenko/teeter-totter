<template>
  <main>
    <Header />
    <GameSection />
  </main>
</template>
|
<script>
import Header from "@/components/Header";
import GameSection from "./components/GameSection";

export default {
  name: "App",
  components: {
    Header,
    GameSection,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  margin: 0;
}
main {
  height: 100vh;
}
</style>
