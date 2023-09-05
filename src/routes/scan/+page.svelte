<script>
  export let data;

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
    // alert(`Code matched = ${decodedText}`);
    // console.log(decodedResult);
    scannedText = decodedText;
  }

  function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
  }

  function checkQrcodeExists(qrcode) {
    if (!browser) return; //ONLY CLIENT SIDE!!!!
    // Check if the array contains any item with the given qrcode
    const storedArray = data.qrcodes;
    const array = storedArray ? storedArray : [];
    const existingItem = array.find((item) => item.qrcode === qrcode);

    // If an item with the given qrcode exists, return true; otherwise, return false
    return !!existingItem;
  }
</script>

<main>
  <reader id="reader" />
  {#if scanning}
    <button
      class="px-4 bg-red-500 text-white p-2 font-bold rounded-md"
      on:click={stop}>STOP</button
    >
  {:else}
    <button
      class="px-4 bg-blue-600 text-white p-2 font-bold rounded-md"
      on:click={start}>START</button
    >
  {/if}

  <p class="text-xl font-bold mb-2">Your scanned QR value</p>
  <div class="bg-gray-200 rounded-md p-3">
    <p class="text-lg font-normal">{scannedText}</p>
  </div>

  {#if checkQrcodeExists(scannedText)}
    <p class="px-4 bg-green-500 text-white p-2 font-bold rounded-md">
      Authentic Product
    </p>
  {:else if scannedText}
    <p class="px-4 bg-red-500 text-white p-2 font-bold rounded-md">
      Not Authentic Product
    </p>
  {/if}

  <a
    href="/"
    class="mt-2 bg-zinc-600 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded-md mb-4 inline-block"
  >
    Go to Home
  </a>
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
