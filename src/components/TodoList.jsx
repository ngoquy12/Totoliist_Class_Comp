import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

export default class TodoList extends Component {
  // Khai báo hàm khởi tạo constructor (bản thiết kế của một đối tượng)
  constructor() {
    super();
    const listTodo = JSON.parse(localStorage.getItem("job")) || []; // Lấy dữ liệu từ local, nếu không có dữ liệu
    // thì mặc định listTodo sẽ là một mảng rỗng
    // Khởi tạo state
    this.state = {
      inputValue: "",
      listTodo,
    };
  }
  render() {
    // Hàm cập nhật lại giá trị của(state) ô input
    const handleChange = (event) => {
      this.setState({
        inputValue: event.target.value,
      });
    };

    // Viết hàm add job
    const handleAddJob = () => {
      const { listTodo, inputValue } = this.state;
      // Lấy value trong ô input
      console.log("Đã click");
      const newId = uuidv4();

      // Đối tượng new todo gồm
      const newTodo = {
        id: newId,
        title: inputValue,
        compteled: false,
      };

      // Thêm dữ liệu vào mảng
      const updateTodos = [...listTodo, newTodo];

      // Set lại state
      this.setState({
        inputValue: "",
        listTodo: updateTodos,
      });

      // Lưu dữ liệu lên local
      localStorage.setItem("job", JSON.stringify(updateTodos));
    };

    /**
     * Xóa thông tin một job theo id
     * @param {*} id Id của job cần xóa
     * @param {*} title Tên của job cần xóa
     * Author: NVQUY(15/07/2023)
     */
    const hanleDelete = (id, title) => {
      // tìm kiếm xem ID có tồn tại trong mảng
      console.log("id cần xóa====>", id);

      const confimeDelete = confirm(
        `Bạn có chắc chắn muốn xóa công việc ${title} không?`
      );

      if (confimeDelete) {
        // Nếu tồn tại sẽ tiến hành xóa id đó khỏi mảng <=> lọc ra những bản ghi có id khác với id cần xóa
        const newListTodo = this.state.listTodo.filter(
          (toto) => toto.id !== id
        );

        console.log("new list todo ", newListTodo);

        // Set lại state ( Ghi đè lại mảng cũ) và lưu dữ liệu lên local
        this.setState({
          // Cập nhật lại danh sách todo
          listTodo: newListTodo,
        });

        // Lưu dữ liệu lên local
        localStorage.setItem("job", JSON.stringify(newListTodo));
      }
    };

    const isChecked = (id) => {
      const { listTodo } = this.state; // Danh sách todo
      // Lặp qua từng phần tử của mảng
      const updatedStatus = listTodo.map((todo) => {
        // Cứ mỗi lần lặp thì nó sẽ kiểm tra xem trong mảng có tồn tại id cần check hay không
        if (todo.id === id) {
          // Nếu tồn tại thì chúng ra sẽ tiến hành cập nhật lại state: completed
          return { ...todo, compteled: !todo.compteled };
        }
        // Nếu id không tồn tại
        return todo;
      });
      // Cập nhật lại state
      this.setState({
        listTodo: updatedStatus,
      });

      // Lưu dữ liệu lên local
      localStorage.setItem("job", JSON.stringify(updatedStatus));
    };

    return (
      <>
        <h3>{this.state.inputValue}</h3>
        <div className="d-flex gap-3" style={{ marginBottom: 10 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your job..."
            onChange={handleChange}
            value={this.state.inputValue}
          />
          <button
            onClick={() => handleAddJob()}
            className="btn btn-primary"
            style={{ minWidth: 90 }}
          >
            Add job
          </button>
        </div>
        <ul className="list-group">
          {this.state.listTodo.map((job) => (
            <li
              className="list-group-item text-start d-flex justify-content-between align-items-end"
              key={job.id}
            >
              <div>
                <input
                  type="checkbox"
                  checked={job.compteled}
                  onChange={() => isChecked(job.id)}
                  className="form-check-input"
                  style={{ marginRight: 10 }}
                />
                {/* Kiểm tra trạng thái hoàn thành công việc */}
                {job.compteled ? (
                  <>
                    <s>{job.title}</s>
                  </>
                ) : (
                  <span>{job.title}</span>
                )}
              </div>
              <div>
                <button
                  className="btn btn-danger"
                  onClick={() => hanleDelete(job.id, job.title)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
