import {
  buildUrl,
  lsaRoute,
  messageRoute,
  parentRoute,
  profileRoute,
  valuesRoute,
} from "../utils/api";
import { getAuthToken } from "../utils/util-fn";

export const fetchChildrenForParent = async () => {
  const response = await fetch(buildUrl(parentRoute, "/list/child"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const fetchChildById = async (id: string) => {
  const response = await fetch(buildUrl(parentRoute, `/get/child/${id}`), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return {};
  }
};

export const fetchLSARequests = async () => {
  const response = await fetch(buildUrl(lsaRoute, "/list"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const fetchSchoolSystems = async () => {
  const response = await fetch(buildUrl(valuesRoute, "/list/schoolsList"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const fetchGrades = async () => {
  const response = await fetch(buildUrl(valuesRoute, "/list/gradesList"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const fetchNeedLevels = async () => {
  const response = await fetch(buildUrl(valuesRoute, "/list/needLevelList"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const fetchMessages = async () => {
  const response = await fetch(buildUrl(messageRoute, "/list/messages"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const createMessage = async (messageReq: FormData) => {
  const response = await fetch(buildUrl(messageRoute, "/create/message"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: messageReq,
  });

  return response;
};

export const fetchProfile = async () => {
  const response = await fetch(buildUrl(profileRoute, "/"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return [];
  }
};

export const updateProfile = async (messageReq: FormData) => {
  const response = await fetch(buildUrl(profileRoute, "/"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: messageReq,
  });

  return response;
};

export const addWorkExperience = async (messageReq: any) => {
  const response = await fetch(buildUrl(profileRoute, "/workExperience/add"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(messageReq),
  });

  return response;
};