/** @type {import('./$types').Actions} */

import axios from "axios";
import { redirect } from "@sveltejs/kit";
axios.defaults.baseURL = "https://qrcode.lawcloud.page";

export function load({ cookies }) {
  const user = JSON.parse(cookies.get("user") || "{}");
  const jwt = cookies.get("jwt");

  if (jwt) {
    throw redirect(302, "/addqr");
  }

  // if (!jwt) {
  // 	cookies.set('userid', crypto.randomUUID(), { path: '/' });
  // }

  return {
    user,
    jwt,
  };
}

export const actions = {
  default: async ({ request, cookies }) => {
    // TODO log the user in
    const data = await request.formData();
    try {
      const res = await axios.post("/api/auth/local", {
        identifier: data.get("username"),
        password: data.get("password"),
      });
      console.log("dsadd");
      if (res.data) {
        cookies.set("jwt", res.data.jwt);
        cookies.set("user", JSON.stringify(res.data.user));
        throw redirect(302, "/addqr");
      }
    } catch (e) {
      console.log(e);
    }
  },
};
