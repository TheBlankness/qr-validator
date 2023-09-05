<script>
  export let data;
  import axios from "axios";

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

  async function insertOrUpdateObject(array, qrcode, valid) {
    if (!browser) return; //ONLY CLIENT SIDE!!!!
    const existingItem = array.find((item) => item.qrcode === qrcode);
    if (existingItem) {
      if (existingItem.valid !== valid) {
        existingItem.valid = valid;
      }
    } else {
      array.push({ qrcode, valid });

      try {
        const res = await axios.post(`/api/apiqr`, {
          data: {
            name: qrcode,
          },
        });

        if (res.data) {
          console.log(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Store the updated array in localStorage
    localStorage.setItem("qrcodes", JSON.stringify(array));

    alert("QR added to database");
    scannedText = "";
  }
  function getArrayFromLocalStorage() {
    if (!browser) return; //ONLY CLIENT SIDE!!!!
    // Fetch the array from localStorage and parse it back to an object
    const storedArray = localStorage.getItem("qrcodes");
    return storedArray ? JSON.parse(storedArray) : [];
  }

  // Example usage:
  const myqrcodes = data.qrcodes;
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

  {#if scannedText}
    <button
      class="px-4 bg-green-700 text-white p-2 rounded-md"
      on:click={() => {
        insertOrUpdateObject(myqrcodes, scannedText, true);
      }}>Mark above code as Authentic</button
    >
  {:else}
    <button
      class="px-4 bg-red-100 text-gray p-2 rounded-md"
      disabled
      on:click={() => {
        insertOrUpdateObject(myqrcodes, scannedText, true);
      }}>Please Scan a valid QR</button
    >
  {/if}

  <a
    href="/"
    class="mt-2 bg-zinc-600 hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded-md mb-4 inline-block"
  >
    Go to Home
  </a>

  <p class="pt-11 text-xl font-bold mb-2 text-red-900">
    Dangerous Setting below
  </p>
  <button
    class="px-4 bg-red-500 text-white p-2 rounded-md"
    on:click={() => {
      localStorage.setItem("qrcodes", JSON.stringify([]));
    }}>Clear all QR values in database</button
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
