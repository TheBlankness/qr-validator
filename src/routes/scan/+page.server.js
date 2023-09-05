/** @type {import('./$types').Actions} */
import axios from "axios";
axios.defaults.baseURL = "https://qrcode.lawcloud.page";

function convertToJson(inputJson) {
  return inputJson.map((item) => ({
    qrcode: item.attributes.name,
    valid: true,
  }));
}

export async function load({ cookies }) {
  let qrcodes;

  try {
    const res = await axios.get("/api/qrcodes");
    if (res.data) {
      // console.log(res.data.data);
      qrcodes = convertToJson(res.data.data);
      console.log(qrcodes);
    }
  } catch (e) {
    console.log(e);
  }

  return {
    qrcodes,
  };
}
