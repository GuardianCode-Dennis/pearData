<script>
    import { Confetti } from "svelte-confetti";
</script>

<div style="
 position: fixed;
 top: -50px;
 left: 0;
 height: 100vh;
 width: 100vw;
 display: flex;
 justify-content: center;
 overflow: hidden;
 pointer-events: none;">
 <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration=5000 amount=500 fallDistance="100vh" colorArray={["#009367", "#003022", "#00402D", "#009367", "#029C2D"]} />
</div>