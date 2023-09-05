<script>
  let username = "";
  let password = "";

  async function handleSubmit() {
    if (username === "admin" && password === "admin") {
      window.location.href = "/addqr";
    } else {
      alert("Invalid username or password");
    }
  }
</script>

<main class="min-h-screen flex items-center justify-center bg-gray-100">
  <form method="post" class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-semibold mb-4">Login</h1>
    <div class="mb-4">
      <label for="username" class="block text-sm font-medium text-gray-700"
        >Username</label
      >
      <input
        type="text"
        id="username"
        name="username"
        bind:value={username}
        class="mt-1 p-2 border rounded-md w-full"
      />
    </div>
    <div class="mb-4">
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        type="password"
        name="password"
        id="password"
        bind:value={password}
        class="mt-1 p-2 border rounded-md w-full"
      />
    </div>
    <button class="w-full bg-blue-500 text-white p-2 rounded-md" type="submit"
      >Login</button
    >
  </form>
</main>
