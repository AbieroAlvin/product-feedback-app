const BASE_URL = "https://product-feedback-app-api.vercel.app/product-api/user";

import Cookie from "js-cookie";

export const signupApi = async ({
  name,
  username,
  password,
  confirmPassword,
}: {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, password, confirmPassword }),
    });

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }
    Cookie.set("token", data.token);
    Cookie.set("userId", data.data.user._id);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const loginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    Cookie.set("token", data?.token);
    Cookie.set("userId", data?.data?.user?._id);
    Cookie.set("userUpvotes", JSON.stringify(data.data.user.upvotedFeedbacks));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.status === "fail") {
      throw new Error(data.message);
    }

    Cookie.remove("token");
    Cookie.remove("userId");
    Cookie.remove("userUpvotes");
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllFeedbacksApi = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getAllProducts`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllSuggestedFeedbackApi = async (
  category: string,
  sortBy: string
) => {
  try {
    let url = `${BASE_URL}/getAllSuggestedProducts`;

    if (category && !sortBy) {
      url = `${url}?category=${category}`;
    }

    if (sortBy && !category) {
      url = `${url}?sortBy=${sortBy}`;
    }

    if (category && sortBy) {
      url = `${url}?category=${category}&sortBy=${sortBy}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductApi = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/getProduct?id=${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createFeedbackApi = async ({
  title,
  category,
  detail,
  createdBy,
}: {
  title: string;
  category: string;
  detail: string;
  createdBy: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, detail, createdBy }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteFeedbackApi = async (id: string) => {
  try {
    await fetch(`${BASE_URL}/deleteProduct?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editFeedbackApi = async ({
  title,
  category,
  detail,
  status,
  id,
}: {
  title: string;
  category: string;
  detail: string;
  status: string;
  id: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/editProduct?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, category, detail, status }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postReplyApi = async ({
  id,
  comment,
  username,
  userId,
}: {
  id: string;
  comment: string;
  username: string;
  userId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/replyComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id, username, userId }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postCommentApi = async ({
  id,
  comment,
  userId,
}: {
  id: string;
  comment: string;
  userId: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/createComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment, id, userId }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const increaseUpvotesApi = async ({
  id,
  user,
}: {
  id: string;
  user: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/upvoteFeedback?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });

    const data = await response.json();
    Cookie.set("userUpvotes", JSON.stringify(data.user.upvotedFeedbacks));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteCommentApi = async (id: string) => {
  try {
    await fetch(`${BASE_URL}/deleteComment?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteReplyApi = async (id: string) => {
  try {
    await fetch(`${BASE_URL}/deleteReply?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCommentApi = async ({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/editComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, comment }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editReplyApi = async ({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/editReply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, comment }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
