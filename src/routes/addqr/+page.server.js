/** @type {import('./$types').Actions} */
import axios from "axios";
axios.defaults.baseURL = "https://qrcode.lawcloud.page";

export async function load({ cookies }) {
  let qrcodes;

  try {
    const res = await axios.get("/api/qrcodes");
    if (res.data) {
      // console.log(res.data.data);
      qrcodes = convertToJson(res.data.data);
    }
  } catch (e) {
    console.log(e);
  }

  return {
    qrcodes,
  };
}

function convertToJson(inputJson) {
  return inputJson.map((item) => ({
    qrcode: item.attributes.name,
    valid: true,
  }));
}
