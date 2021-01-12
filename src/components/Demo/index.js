import React, {Component} from "react";
import classnames from "classnames";
import styles from "./index.less";

const STATUS_TODO = "STATUS_TODO";
const STATUS_DOING = "STATUS_DOING";
const STATUS_DONE = "STATUS_DONE";

const STATUS_CODE = {
  STATUS_TODO: "待处理",
  STATUS_DOING: "进行中",
  STATUS_DONE: "已完成",
};
let tasks = [
  {
    id: 0,
    status: STATUS_TODO,
    title: "每周七天阅读五次，每次阅读完要做100字的读书笔记",
    username: "小夏",
    point: 10,
  },
  {
    id: 1,
    status: STATUS_TODO,
    title: "每周七天健身4次，每次健身时间需要大于20分钟",
    username: "橘子🍊",
    point: 5,
  },
  {
    id: 2,
    status: STATUS_TODO,
    title: "单词*100",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
  {
    id: 3,
    status: STATUS_TODO,
    title: "单词*150",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
  {
    id: 4,
    status: STATUS_TODO,
    title: "单词*200",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
  {
    id: 5,
    status: STATUS_TODO,
    title: "单词*250",
    username: "┑(￣Д ￣)┍",
    point: 2,
  },
];

class TaskItem extends React.Component {
  handleDragStart = (e) => {
    this.props.onDragStart(this.props.id);
  };
  render() {
    let {id, title, point, username, active, onDragEnd} = this.props;
    return (
      <div
        onDragStart={this.handleDragStart}
        onDragEnd={onDragEnd}
        id={`item-${id}`}
        className={classnames(styles.item, (styles.active: active))}
        draggable="true">
        <header className={styles["item-header"]}>
          <span className={styles["item-header-username"]}>{username}</span>
          <span className={styles["item-header-point"]}>{point}</span>
        </header>
        <main className={styles["item-main"]}>{title}</main>
      </div>
    );
  }
}

class _TaskCol extends React.Component {
  state = {
    _in: false,
  };
  handleDragEnter = (e) => {
    e.preventDefault();
    if (this.props.canDragIn) {
      this.setState({
        _in: true,
      });
    }
  };
  handleDragLeave = (e) => {
    e.preventDefault();
    if (this.props.canDragIn) {
      this.setState({
        _in: false,
      });
    }
  };
  handleDrop = (e) => {
    e.preventDefault();
    this.props.dragTo(this.props.status);
    this.setState({
      _in: false,
    });
  };
  render() {
    let {status, children} = this.props;
    const {_in} = this.state;
    return (
      <div
        id={`col-${status}`}
        className={styles.col}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragEnter}
        onDrop={this.handleDrop}
        draggable="true">
        <header className={styles["col-header"]}>{STATUS_CODE[status]}</header>
        <main className={classnames(styles["col-main"], ("active": _in))}>
          {children}
        </main>
      </div>
    );
  }
}

class TaskCol extends Component {
  state = {_in: false};
  handleDragEnter = (e) => {
    e.preventDefault();
    if (this.props.canDragIn) {
      this.setState({_in: true});
    }
  };

  handleDragLeave = (e) => {
    e.preventDefault();
    if (this.props.canDragIn) {
      this.setState({_in: false});
    }
  };

  render() {
    const {status, children} = this.props;
    const {_in} = this.state;
    return (
      <div
        className={styles.col}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragEnter}>
        <header className={styles["col-header"]}>{STATUS_CODE[status]}</header>
        <div className={classnames(styles["col-main"], ("active": _in))}>
          {children}
        </div>
      </div>
    );
  }
}

export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
      activeId: null,
    };
  }

  dragTo = (status) => {
    const {tasks, activeId} = this.state;
    let task = tasks[activeId];
    if (task.status !== status) {
      task.status = status;
      this.setState({tasks});
    }
    this.cancelSelect();
  };

  cancelSelect = () => {
    this.setState({
      activeId: null,
    });
  };

  render() {
    const {task, activeId} = this.state;
    return (
      <div className={styles["task-wrapper"]}>
        {Object.keys(STATUS_CODE).map((status) => (
          <TaskCol
            key={status}
            status={status}
            dragTo={this.dragTo}
            canDragIn={activeId !== null && tasks[activeId].status !== status}>
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  {...task}
                  active={activeId === tasks.id}
                  onDragStart={() => {
                    this.setState({activeId: task.id});
                  }}
                  onDragEnd={this.cancelSelect}
                />
              ))}
          </TaskCol>
        ))}
      </div>
    );
  }
}

// export default
class _Demo extends React.Component {
  state = {
    tasks: tasks,
    activeId: null,
  };
  /**
   * 传入被拖拽任务项的 id
   */
  onDragStart = (id) => {
    this.setState({
      activeId: id,
    });
  };

  dragTo = (status) => {
    let {tasks, activeId} = this.state;
    let task = tasks[activeId];
    if (task.status !== status) {
      task.status = status;
      this.setState({
        tasks: tasks,
      });
    }
    this.cancelSelect();
  };

  cancelSelect = () => {
    this.setState({
      activeId: null,
    });
  };

  render() {
    let {tasks, activeId} = this.state;
    let {onDragStart, onDragEnd, cancelSelect} = this;
    return (
      <div className={styles["task-wrapper"]}>
        {Object.keys(STATUS_CODE).map((status) => (
          <TaskCol
            status={status}
            key={status}
            dragTo={this.dragTo}
            canDragIn={activeId != null && tasks[activeId].status !== status}>
            {tasks
              .filter((t) => t.status === status)
              .map((t) => (
                <TaskItem
                  key={t.id}
                  active={t.id === activeId}
                  id={t.id}
                  title={t.title}
                  point={t.point}
                  username={t.username}
                  onDragStart={onDragStart}
                  onDragEnd={cancelSelect}
                />
              ))}
          </TaskCol>
        ))}
      </div>
    );
  }
}
