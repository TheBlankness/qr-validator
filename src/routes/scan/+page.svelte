<script>
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount } from "svelte";

  let scanning = false;

  let scannedText = "";

  let html5Qrcode;

  onMount(init);

  function init() {
    html5Qrcode = new Html5Qrcode("reader");
  }

  function start() {
    html5Qrcode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      onScanSuccess,
      onScanFailure
    );
    scanning = true;
  }

  async function stop() {
    await html5Qrcode.stop();
    scanning = false;
  }

  function onScanSuccess(decodedText, decodedResult) {
    // alert(`Code matched = ${decodedText}`);
    // console.log(decodedResult);
    scannedText = decodedText;
  }

  function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
  }

  function checkQrcodeExists(qrcode) {
    // Check if the array contains any item with the given qrcode
    const storedArray = localStorage.getItem("qrcodes");
    const array = storedArray ? JSON.parse(storedArray) : [];
    const existingItem = array.find((item) => item.qrcode === qrcode);

    // If an item with the given qrcode exists, return true; otherwise, return false
    return !!existingItem;
  }
</script>

<main>
  <reader id="reader" />
  {#if scanning}
    <button on:click={stop}>stop</button>
  {:else}
    <button on:click={start}>start</button>
  {/if}

  <p>Scanned Text</p>
  <p>{scannedText}</p>
  <p>{checkQrcodeExists(scannedText) ? "Valid" : "Not Valid"}</p>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  reader {
    width: 100%;
    min-height: 500px;
    background-color: black;
  }
</style>
