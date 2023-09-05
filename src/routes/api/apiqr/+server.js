import axios from "axios";
axios.defaults.baseURL = "https://qrcode.lawcloud.page";

export const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const name = body.data.name; // Assuming you are sending the data as { data: { name: "qrcode" } }
    console.log(body.data.name);
    try {
      const res = await axios.post(`/api/qrcodes`, {
        data: {
          name: name,
        },
      });

      if (res.data) {
        console.log(res.data);
      }
    } catch (e) {
      console.error(e);
    }

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 201,
    });
  } catch {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
    });
  }
};
