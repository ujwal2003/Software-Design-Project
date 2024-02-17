<script>
  import {afterNavigate} from "svelte-navigator";
  import "../app.css";


  afterNavigate(() => {
    window.HSStaticMethods.autoInit();
  });
</script>

<slot />