import { buildUrl, parentRoute } from "../utils/api";

export const getAllChildren = async () => {
  try {
    const username: any = localStorage.getItem("username");
    const token: any = localStorage.getItem("authToken");
    const response = await fetch(buildUrl(parentRoute, "list/child"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};
