import confetti from "canvas-confetti";
import { useState } from "react";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        const trimmed = input.trim();
        if (trimmed === "") return;
        setTodos([...todos, { id: Date.now(), text: trimmed, done: false }]);
        setInput("");
        setTimeout(() => setInput(""), 0);
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id && !todo.done) {
                    // 완료로 바꿀 때만 폭죽 실행
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                    });
                }
                return todo.id === id ? { ...todo, done: !todo.done } : todo;
            }),
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div
            style={{
                maxWidth: "400px",
                margin: "50px auto",
                fontFamily: "sans-serif",
            }}
        >
            <h1>📝 Todo List</h1>
            <div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.nativeEvent.isComposing)
                            addTodo();
                    }}
                    placeholder="할 일을 입력하세요"
                    style={{ width: "75%", padding: "8px" }}
                />
                <button
                    onClick={addTodo}
                    style={{ padding: "8px 12px", marginLeft: "8px" }}
                >
                    추가
                </button>
            </div>
            <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "8px",
                        }}
                    >
                        {/* 체크박스 아이콘 — 클릭하면 완료/미완료 토글 */}
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                                fontSize: "20px",
                                cursor: "pointer",
                                marginRight: "8px",
                            }}
                        >
                            {todo.done ? "✅" : "⬜"}
                        </span>

                        {/* 할 일 텍스트 */}
                        <span
                            style={{
                                flex: 1,
                                textDecoration: todo.done
                                    ? "line-through"
                                    : "none",
                                color: todo.done ? "#aaa" : "#000",
                            }}
                        >
                            {todo.text}
                        </span>

                        {/* 삭제 버튼 */}
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            style={{ marginLeft: "8px" }}
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
