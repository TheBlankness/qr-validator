<script>
  import { Html5Qrcode } from "html5-qrcode";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
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
    scannedText = decodedText;
  }

  function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
  }

  function insertOrUpdateObject(array, qrcode, valid) {
    if (!browser) return; //ONLY CLIENT SIDE!!!!
    const existingItem = array.find((item) => item.qrcode === qrcode);

    if (existingItem) {
      if (existingItem.valid !== valid) {
        existingItem.valid = valid;
      }
    } else {
      array.push({ qrcode, valid });
    }

    // Store the updated array in localStorage
    localStorage.setItem("qrcodes", JSON.stringify(array));
  }
  function getArrayFromLocalStorage() {
    if (!browser) return; //ONLY CLIENT SIDE!!!!
    // Fetch the array from localStorage and parse it back to an object
    const storedArray = localStorage.getItem("qrcodes");
    return storedArray ? JSON.parse(storedArray) : [];
  }

  // Example usage:
  const myqrcodes = getArrayFromLocalStorage();
</script>

<main>
  <reader id="reader" />
  {#if scanning}
    <button on:click={stop}>stop</button>
  {:else}
    <button on:click={start}>start</button>
  {/if}

  <p>Your scanned QR value</p>
  <p>{scannedText}</p>
  <button
    style="padding: 20px;"
    on:click={() => {
      insertOrUpdateObject(myqrcodes, scannedText, true);
    }}>Mark Valid</button
  >
  <button
    style="padding: 20px;"
    on:click={() => {
      localStorage.setItem("qrcodes", JSON.stringify([]));
    }}>Clear</button
  >
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
