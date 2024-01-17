import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./components/TodoList";
import { BASE_URL } from "./baseurl";
import Footer from "./components/Footer";
import { useAuth0 } from "@auth0/auth0-react";
import YoutubeEmbed from "./components/YoutubeEmbed";

function App() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [todoArray, setTodoArray] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [alternativeLogin, setAlternativeLogin] = useState(false);

  useEffect(() => {
    axios
      .get(BASE_URL + "todo")
      .then((res) => {
        setTodoArray(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching todos:", err);
        setLoading(false);
      });
  }, [title, description]);

  const addTodoHandler = () => {
    const newTodo = { title: title, description: description };

    setTodoArray([...todoArray, newTodo]);

    axios
      .post(BASE_URL + "todo", newTodo)
      .then((res) => {
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <div className="flex-grow max-w-screen-xl mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">ToDo APP</h1>
        <div className="log-buttons">
          {!isAuthenticated ? (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => loginWithRedirect()}
              >
                Log in
              </button>

              <p style={{ textAlign: "center", marginTop: "50px" }}>
                for this demo version, if you don't want to log in, you can
                click the next button to view the app
              </p>

              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <button
                  style={{
                    width: "100px",
                    height: "75px",
                    backgroundColor: "aquamarine",
                  }}
                  onClick={() => {
                    setAlternativeLogin(true);

                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: "smooth",
                    });
                  }}
                >
                  Alternative Login
                </button>
                <div className="yt-cont">
                  <p style={{ color: "blue" }}>
                    <strong>
                      <u>FOR THIS DEMO VERSION, YOU HAVE HERE A DEMO VIDEO</u>
                    </strong>
                  </p>
                </div>
                <YoutubeEmbed embedId="Npl9OM00_EE" />
              </div>
            </>
          ) : (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => logout()}
            >
              Log out
            </button>
          )}
        </div>

        <div className="p-6 w-full rounded-lg ">
          {(isAuthenticated || alternativeLogin) && (
            <>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Add your ToDo
              </h3>
              <form className="flex flex-col items-center mb-6">
                <input
                  className="border p-2 mb-2 w-full md:w-9/9"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="border p-2 mb-2 w-full md:w-9/9"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Description"
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={addTodoHandler}
                >
                  Add ToDo
                </button>
              </form>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                ToDos List
              </h3>
              {loading ? <p>Loading...</p> : <TodoList todoArray={todoArray} />}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
