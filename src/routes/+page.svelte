<title>Home Page</title>

<main class="flex flex-col items-center justify-center h-screen px-7">
  <h1 class="text-2xl font-bold mb-8">Welcome to Food validator!</h1>

  <p class="text-2xl font-bold mb-2">For Users</p>
  <div class="bg-gray-200 rounded-md p-3">
    <p class="text-md font-semibold">Step 1: Click on "Go to Scan"</p>
    <p class="text-md font-semibold">Step 2: Press "Start Scan"</p>
    <p class="text-md font-semibold">
      Step 3: System will notify if the item is valid
    </p>
  </div>

  <a
    href="/scan"
    class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mb-4 inline-block"
  >
    Go to Scan 📸
  </a>

  <p class="text-2xl font-bold mb-2 mt-4">For Admin Only</p>
  <div class="bg-gray-200 rounded-md p-3">
    <p class="text-md font-semibold">Step 1: Click on "Login"</p>
    <p class="text-md font-semibold">
      Step 2: Login with username and password default admin/admin
    </p>
    <p class="text-md font-semibold">Step 3: Press "Start Scan"</p>
    <p class="text-md font-semibold">
      Step 4: System will add QR to the database
    </p>
    <p class="text-md font-semibold">Step 5: Mark QR code as a valid item</p>
  </div>

  <a
    href="/login"
    class="mt-2 bg-cyan-600 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md inline-block"
  >
    Admin Login 👨🏻‍⚖️
  </a>
</main>
